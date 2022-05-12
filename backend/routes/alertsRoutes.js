const router = require('express').Router()
const alertsController = require('../controller/alertsController')
let multer = require('multer');
let upload = multer({dest:'./src/temp'});

router.post('/' ,upload.single('file'),alertsController.create)
router.get('/' , alertsController.getAll)

 module.exports = router