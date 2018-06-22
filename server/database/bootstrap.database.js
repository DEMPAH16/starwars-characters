const massive = require('massive');

let db;

massive(process.env.DB_CONNECTION_STRING)
    .then(dbInstance => {
        console.log('DB Connected');
        db = dbInstance;
    })
    .catch(err => {
        console.warn(err);
    });

function getDb() {
    if (!db) {
        throw { message: 'No DB connected' };
    }
    
    return db;
}

module.exports = {
    getDb,
};