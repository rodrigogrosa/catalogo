
const cUsuario = require('../../core/usuario/cUsuario')

const buscaNome = (req,res,next) => {
    const nome = req.params.nome
    cUsuario.find({'nome': nome}, (err,usuario) => { 
        if (err) {
            return handleError(err)
        } else {
            res.json(usuario)
        }
    })
}

module.exports = { buscaNome }