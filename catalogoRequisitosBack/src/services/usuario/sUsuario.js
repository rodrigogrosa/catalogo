
const cUsuario = require('../../model/core/usuario/cUsuario')

cUsuario.methods(['get', 'post', 'put', 'delete'])

cUsuario.updateOptions({new:true, runValidators: true})

module.exports = cUsuario