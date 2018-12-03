var mongoose = require('mongoose')
mongoose.connect('mongodb://desenv:desenv2018@tatooine.mongodb.umbler.com:47856/catalogoservicos')

let userSchema = new mongoose.Schema({
    username: String,
    email: String
}, { collection: 'usercollection' }
);
 
module.exports = { Mongoose: mongoose, UserSchema: userSchema }