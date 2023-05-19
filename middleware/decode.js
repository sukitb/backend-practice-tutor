const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        if (!token) {
            return res.status(401).send('Access denied')
        } else {
            const secret = '<your secret>'
            const decoded = jwt.verify(token, secret);
            req.user = decoded
            next()
        }
    }
    catch (error) {
        res.status(400).send('Access denied')

    }

}