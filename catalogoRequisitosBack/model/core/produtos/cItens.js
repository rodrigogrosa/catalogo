
// var mongoose = require('mongoose')
// mongoose.connect('mongodb://desenv:desenv2018@tatooine.mongodb.umbler.com:47856/catalogoservicos')

const restful = require('node-restful')
const mongoose = restful.mongoose

const itemProduto = new mongoose.Schema({    
    name: { type: String, require: true },
    type: { type: String, require: true },
    valor: { type: Number, min:0, require: true }
})

module.exports = restful.model('ItemProduto', itemProduto)


// let userSchema = new mongoose.Schema({
//     username: String,
//     email: String
// }, { collection: 'usercollection' }
// );
 
// module.exports = { Mongoose: mongoose, UserSchema: userSchema }