const router = require('express').Router()
const usersController = require('../controller/usersController')

router.post('/' , usersController.login)

 module.exports = router