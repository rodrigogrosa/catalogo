
const restful = require('node-restful')
const mongoose = restful.mongoose

const itemProduto = new mongoose.Schema({    
    name: { type: String, require: true },
    type: { type: String, require: true },
    valor: { type: Number, min:0, require: true }
})

module.exports = restful.model('ItemProduto', itemProduto)
