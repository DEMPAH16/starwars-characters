const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const characters = [
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

app.get('/characters', (req, res, next) => {
    res.send(characters);
});

app.post('/characters', (req, res) => {
    const newCharacter = req.body;
    
    characters.push(newCharacter);
    
    res.send(newCharacter);
});

app.patch('/characters/:id', (req, res) => { // or PUT
    const { id } = req.params;
    const character = req.body;
    
    characters[id] = character;
    
    res.send(character);
});

app.delete('/characters/:id', (req, res) => {
    const { id } = req.params;
    
    const removedCharacter = characters.splice(id, 1)[0];
    
    res.sendStatus(204);
});

const port = 3002;

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