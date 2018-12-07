const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



module.exports = function(server){
    let router = express.Router()
    server.use('/projetos', router)

    let authMiddleware = require('../middleware/authMiddleware')
    router.use(authMiddleware)
    
    router.get('/', (req, res) => {
        res.send(
            { 
                ok: true, 
                matricula: req.matricula
            })        
    })
}