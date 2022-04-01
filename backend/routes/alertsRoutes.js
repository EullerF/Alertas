const router = require('express').Router()
const alertsController = require('../controller/alertsController')

router.post('/' , alertsController.create)
router.get('/' , alertsController.getAll)

 module.exports = router