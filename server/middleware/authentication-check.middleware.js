function authenticationCheck({ isAdmin } = {}) {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).send({ message: 'You need to log in' });
        }
        else if (isAdmin && !req.session.user.admin) {
            return res.status(403).send({ message: 'You are not allowed to access this content' });
        }
        
        next();
    };
}

module.exports = authenticationCheck;