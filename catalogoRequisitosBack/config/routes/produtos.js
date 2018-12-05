
let express = require('express')

module.exports = function(server){
    const router = express.Router();
    server.use('/api', router)

    const sItem = require('../../services/produtos/sItens')

    sItem.register(router, '/item')
}