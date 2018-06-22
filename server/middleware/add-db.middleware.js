const { getDb } = require('../database/bootstrap.database');

function addDb(req, res, next) {
    try {
        req.db = getDb();
        
        next();
    } catch (e) {
        console.warn(e);
        return next({ message: 'Internal Server Error' });
    }
}

module.exports = addDb;