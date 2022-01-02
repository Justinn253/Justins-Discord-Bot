const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const baltopSchema = mongoose.Schema({
    userId: reqString,
    username: reqString,
    money: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('baltopList', baltopSchema)