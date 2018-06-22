const AuthRouter = require('./auth.router');
const CharacterRouter = require('./character.router');

function routerHub(app) {
    app.use('/auth', AuthRouter);
    app.use('/characters', CharacterRouter);
}

module.exports = routerHub;