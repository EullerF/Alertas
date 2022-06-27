const mongoose = require ('mongoose')

const Groups = mongoose.model('groups',{
    label:String,
    value:String,
})

module.exports = Groups