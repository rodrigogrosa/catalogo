const server = require('./server')
require('../dados/database')
require('../routes/produtos')(server)

