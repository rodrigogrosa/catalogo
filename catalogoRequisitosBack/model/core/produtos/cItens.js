
const restful = require('node-restful')
const bcrypt = require('bcryptjs')

const mongoose = restful.mongoose

const itemProduto = new mongoose.Schema({    
    name: { type: String, require: true },
    type: { type: String, require: true },
    valor: { type: Number, min:0, require: true },
    senha: { type: String, require: true}
})

itemProduto.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.senha, 10)
    this.senha = hash
    next()
})

module.exports = restful.model('ItemProduto', itemProduto)
