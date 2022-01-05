const Discord = require('discord.js')
const economy = require('../../../features/features/economy')

module.exports = {
    commands: ['daily'],
    cooldown: 1,
    callback: async (message) => {
        const guildId = message.guild.id
        const userId = message.author.id
        const embed = new Discord.MessageEmbed()

        
        canClaim = await economy.claimDaily(guildId, userId)
        if (canClaim[0]) {
            embed.setTitle('-- DAILY --')
            .setDescription('💰  You have claimed your daily and earned $2000!')
            .setColor('#00FF00')
            await economy.addMoney(guildId, userId, 2000) 
        } else {
            embed.setTitle('-- DAILY --')
            .setColor('#FF0000')
            let waitTime = canClaim[1]
            let hours = 0
            let minutes = 0
            let finalWaitTime = 0
            while (waitTime >= 60) {
                waitTime -= 60
                hours++
                minutes = waitTime
            }
            if (hours > 0) {
                minutes /= 60
                finalWaitTime = Math.round((hours + minutes) * 100) / 100
                embed.setDescription(`❌  You must wait **${finalWaitTime} hours** to claim your daily again.`)
            } else {
                finalWaitTime = waitTime
                embed.setDescription(`❌  You must wait **${finalWaitTime} minutes** to claim your daily again.`)
            }
        }

        message.channel.send({embeds: [embed]})
    } 
}

