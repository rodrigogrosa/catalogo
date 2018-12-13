
const restful = require('node-restful')
const bcrypt = require('bcryptjs')
const mongoose = require('../../../config/dados/database')
//const mongoose = require('mongoose')
//const mongoose = restful.mongoose

const tarefa = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    projeto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projeto',
        require: true
    },
    usuarioResponsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    finalizada: {
        type: Boolean,
        defaut: false,
        require: true
    },
    dataRegistro: {
        type: Date,
        defaut: Date.now
    }
})


module.exports = mongoose.model('Tarefa', tarefa)
