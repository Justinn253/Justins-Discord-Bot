const mongo = require('../../util/mongo')
const baltopSchema = require('../../schemas/baltop-schema')

module.exports.setLeaderboard = async (leaderboardList) => {
    return await mongo().then(async (mongoose) => {
        try {
            baltopSchema.remove({})
            const topList = []
            for (const user of leaderboardList) {
                const result = await baltopSchema.findOneAndUpdate({
                    userId: user.userId
                },{
                    userId: user.userId,
                    username: user.username,
                    money: user.money
                },{
                    upsert: true,
                    new: true
                })
                topList.push(result)
            }
            return topList
        } finally {
            //mongoose.connection.close()
        }
    })
}