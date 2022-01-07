const mongo = require('../../util/mongo')
const profileSchema = require('../../schemas/profile-schema')

const moneyCache = {} // { 'guildId-userId': money }
const levelCache = {}

let dailyClaimedCache = []

const clearCache = () => {
    dailyClaimedCache = []
    setTimeout(clearCache, 1000 * 60 * 10)
}
clearCache()

module.exports = (client) => {}

module.exports.addMoney = async (guildId, userId, money, username) => {
    return await mongo().then(async (mongoose) => {
        try {

            const result = await profileSchema.findOneAndUpdate({
                userId
            },{
                userId,
                username,
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

module.exports.getExactLevel = async (guildId, userId) => {
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

                    return result.level
                } 
            }

            return '1 (0/5000)'

        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.claimDaily = async (guildId, userId, username) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await profileSchema.findOne({userId})

            let claimResult = [false, 0]
            if (result) {
                console.log('test 1', claimResult)
                if (!result.claimedFirstDaily) {
                    claimResult = [true, 0]
                    console.log('test 2', claimResult)
                } else {
                    const then = new Date(result.dailyTime).getTime()
                    const now = new Date().getTime()

                    const diffTime = Math.abs(now - then)
                    const diffDays = diffTime / (1000 * 60 * 60 * 24)
                    console.log(result.dailyTime.getTime(), then, now, diffTime, diffDays)

                    if (diffDays <= 1) {
                        claimResult = [false, Math.round(1440 - (diffTime / (1000 * 60)))]
                        console.log('test 3', claimResult)
                    } else {
                        claimResult = [true, 0]
                        console.log('test 4', claimResult)
                    }
                }
            }

            if (claimResult[0] == true) {
                await profileSchema.findOneAndUpdate({
                    userId
                },{
                    userId,
                    username,
                    $set: {
                        dailyTime: new Date(),
                        claimedFirstDaily: true
                    }
                },{
                    upsert: true
                })
            }

            console.log(claimResult)
            return claimResult

        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.sortByMoney = async (listSize) => {
    return await mongo().then(async (mongoose) => {
        try {
            return await profileSchema.find().sort({'money': -1})
            //return result
        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.setJob = async (userId, username, job) => {
    return await mongo().then(async (mongoose) => {
        try {
            await profileSchema.findOneAndUpdate({
                userId
            },{
                userId,
                username,
                $set: {
                    job, 
                    timeWorked: new Date()
                }
            },{
                upsert: true
            })

        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.getJob = async (userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await profileSchema.findOne({userId})
            if (result.job) {
                return result.job
            } else {
                return 'none'
            }
        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.claimJobPay = async (userId, username, pay) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await profileSchema.findOne({userId})

            const then = new Date(result.timeWorked).getTime()
            const now = new Date().getTime()

            const diffTime = Math.abs(now - then)
            const diffMins = diffTime / (1000 * 60)

            const finalPay = Math.round(diffMins * pay)


            await profileSchema.findOneAndUpdate({
                userId
            },{
                userId,
                username,
                $set: {
                    timeWorked: new Date(),
                }
            },{
                upsert: true
            })

            return finalPay

        } finally {
            //mongoose.connection.close()
        }
    })
}