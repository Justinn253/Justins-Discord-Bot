const mongo = require('../../util/mongo')
const musicQueueSchema = require('../../schemas/music-queue-schema')

module.exports.addToQueue = async(video, guildId) => {
    return await mongo().then(async (mongoose) => {
        try {

            const result = await musicQueueSchema.findOneAndUpdate({
                guildId
            },{
                guildId,
                $push: {
                    queue: video
                }
            },{
                upsert: true,
                new: true
            })

            return result.queue
        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.getQueue = async (guildId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await musicQueueSchema.findOne({guildId})

            if (result) {
                if (result.queue) {
                    return result.queue
                } else {
                    return []
                }
            } else {
                return []
            }
        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.getQueueLength = async (guildId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await musicQueueSchema.findOne({guildId})

            if (result) {
                if (result.queue) {
                    return result.queue.length
                } else {
                    return []
                }
            } else {
                return []
            }
        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.updateQueue = async (guildId, newQueue) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await musicQueueSchema.findOneAndUpdate({
                guildId
            },{
                guildId,
                queue: newQueue
            },{
                upsert: true,
                new: true
            })

            return result.queue
        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.clearQueue = async (guildId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await musicQueueSchema.findOneAndUpdate({
                guildId
            },{
                guildId,
                queue: []
            },{
                upsert: true,
                new: true
            })

            return result.queue
        } finally {
            //mongoose.connection.close()
        }
    })
}
