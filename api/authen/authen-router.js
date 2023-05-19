const router = require('express').Router();
const AuthenController = require('./authen-controller')

router.post('/login', AuthenController.login)

router.post('/register', AuthenController.register)

router.post('/validate_token', AuthenController.validateToken)

module.exports = router