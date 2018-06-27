const express = require('express');

const authenticationCheck = require('../middleware/authentication-check.middleware');

const CharacterRouter = express.Router();

CharacterRouter.get('/', (req, res, next) => {
    const query = req.query.search ? 
        req.db.Products
            .search({
                fields: [ 'name', 'title', 'affilliation', 'home_planet', 'description' ],
                term: req.query.search.toLowerCase(),
            }, {
                order: [
                    { field: 'id', direction: 'asc' },
                ],
            }) :
        req.db.get_items();
    
    query
        .then(characters => {
            res.send(characters);
        })
        .catch(err => {
            console.warn(err);
            next({ message: 'Internal Server Error' });
        });
});

CharacterRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;
    
    req.db.Products
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

CharacterRouter.post('/', authenticationCheck(), (req, res, next) => {
    const newCharacter = req.body;
    
    req.db.Products
        .insert(newCharacter)
        .then(character => {
            res.send(character);
        })
        .catch(err => {
            console.warn('error with the db', err);
            next({ message: 'Internal Server Error' });
        });
});

CharacterRouter.patch('/:id', authenticationCheck(), (req, res, next) => {
    const { id } = req.params;
    const characterUpdate = req.body;
    
    req.db.Products
        .update(+id, characterUpdate)
        .then(character => {
            res.send(character);
        })
        .catch(err => {
            console.warn('error with the db', err);
            next({ message: 'Internal Server Error' });
        });
    
});

CharacterRouter.delete('/:id', authenticationCheck(), (req, res, next) => {
    const { id } = req.params;
    
    req.db.Products
        .destroy(+id)
        .then(character => {
            res.send(character);
        })
        .catch(err => {
            console.warn('error with the db', err);
            next({ message: 'Internal Server Error' });
        });
});

module.exports = CharacterRouter;