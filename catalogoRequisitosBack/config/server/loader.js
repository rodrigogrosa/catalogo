const server = require('./server')
require('../dados/database')
require('../../controller/produtosController')(server)
require('../../controller/usuariosController')(server)
require('../../controller/projetosController')(server)

