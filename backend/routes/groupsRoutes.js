const router = require('express').Router()
const groupsController = require('../controller/groupsController')

router.get('/' , groupsController.getAll)
router.post('/' ,groupsController.create)
router.delete('/:id', groupsController.delete)
 module.exports = router