const express = require ('express')
const mongoose = require('mongoose')
var cors = require('cors')
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())
app.use(cors())

const alertsRoutes = require('./routes/alertsRoutes')
app.use('/alerts', alertsRoutes)


const DB_USER = 'EullerF'
const DB_PASSWORD = '532656'
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.xogwv.mongodb.net/bancoapi?retryWrites=true&w=majority`
    )
    .then(()=>{
        app.listen(5000)
        console.log('Conectado ao Banco')
    })
    .catch((erro)=>{
        console.log(erro)
    })
