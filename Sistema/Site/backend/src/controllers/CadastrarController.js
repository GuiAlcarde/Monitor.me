const User = require('../models/Users')

const gnt = require('../validators/generateToken');

module.exports = {
    async cadastrar(req, res) {
        
        const {email} = req.body;
        const {name,cellphone,password, idTelegram} = req.body
        console.log(req.body)
        try {
            if (await User.findOne({where:{email: email}})){
                return res.status(400).send({error: 'Usuário já existe'})
            }else{
                const user = await User.create({name,email,cellphone,password, idTelegram})
                return res.json({user, token: gnt.generateJwt({id : user.id})})
            }
        } catch (err) {
            return res.status(400).send({
                error: 'Cadastro Falhou'
            });
        }
    }
}