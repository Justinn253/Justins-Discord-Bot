const economy = require('../../../features/features/economy')

module.exports = {
    commands: ['daily'],
    description: 'Claims your daily reward.',
    cooldown: 1,
    callback: async (message, arguments) => {
        const guildId = message.guild.id
        const userId = message.author.id
        
        canClaim = await economy.claimDaily(guildId, userId)
        if (canClaim[0]) {
            message.reply('You have claimed your daily and earned $2000!')
            await economy.addMoney(guildId, userId, 2000) 
        } else {
            message.reply(`You must wait ${canClaim[1]} minutes to claim your daily again.`)
        }
    } 
}

