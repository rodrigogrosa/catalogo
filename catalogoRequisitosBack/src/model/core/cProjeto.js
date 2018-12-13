
const restful = require('node-restful')
const bcrypt = require('bcryptjs')
const mongoose = require('../../../config/dados/database')
// const mongoose = require('mongoose')
//const mongoose = restful.mongoose

const projeto = new mongoose.Schema({
    nome: {
        type: String,
        index: true,
        required: [true, 'Nome do Projeto e obrigatorio']
    },
    descricao: {
        type: String,
        required: [true, 'Descricao do Projeto e obrigatorio']
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,      
        ref: 'Usuario',
        required: [true, 'Usuario do Projeto e obrigatorio']
    },
    tarefas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tarefa',
        required: [true, 'Tarefas do Projeto e obrigatorio']
    }],
    status:{
        type: Boolean,
        default: true
    },
    dataRegistro: {
        type: Date,
        defaut: Date.now
    }
})

module.exports = mongoose.model('Projeto', projeto)
