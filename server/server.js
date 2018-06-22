const express = require('express');

require('dotenv').config({
    path: __dirname + '/../.env',
});

const globalDecorator = require('./middleware/global-decorator.middleware');
const routerHub = require('./routers/hub.router');

const app = express();

// request starts here

globalDecorator(app);

routerHub(app);

// Error Handler
app.use((err, req, res, next) => {
    res.status(500).send(err);
});

const port = process.env.SERVER_PORT || 3002;

app.listen(port, () => {
    console.log(`Server listening at localhost:${port}`);
});
