const server = require('./server')
require('../dados/database')
require('../../controller/produtos')
require('../../controller/usuario')(server)

