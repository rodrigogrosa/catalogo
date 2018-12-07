const fs = require('fs')
const path = require('path')

module.exports = server => {
    fs
        .readdirSync(__dirname)
        .filter(file => ((file.indexOf('.')) !== 0 
                            && (file !== "index.js") 
                            && (file !== "indexController.js")
                            && (file !== "usersController.js")
                            ))
        .forEach(file => require(path.resolve(__dirname, file))(server))

        require('../../config/dados/database')
}
