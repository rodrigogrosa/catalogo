
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

 let qUsuario = require ('../model/querys/usuario/qUsuario')
 let cUsuario = require ('../model/core/usuario/cUsuario')
 let authConfig = require('../config/auth.json')

 function gerarToken (param = {}){
     return jwt.sign(param,authConfig.secret, {
         expiresIn: 86400
     })
 }

 module.exports = function(server){
    const router = express.Router()
    server.use('/auth', router)

    // registra o usuario
    const sUsuario = require('../services/usuario/sUsuario')
    sUsuario.register(router, '/registrar')

    // Autentica o usuario
    router.post ('/autenticar', async(req,res)=>{
        const { matricula, senha } = req.body

        const usuario = await cUsuario.findOne({matricula}).select('+senha')

        if (!usuario){
            return res.status(400).send({error:'Usuario nao encontrado'})
        }

        if(!await bcrypt.compare(senha,usuario.senha)){
            return res.status(400).send({error:'Senha Invalida'})
        }
        usuario.senha = undefined

        res.send ({
            usuario, 
            token : gerarToken({matricula: usuario.matricula})
        })

    })

    // pesquisa por rota
    router.get('/buscar/:nome',qUsuario.buscaNome)
}