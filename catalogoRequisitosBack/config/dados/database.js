// string de conexao ao bando mongo;
var mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://desenv:desenv2018@tatooine.mongodb.umbler.com:47856/catalogoservicos'),{
    useMongoClient: true
}

