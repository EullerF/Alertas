const Alert = require('../models/alerts')
let fs = require("fs");

const conn = require('../db/conn')

//Convertendo arquivo em binário
function base64_encode(file){
    var bitmap = fs.readFileSync('../src/temp/'+file);
    return new Buffer (bitmap).toString('base64');
  }

 // Adição ao próximo agendamento
 Date.prototype.addDias = function(dias){
    this.setDate(this.getDate() + dias)
};
Date.prototype.addMeses = function(meses){
    this.setMonth(this.getMonth() + meses)
};

module.exports = class alertsController {
    // Cadastrar Alerta
    static async create(req, res) {
        const {alertDescription,group,dateInit,dateEnd,frequencia}=req.body
        
        let image = ''

        if (req.file) {
        image = req.file.filename
        console.log({image})
        }

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
		    	let fileContent  = base64_encode(image);//Colocando o nome do arquivo que será enviado para o banco
		    	const query = `INSERT INTO alert (alertDescription, dateInit, dateEnd, grupo, frequencia, file, fileName) VALUES ( 
                    '${alertDescription}', 
                    '${dateInit}', 
                    '${dateEnd}', 
                    '${group}', 
                    '${frequencia}',
                    '${fileContent}',
                    '${image}'
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


    static async attDate(req, res) {
        let alerts
        let alertas = []
        const query = `SELECT * FROM alert`

        conn.query(query, function (err, data) {
        if (err) {
         console.log(err)
         res.status(500).json({eror:'Dados não encontrados'})
        }
         alerts = data
         //console.log(alerts)
         // Validando Start de Mensagens
        var date = new Date();
        const dt = Date.parse(date) 
       
        alerts.forEach(doc => {   
            const dataI = Date.parse(doc.dateInit)
            const dataE = Date.parse(doc.dateEnd)
                if(dataI <= dt && dt <= dataE){ 
                    alertas.push(doc)
            }
        })
        if(alertas.length!=0)
        {
            //console.log(alertas)
            alertas.forEach(publicacoes => {
                        if(publicacoes.frequencia='diariamente')
                        {
                            publicacoes.dateInit.addDias(1)
                        }
                        if(publicacoes.frequencia='semanalmente')
                        {
                            publicacoes.dateInit.addDias(7)
                        }
                        if(publicacoes.frequencia='quinzenalmente')
                        {
                            publicacoes.dateInit.addDias(15)
                        }
                        if(publicacoes.frequencia='mensalmente')
                        {
                            publicacoes.dateInit.addMeses(1)
                        }
                        if(publicacoes.frequencia='semestralmente')
                        {
                            publicacoes.dateInit.addMeses(6)
                            //console.log('TESTE')
                            //console.log(publicacoes.dateInit)
                        }
                      const confirma = Update(publicacoes)  
                      console.log('confirma')
                      console.log(confirma)
            })

        }
    res.status(200).json(alertas)
    })
    
    function Update(doc){
        console.log('DATA')
        console.log(doc.dateInit)
        const query = `UPDATE alert SET dateInit = '${doc.dateInit}' WHERE alert.id = '${doc.id}'`

        conn.query(query, function (err, data) {
            if (err) {
             console.log(err)
             res.status(500).json({eror:'Dados não encontrados'})
            }
             return(1)
            })
    }
    
}
    
}
