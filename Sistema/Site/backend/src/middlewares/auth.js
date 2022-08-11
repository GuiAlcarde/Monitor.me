const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')


module.exports = (req , res , next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    
    if(!authHeader){
        return res.status(401).send({error: "Token inválido 1"})
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status.send({error: "Token error 2"})
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: "Regex Token Error 3"})
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err){return res.status(401).send({error: "Token Inválido"})}

        req.userId = decoded.id;
        return next();
    })
}