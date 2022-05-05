const conn = require('../db/conn')

module.exports = class usersController {



    static async login(req, res) {
    
        const user = req.body.email
        const password = req.body.password
    
        if (!user) {
          res.status(422).json({ message: 'O usuário é obrigatório!' })
          return
        }
    
        if (!password) {
          res.status(422).json({ message: 'A senha é obrigatória!' })
          return
        }

        const query = `SELECT * FROM users WHERE user = ${user}`

        conn.query(query, function (err, data) {
        if (err) {
         console.log(err)
         res.status(500).json({eror:'Usuário não encontrado'})
        }
         const userLogin = data[0]
         if(user == userLogin.user && password == userLogin.password){
            res.status(200).json(userLogin)
         }
         else{
            res.status(422).json({ message: 'Usuário ou senha inválidos' })
         }
        })
    
    }

}