const server = require('./server')
require('../dados/database')
require('../../src/controller/produtosController')(server)
require('../../src/controller/usuariosController')(server)
require('../../src/controller/projetosController')(server)

