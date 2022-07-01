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


// Cadastrar Grupos
static async create(req, res) {
    const {value,label}=req.body

    if(!value){
        res.status(422).json({message:'Insira o código do Grupo'})
     return
     }
     if(!label){
        res.status(422).json({message:'Insira o nome do Grupo'})
     return
     }
     const query = `INSERT INTO groups (label, value) VALUES ( 
        '${label}', 
        't_${value}' 
        )`

        conn.query(query , function(err){
            if(err){
                console.log(err)
                res.status(500).json({error:'Grupo não cadastrado no banco'})
            }
            console.log('Inserido Grupo')
            res.status(201).json({message: 'Grupo criado com sucesso'})
            return
        })
}

// Deletar único grupo
static async delete(req, res) {
    const id = req.params.id
    console.log(id)      
    const query = `DELETE FROM groups WHERE groups.id ='${id}'`

    conn.query(query, function (err, data) {
    if (err) {
     console.log(err)
     res.status(500).json({error:'Dados não encontrados'})
     return
    }
     
     res.status(200).json({delete:true})
     console.log('Grupo - DELETADO')
     return
    })
}


}