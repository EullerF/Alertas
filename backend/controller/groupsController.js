const Groups = require('../models/alerts')
let fs = require("fs");
const axios = require('axios');

const conn = require('../db/conn')

module.exports = class groupsController {
// Listar Grupos
static async getAll(req, res) {

    const query = `SELECT * FROM groups`

    conn.query(query, function (err, data) {
    if (err) {
     console.log(err)
     res.status(500).json({error:'Dados não encontrados'})
    }
     const groups = data
     res.status(200).json(groups)
    })
}
}