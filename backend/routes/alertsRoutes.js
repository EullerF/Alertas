const router = require('express').Router()
const alertsController = require('../controller/alertsController')
const {imageUpload} = require ('../helpers/image-upload')

router.post('/' ,imageUpload.single('arq'),alertsController.create)
router.get('/' , alertsController.getAll)
router.get('/ativos' , alertsController.getAtivos)
router.delete('/:id', alertsController.delete)
router.patch('/',alertsController.attDate)
router.patch('/:id', alertsController.editStatus)

 module.exports = router