const User = require('../models/Users')
// const connection = require('../database')
// const moment = require('moment')
const bcrypt = require('bcryptjs')
const gnt = require('../validators/generateToken')

module.exports = {
    async createLogin(request, response) {
        const {
            email,
            password
        } = request.body
        try {
            const userAtivo = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!userAtivo) {
                return response.status(400).json({
                    error: "Não Existem Usuários Com este Login"
                })
            }
            //Valida senha com criptografia
            if (!await bcrypt.compare(password, userAtivo.password)) {
                return response.status(400).json({
                    error: "Senha Inválida"
                })

            }

            userAtivo.password = undefined; // impede o envio da senha para o front

            response.json({
                userAtivo,
                token: gnt.generateJwt({
                    id: userAtivo.id
                })
            })

        } catch (error) {
            return response.status(400).json({error: error})
        }


    }
}