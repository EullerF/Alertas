const conn = require('../db/conn')

module.exports = class usersController {



    static async login(req, res) {
    
        const user = req.body.user
        const password = req.body.password
    
        if (!user) {
          res.status(422).json({ message: 'O usuário é obrigatório!' })
          return
        }
    
        if (!password) {
          res.status(422).json({ message: 'A senha é obrigatória!' })
          return
        }

        const query = `SELECT * FROM users WHERE user = '${user}'`

        conn.query(query, function (err, data) {
        if (err) {
         res.status(500).json({message:'Usuário não encontrado'})
         console.error('error connecting: ' + err.stack);
         return;
        }
        else{
          if (data[0]!=undefined){
          const userLogin = data[0]
          if(user == userLogin.user && password == userLogin.password){
            res.status(200).json(userLogin)
            console.log('Teste valido')
         }
         else{
            res.status(422).json({message:'Usuário ou senha inválidos' })
         }
        }
        else{
          console.log('Indefinido')
          res.status(422).json({message:'Usuário ou senha inválidos' })
        }
        
      }
         
        })
    
    }

}