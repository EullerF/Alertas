
const express = require ('express')
const conn = require('./db/conn')
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

const usersRoutes = require('./routes/usersRoutes')
app.use('/users', usersRoutes)

app.listen(5000)
