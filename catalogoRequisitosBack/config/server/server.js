const port = 4000

const bodyParser = require('body-parser')
const express = require('express')
const server = express()

server.use(bodyParser.urlencoded({ extended:true}))
server.use(bodyParser.json())

server.listen(process.env.port || port, function() {
    console.log('Lendo o servidor')
})

module.exports = server