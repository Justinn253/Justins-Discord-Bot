const economy = require('./economy.js')

const mongo = require('../../util/mongo')
const profileSchema = require('../../schemas/profile-schema')

module.exports = (client) => {
    client.on('messageCreate', message => {
        const { guild, member } = message

        addXP(guild.id, member.id, 50, message, member.user.username)
    })
}

const getNeededXP = level => 5000

const addXP = async (guildId, userId, xpToAdd, message, username) => {
    await mongo().then(async mongoose => {
        try {
            const result = await profileSchema.findOneAndUpdate({
                userId
            },{
                userId,
                username,
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

                if (!message.author == '923317732659826738') {
                    message.author.send(`You are now level ${level} and received $3000!`)
                }

                await economy.addMoney(guildId, userId, 2000, username) 

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