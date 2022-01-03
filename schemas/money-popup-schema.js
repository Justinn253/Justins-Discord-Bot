const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const moneyPopupSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString
})

module.exports = mongoose.model('money-popup', moneyPopupSchema)