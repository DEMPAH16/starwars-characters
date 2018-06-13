const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');

require('dotenv').config({
    path: __dirname + '/../.env',
});

const app = express();

let db;

massive(process.env.DB_CONNECTION_STRING)
    .then(dbInstance => {
        console.log('DB Connected');
        db = dbInstance;
        // app.set('db', dbInstance);
    })
    .catch(err => {
        console.warn(err);
    });

const deprecatedCharacterList = [
    {
        name: 'Anakin Skywalker',
        title: 'Darth Vader',
        homePlanet: 'Tattooine',
        affilliation: 'Galactic Empire',
    },
    {
        name: 'Han Solo',
        title: 'Smuggler',
        homePlanet: 'Correlia',
        affilliation: 'Rebellion',
    },
];

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
    
//     next();
// });
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../build'));

app.use((req, res, next) => {
    // if (req.app.get('db'))
    if (!db) {
        console.warn('Database not connected');
        return next({ message: 'Internal Server Error' });
    }
    
    req.db = db;
    
    next();
});



app.get('/characters', (req, res, next) => {
    // const db = req.app.get('db');
    
    // if (db) {
    //     db//.do whatever
    // }
    
    // req.db.Characters
    //     .find({
    //         'name !=': 'Mace Windu',
    //     })
    
    // req.db.query(`
    //     SELECT *
    //     FROM "Characters"
    //     WHERE name ILIKE '%$1%'
    //     OR price > 50
    // `, {
    //     first_name: 'Humphrey',
    //     last_name: 'Bogart',
    //     address: 'some address',
    //     username: 'humfer',
    //     password: 'hunter2',
    //     email: 'humphrey.bogart@aol.com',
    // })
    
    // req.db.get_items()
    
    const query = req.query.search ? 
        req.db.Characters
            .search({
                fields: [ 'name', 'title', 'affilliation', 'home_planet', 'description' ],
                term: req.query.search.toLowerCase(),
            }, {
                order: [
                    { field: 'id', direction: 'asc' },
                ],
            }) :
        // req.db.get_items_by_search([ req.query.search ]) :
        req.db.get_items();
    
    query
        .then(characters => {
            console.log(characters);
            res.send(characters);
        })
        .catch(err => {
            console.warn(err);
            next({ message: 'Internal Server Error' });
        });
    
    // const characterList = characters.filter(character => {
    //     const search = req.query.search.toLowerCase();
    //     return character.name.toLowerCase().includes(search) ||
    //         character.title.toLowerCase().includes(search) ||
    //         character.homePlanet.toLowerCase().includes(search) ||
    //         character.affilliation.toLowerCase().includes(search);
    // });
});

app.get('/characters/:id', (req, res, next) => {
    const { id } = req.params;
    
    req.db.Characters
        .find(+id)
        .then(character => {
            if (!character) {
                return res.status(404).send({
                    message: 'No character found with id ' + id,
                });
            }
            
            res.send(character);
        })
        .catch(err => {
            console.warn('error with the db', err);
            next({ message: 'Internal Server Error' });
        })
});

app.post('/characters', (req, res, next) => {
    const newCharacter = req.body;
    
    req.db.Characters
        .insert(newCharacter)
        .then(character => {
            res.send(character);
        })
        .catch(err => {
            console.warn('error with the db', err);
            next({ message: 'Internal Server Error' });
        });
});

app.patch('/characters/:id', (req, res, next) => { // or PUT
    const { id } = req.params;
    const characterUpdate = req.body;
    
    req.db.Characters
        .update(+id, characterUpdate)
        .then(character => {
            res.send(character);
        })
        .catch(err => {
            console.warn('error with the db', err);
            next({ message: 'Internal Server Error' });
        });
    
});

app.delete('/characters/:id', (req, res, next) => {
    const { id } = req.params;
    
    req.db.Characters
        .destroy(+id)
        .then(character => {
            res.send(character);
            // res.sendStatus(204);
        })
        .catch(err => {
            console.warn('error with the db', err);
            next({ message: 'Internal Server Error' });
        });
});



app.use((err, req, res, next) => {
    res.status(500).send(err);
});






const port = process.env.SERVER_PORT || 3002;

app.listen(port, () => {
    console.log(`Server listening at localhost:${port}`);
});











// ---------------------------- OLD ------------------------------------

// const http = require('http');

// const server = http.createServer((req, res) => {
//     console.log(req.method + ' to ' + req.url);
    
//     if (req.method == 'GET') {
//         if (req.url == '/characters') {
//             // do something
//         }
//     }
    
//     res.end(JSON.stringify({ message: 'blah!' }));
// });

// server.listen(3002);

// console.log('Server listening at port 3002');