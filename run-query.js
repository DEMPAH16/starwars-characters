const massive = require('massive');

require('dotenv').config({ path: __dirname + '/.env' });

massive(process.env.DB_CONNECTION_STRING)
    .then(db => {
        return db.setup.add_default_user();
    })
    .then(result => console.log(result))
    .catch(err => console.warn(err));