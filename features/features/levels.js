const economy = require('./economy.js')

const mongo = require('../../util/mongo')
const profileSchema = require('../../schemas/profile-schema')

module.exports = (client) => {
    client.on('messageCreate', message => {
        const { guild, member } = message

        addXP(guild.id, member.id, 50, message)
    })
}

const getNeededXP = level => 5000

const addXP = async (guildId, userId, xpToAdd, message) => {
    await mongo().then(async mongoose => {
        try {
            const result = await profileSchema.findOneAndUpdate({
                userId
            },{
                userId,
                $inc: {
                    xp: xpToAdd
                }
            },{
                upsert: true,
                new: true
            })

            let { xp, level } = result
            const needed = getNeededXP(level)

            if (xp >= needed) {
                level++
                xp -= needed

                message.author.send(`You are now level ${level} and received $2000!`)

                await economy.addMoney(guildId, userId, 2000) 

                await profileSchema.updateOne({
                    userId
                },{
                    level,
                    xp
                })
            }
        } finally {
            //mongoose.connection.close()
        }
    })
}

module.exports.addXP = addXP