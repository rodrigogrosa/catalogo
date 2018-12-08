// string de conexao ao bando mongo;
var mongoose = require('mongoose')

let dadosConexao = 'desenv:desenv2018'
let dbUri = 'tatooine.mongodb.umbler.com:47856/catalogoservicos'
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
let conecta = 'mongodb://' + dadosConexao + '@' + dbUri 

module.exports = mongoose.connect(conecta),{useMongoClient: true, useNewUrlParser: true, useCreateIndex: true,
    useNewUrlParser: true}

// Monitoramento de connection 
mongoose.connection.on('disconnect', function(){
    console.log('Mongoose nao esta conectado em:' + dbUri )
})
mongoose.connection.on('connected', function(){
    console.log('Mongoose esta conectado em:' + dbUri )
    console.log('=====> OK <=====:' )
})
mongoose.connection.on('error', function(err){
    console.log('Mongoose esta com a coneccao com erro:' + err )
})

// Fechar a conexao do mongoose caso o NODEJS seja encerrado de forma inexperada
process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('Encerrando a conexao do Mongoose')
        process.exit(0)
    })    
})
 

//deploy pn2
// "start": "node ./bin/www"
