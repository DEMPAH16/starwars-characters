const express = require('express');

const AuthRouter = express.Router();

AuthRouter.post('/login', (req, res) => {
    req.session.user = {
        username: req.body.username,
        password: req.body.password,
    };
    
    res.send(req.body);
});

module.exports = AuthRouter;