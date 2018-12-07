
const cItem = require('../../../model/core/produtos/cItens')

const buscaNome = (req,res,next) => {
    const name = req.params.name
console.log(name)
    cItem.find({'name': name}, (err,item) => { 
        if (err) {
            return handleError(err)
        } else {
            res.json(item)
        }
    })
}

module.exports = { buscaNome }