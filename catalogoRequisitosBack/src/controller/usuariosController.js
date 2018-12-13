
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

let qUsuario = require('../model/querys/usuario/qUsuario')
let cUsuario = require('../model/core/usuario/cUsuario')
let authConfig = require('../../config/json/auth.json')
let mailer = require('../modules/mailer')
const emailService = require ('../services/emailService')

function gerarToken(param = {}) {
    return jwt.sign(param, authConfig.secret, {
        expiresIn: 86400
    })
}

module.exports = function (server) {
    const router = express.Router()
    server.use('/auth', router)

    // registra o usuario
    const sUsuario = require('../services/usuario/sUsuario')
    sUsuario.register(router, '/registrar')

    // Autentica o usuario
    router.post('/autenticar', async (req, res) => {
        const { matricula, senha } = req.body

        const usuario = await cUsuario.findOne({ matricula }).select('+senha')

        if (!usuario) {
            return res.status(400).send({ error: 'Usuario nao encontrado' })
        }

        if (!await bcrypt.compare(senha, usuario.senha)) {
            return res.status(400).send({ error: 'Senha Invalida' })
        }
        usuario.senha = undefined

        res.send({
            usuario,
            token: gerarToken({ matricula: usuario.matricula, usuario: usuario.id })
        })

    })

    router.post('/esquecisenha', async (req, res) => {
        const { email } = req.body
        console.log(email)
        try {
            const usuario = await cUsuario.findOne({ email })

            if (!usuario) {
                return res.status(400).send({ error: 'Usuario nao encontrado ao recuperar a senha' })
            }

            const token = crypto.randomBytes(20).toString('hex')
            const now = new Date()
            now.setHours(now.getHours(+ 1))

            await cUsuario.findByIdAndUpdate(usuario.id, {
                '$set': {
                    resetSenhaToken: token,
                    resetSenhaExpirar: now,
                }
            })
            
            emailService.send(email,'Esqueci minha senha','usuario/esquecisenha',token)
            // mailer.sendMail({
            //     to: email,
            //     from: 'rodrigo.grosa2011@gmail.com',
            //     template: 'usuario/esquecisenha',
            //     context: { token }
            // }, (err) => {
            //     if (err)
            //         return res.status(400).send({
            //             error: 'Nao foi possivel enviar email.'
            //         })
            //     return res.send();
            // })

        } catch (err) {
            res.status(400).send({ error: 'Erro em solicitar a recuperacao de senha', err })
        }

    })

    router.post('/resetarsenha', async (req, res) => {
        const { email, token, senha,  } = req.body
       
        try {
            const usuario = await cUsuario.findOne({ email })
                .select('+resetSenhaToken resetSenhaExpirar')
                
                
            if (!usuario) {
                return res.status(400).send({ error: 'Usuario nao encontrado ao recuperar a senha' })
            }

            if (token !== usuario.resetSenhaToken) {                 
                return res.status(400).send({ error: 'Usuario enviou um token nao valido' 
                })
            }

            const now = new Date()
            
            console.log(senha)

            if (now < usuario.resetSenhaExpirar) {
                return res.status(400).send({ error: 'Esse token nao e mais valido' })
            }

            usuario.senha = senha
            
            await usuario.save()
            res.send()

        } catch (err) {
            res.status(400).send({ error: 'Erro em solicitar o reset de senha', err })
        }

    })
    // pesquisa por rota
    router.get('/buscar/:nome', qUsuario.buscaNome)
}