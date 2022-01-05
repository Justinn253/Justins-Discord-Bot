const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const musicQueueSchema = mongoose.Schema({
    guildId: reqString,
    queue: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('music queue', musicQueueSchema)