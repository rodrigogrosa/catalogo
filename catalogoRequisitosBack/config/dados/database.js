// string de conexao ao bando mongo;

const mongoose = require('mongoose')
const {banco, dbUri, conecta, porta, usuario, senha} = require('../../config/json/bdConexaoMongo.json')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

let stringConexao = conecta + usuario +":"+ senha +"@" + dbUri + ":" + porta + "/" + banco

mongoose.connect(stringConexao), {useMongoClient: true}
mongoose.Promise = global.Promise

module.exports = mongoose

// Monitoramento de connection 
mongoose.connection.on('disconnect', function () {
    console.log('Mongoose nao esta conectado em:' + dbUri)
})
mongoose.connection.on('connected', function () {
    console.log('Mongoose esta conectado em ==> ' + banco)
    console.log('=====> OK <=====:')
})
mongoose.connection.on('error', function (err) {
    console.log('Mongoose esta com a coneccao com erro:' + err)
})

// Fechar a conexao do mongoose caso o NODEJS seja encerrado de forma inexperada
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Encerrando a conexao do Mongoose')
        process.exit(0)
    })
})


//deploy pn2
// "start": "node ./bin/www"
