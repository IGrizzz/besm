const mongoose = require('mongoose')

const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
})

const userModels = mongoose.model('user', userSchema)

module.exports = userModels