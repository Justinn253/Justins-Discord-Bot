const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const profileSchema = mongoose.Schema({
    userId: reqString,
    username: reqString,
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
    dailyTime: {
        type: Date,
        default: Date.now
    },
    claimedFirstDaily: {
        type: Boolean,
        default: false
    },
    job: {
        type: String,
        default: 'none'
    },
    timeWorked: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('profiles', profileSchema)