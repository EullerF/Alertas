const Alert = require('../models/alerts')
let fs = require("fs");
const axios = require('axios');

const conn = require('../db/conn')

//Convertendo arquivo em binário
function base64_encode(file){
    var bitmap = fs.readFileSync('../src/temp/'+file);
    return new Buffer (bitmap).toString('base64');
  }

function base64_decode(base64str,fileName){
    var bitmap = new Buffer (base64str, 'base64');
    fs.writeFileSync('../src/temp/'+fileName,bitmap, 'binary', function (err){
      if(err){
        console.log('Conversao com erro');
      }
    } );
  }

 // Adição ao próximo agendamento
Date.prototype.addDias = function(dias){
    this.setDate(this.getDate() + dias)
};
Date.prototype.addMeses = function(meses){
    this.setMonth(this.getMonth() + meses)
};
// Ajustando a Hora
Date.prototype.addHoras = function(horas){
    this.setHours(this.getHours() - horas)
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
            res.status(422).json({message:'Insira a descrição'})
         return
         }
        if(!group){
            res.status(422).json({message:'Insira o grupo'})
         return
         }
         if(!dateInit){
            res.status(422).json({message:'Insira a Data Inicial'})
         return
         }
        var date = new Date();
        const dt = Date.parse(date)
        const dataI = Date.parse(dateInit)
        if(dataI < dt){
            res.status(422).json({message:'Insira uma Data Inicial válida'})
         return
        }
         if(!dateEnd){
            res.status(422).json({message:'Insira a Data Final'})
         return
         }
         if(!frequencia){
            res.status(422).json({message:'Insira a Frequencia'})
         return
         }

		    	//efetuando a leitura do arquivo
		    	let fileContent  = base64_encode(image);//Colocando o nome do arquivo que será enviado para o banco
		    	const query = `INSERT INTO alert (alertDescription, dateInit, dateEnd, grupo, frequencia, file, fileName) VALUES ( 
                    '${alertDescription}', 
                    '${dateInit}', 
                    '${dateEnd}', 
                    't_${group}', 
                    '${frequencia}',
                    '${fileContent}',
                    '${image}'
                    )`
        
                conn.query(query , function(err){
                    if(err){
                        console.log(err)
                        res.status(422).json({error:'Alerta não cadastrado, preencha todos os campos'})
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
         res.status(500).json({error:'Dados não encontrados'})
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
         res.status(500).json({error:'Dados não encontrados'})
        }
         alerts = data
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
            alertas.forEach(publicacoes => {
                        if(publicacoes.frequencia=='diariamente')
                        {
                            publicacoes.dateInit.addDias(1)
                        }
                        if(publicacoes.frequencia=='semanalmente')
                        {
                            publicacoes.dateInit.addDias(7)
                        }
                        if(publicacoes.frequencia=='quinzenalmente')
                        {
                            publicacoes.dateInit.addDias(15)
                        }
                        if(publicacoes.frequencia=='mensalmente')
                        {
                            publicacoes.dateInit.addMeses(1)
                        }
                        if(publicacoes.frequencia=='semestralmente')
                        {
                            publicacoes.dateInit.addMeses(6)
                        }
                      var currentTimeZoneOffsetInHours = publicacoes.dateInit.getTimezoneOffset() / 60;
                      publicacoes.dateInit.addHoras(currentTimeZoneOffsetInHours)
                      Update(publicacoes)  
                      
            })
        }
        else{
            res.status(110).json({message:'Sem agendamentos'})
            return
        }
                  
    })
    
    function Update(doc){
           
        console.log('DATA')
        console.debug(doc.dateInit)
        
        const cast = new Date(doc.dateInit)
        
        const mySQLDateString = cast.toJSON().slice(0, 19).replace('T', ' ');
        console.log(mySQLDateString)
        const query = `UPDATE alert SET dateInit = '${mySQLDateString}' WHERE alert.id = '${doc.id}'`

        conn.query(query, function (err, data) {
            if (err) {
             console.log(err)
             res.status(500).json({error:'Novo agendamento não realizado'})
            }
            })

            res.status(200).json(doc)
            const FormData = require('form-data');
            const fs = require('fs');
            let data = new FormData();
            data.append('recipient', '{"thread_key":'+doc.grupo+'}');
            data.append('message', '{"attachment":{"type":"image", "payload":{"is_reusable":true}}}');
            data.append('filedata', fs.createReadStream('../src/temp/'+doc.fileName));
            
            let config = {
              method: 'post',
              url: 'https://graph.facebook.com/v11.0/me/messages?access_token=',
              headers: { 
                ...data.getHeaders()
              },
              data : data
            };
            
            axios(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });

    }
    
}
    
}
