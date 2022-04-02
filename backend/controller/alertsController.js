const Alert = require('../models/alerts')

module.exports = class alertsController {
    // Cadastrar Alerta
    static async create(req, res) {
        const {alertDescription,group,dateInit,dateEnd,frequencia}= req.body

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

        const alertCreate = {
            alertDescription,
            group,
            dateInit,
            dateEnd,
            frequencia
            }

        try{
                await Alert.create(alertCreate)
                res.status(201).json({message: 'Alerta criado com sucesso'})
     
            } catch (error){
                res.status(500).json({error: error})
                }
            }

    // Listar Alertas
    static async getAll(req, res) {
            
            try{
                const alerts = await Alert.find();
                    res.status(200).json(alerts)
                
                } catch (error){
                    res.status(500).json({error: error})
                   }
                }

    }
