
const cItem = require('../../core/produtos/cItens')

cItem.methods(['get', 'post', 'put', 'delete'])

cItem.updateOptions({new:true, runValidators: true})

module.exports = cItem