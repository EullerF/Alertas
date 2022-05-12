const Alert = require('../models/alerts')
let fs = require("fs");

const conn = require('../db/conn')

//Convertendo arquivo em binário
function base64_encode(file){
    var bitmap = fs.readFileSync('src/temp/'+file+'');
    return new Buffer (bitmap).toString('base64');
  }

module.exports = class alertsController {
    // Cadastrar Alerta
    static async create(req, res) {
        const {alertDescription,group,dateInit,dateEnd,frequencia}=req.body
        const file = req.body.file

        if(!alertDescription){
            res.status(422).json({eror:'Insira a descrição'})
         return
         }
        if(!group){
            res.status(422).json({eror:'Insira o grupo'})
         return
         }
         if(!dateInit){
            res.status(422).json({eror:'Insira a Data Inicial'})
         return
         }
         if(!dateEnd){
            res.status(422).json({eror:'Insira a Data Final'})
         return
         }
         if(!frequencia){
            res.status(422).json({eror:'Insira a Frequencia'})
         return
         }

		    	//efetuando a leitura do arquivo
		    	let fileContent  = base64_encode(file);//Colocando o nome do arquivo que será enviado para o banco
		    	const query = `INSERT INTO alert (alertDescription, dateInit, dateEnd, grupo, frequencia, file) VALUES ( 
                    '${alertDescription}', 
                    '${dateInit}', 
                    '${dateEnd}', 
                    '${group}', 
                    '${frequencia}',
                    '${fileContent}'
                    )`
        
                conn.query(query , function(err){
                    if(err){
                        console.log(err)
                        res.status(422).json({eror:'Alerta não cadastrado'})
                    }
                    console.log('Inserido no Mysql')
                    res.status(201).json({message: 'Alerta criado com sucesso'})
                })
		          
    
}

    // Listar Alertas
    static async getAll(req, res) {

        const query = `SELECT * FROM alert`

        conn.query(query, function (err, data) {
        if (err) {
         console.log(err)
         res.status(500).json({eror:'Dados não encontrados'})
        }
         const alerts = data
         res.status(200).json(alerts)
        })
    }

    
    

}
