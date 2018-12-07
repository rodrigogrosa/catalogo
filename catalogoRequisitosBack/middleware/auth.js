const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (typeof req.headers.authorization !== 'string') {
        return res.status(401).send({ error: "Autorizador fora do formato" })
    }

    const parts = authHeader.split(' ')
    let [scheme, token] = parts


    //Verifica se a aplicacao possui algum token
    if (!authHeader) {
        return res.status(401).send({ error: "Sua aplicacao nao possui token de segiranca" })
    }
    // verifica de o token possui 2 partes
    if (!parts.length === 2) {
        return res.status(401).send({ error: "Sua aplicacao nao possui token no padrao esperado" })
    }
    // verifica se existe a palavra Bearer na variavel
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: "Sua aplicacao nao possui token no padrao esperado" })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err){
            return res.status(401).send({ error: "Sua aplicacao nao possui token no padrao esperado" })
        }
        req.matricula = decoded.matricula
        return next()
    })

}