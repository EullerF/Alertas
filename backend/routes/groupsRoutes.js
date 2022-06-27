const router = require('express').Router()
const groupsController = require('../controller/groupsController')

router.get('/' , groupsController.getAll)

 module.exports = router