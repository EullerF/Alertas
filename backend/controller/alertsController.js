const Alert = require('../models/alerts')

module.exports = class alertsController {
    // Cadastrar Alerta
    static async create(req, res) {
        const {alertDescription,group,dateInit,dateEnd,frequencia}= req.body

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
