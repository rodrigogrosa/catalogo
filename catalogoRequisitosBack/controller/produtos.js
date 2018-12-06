
let express = require('express')
let qItens = require ('../model/querys/produtos/qItens')

module.exports = function(server){
    const router = express.Router();
    server.use('/api', router)

    const sItem = require('../services/produtos/sItens')
    sItem.register(router, '/item')

    // pesquisa por rota
    router.get('/buscar/:name',qItens.buscaNome)
}