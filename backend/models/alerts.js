const mongoose = require ('mongoose')

const Alert = mongoose.model('Alert',{
    alertDescription:String,
    dateInit:Date,
    dateEnd:Date,
    group:String,
    frequencia:String,
    file: Buffer,
    fileName:String,
    status:String
})

module.exports = Alert