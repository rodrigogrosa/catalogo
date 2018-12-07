const server = require('./server')
require('../dados/database')
require('../../controller/produtos')(server)
require('../../controller/usuario')(server)
require('../../controller/projetos')(server)

