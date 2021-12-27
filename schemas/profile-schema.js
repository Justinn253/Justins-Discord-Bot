const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const profileSchema = mongoose.Schema({
    userId: reqString,
    money: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    time: {
        type: Date,
        default: Date.now
    },
    claimedFirstDaily: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('profiles', profileSchema)