const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')

const moneyCache = {} // { 'guildId-userId': money }

module.exports = (client) => {}

module.exports.addMoney = async (guildId, userId, money) => {
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running findOneAndUpdate()')

            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            },{
                guildId,
                userId,
                $inc: {
                    money
                }
            },{
                upsert: true,
                new: true
            })

            moneyCache[`${guildId}-${userId}`] = result.money

            return result.money
        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.getMoney = async (guildId, userId) => {
    const cachedValue = moneyCache[`${guildId}-${userId}`]
    if (cachedValue == 0 || cachedValue > 0 || cachedValue < 0) {
        return cachedValue
    }

    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running findOne()')

            const result = await profileSchema.findOne({
                guildId,
                userId
            })

            //console.log('RESULT: ', result)

            let money = 0
            if (result) {
                money = result.money
            } else {
                console.log('Inserting a document')
                await new profileSchema({
                    guildId,
                    userId,
                    money
                }).save()
            }

            moneyCache[`${guildId}-${userId}`] = money

            return result.money
        } finally {
            //mongoose.connection.close()
        }
    })
}