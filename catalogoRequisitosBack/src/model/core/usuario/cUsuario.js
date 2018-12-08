
const restful = require('node-restful')
const bcrypt = require('bcryptjs')

const mongoose = restful.mongoose

const usuario = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    matricula: { 
        type: String, 
        require: true,
        unique: true 
    },
    email: {
        type: String,
        min: 0,
        require: true,
        unique: true,
        lowercase: true
    },
    senha: { 
        type: String, 
        require: true, 
        select: false
    },
    resetSenhaToken:{
        type: String,
        select: false
    },
    resetSenhaExpirar:{
        type: Date,
        select: false
    },
    dataRegistro: {
        type: Date,
        defaut: Date.now
    }
})

usuario.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.senha, 10)
    this.senha = hash
    next()
})

usuario.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(this.email); // Assuming email has a text attribute
 }, 'The e-mail field cannot be empty.')

module.exports = restful.model('Usuario', usuario)
