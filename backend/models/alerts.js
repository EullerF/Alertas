const mongoose = require ('mongoose')

const Alert = mongoose.model('Alert',{
    alertDescription:String,
    dateInit:Date,
    dateEnd:Date,
    group:String,
    file: Buffer
})

module.exports = Alert