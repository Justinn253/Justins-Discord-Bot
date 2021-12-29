const mongo = require('../../util/mongo')
const profileSchema = require('../../schemas/profile-schema')
const messageCounter = require('./message-counter')
const { now } = require('mongoose')
const { db } = require('../../schemas/profile-schema')
const { round } = Math

const moneyCache = {} // { 'guildId-userId': money }
const levelCache = {}

let dailyClaimedCache = []

const clearCache = () => {
    dailyClaimedCache = []
    setTimeout(clearCache, 1000 * 60 * 10)
}
clearCache()

module.exports = (client) => {}

module.exports.addMoney = async (guildId, userId, money) => {
    return await mongo().then(async (mongoose) => {
        try {

            const result = await profileSchema.findOneAndUpdate({
                userId
            },{
                userId,
                $inc: {
                    money
                }
            },{
                upsert: true,
                new: true
            })

            moneyCache[`${userId}`] = result.money

            return result.money
        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.getMoney = async (guildId, userId) => {
    const cachedValue = moneyCache[`${userId}`]
    if (cachedValue == 0 || cachedValue > 0 || cachedValue < 0) {
        return cachedValue
    }

    return await mongo().then(async (mongoose) => {
        try {

            const result = await profileSchema.findOne({
                userId
            })

            let money = 0
            if (result) {
                if (result.money != null) {
                    money = result.money
                    moneyCache[`${userId}`] = money

                    return result.money
                } 
            }

            return 0

        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.getLevel = async (guildId, userId) => {
    const cachedValue = levelCache[`${userId}`]
    if (cachedValue == 0 || cachedValue > 0 || cachedValue < 0) {
        return cachedValue
    }

    return await mongo().then(async (mongoose) => {
        try {

            const result = await profileSchema.findOne({
                userId
            })

            let level = 0
            let xp = 0
            if (result) {
                if (result.level != null | result.xp) {
                    level = result.level
                    moneyCache[`${userId}`] = level
                    xp = result.xp
                    moneyCache[`${userId}`] = xp

                    return `${result.level} (${xp}/5000)`
                } 
            }

            return '1 (0/5000)'

        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.claimDaily = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await profileSchema.findOne({userId})

            canClaimDaily = false
            if (result) {
                if (!result.claimedFirstDaily) {
                    canClaimDaily = true
                } else {
                    const then = new Date(result.time).getTime()
                    const now = new Date().getTime()

                    const diffTime = Math.abs(now - then)
                    const diffDays = diffTime / (1000 * 60 * 60 * 24)

                    if (diffDays <= 1) {
                        return [false, Math.round(1440 - (diffTime / (1000 * 60)))]
                    } else {
                        canClaimDaily = true
                    }
                }
            }

            await profileSchema.findOneAndUpdate({
                userId
            },{
                userId,
                $set: {
                    time: new Date(),
                    claimedFirstDaily: true
                }
            },{
                upsert: true
            })

            return [canClaimDaily, 0]

        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.sortByMoney = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            profileSchema.find({}).sort({money: -1}).exec((err, docs) => {
                
            })  
        } finally {
            //mongoose.connection.close()
        }
    })
}