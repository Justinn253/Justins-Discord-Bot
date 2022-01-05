const Discord = require('discord.js')
const economy = require('../../../features/features/economy')
const levels = require('../../../features/features/levels')

module.exports = {
    commands: ['gamble'],
    cooldown: 5,
    minArgs: 1,
    expectedArgs: "<amount> or 'all'",
    callback: async (message, arguments) => {
        const userId = message.author.id
        const guildId = message.guild.id
        const userMoney = await economy.getMoney(guildId, userId)
        let gambleAmount = arguments[0]

        if (userMoney < 100 || gambleAmount < 100) {
            message.reply('You need $100 or more to gamble.')
            return
        }

        if (gambleAmount > userMoney) {
            message.reply('You cannot gamble more money than you have.')
            return
        }

        if (gambleAmount == 'all') {
            gambleAmount = userMoney
        }

        var winLossAmount = 0
        if (!isNaN(gambleAmount)) {
            const roll = Math.ceil(Math.random() * 10)
            const embed = new Discord.MessageEmbed()
            if (roll > 5) {
                // Win
                const multiplier = Math.floor(Math.random() * (15 - 5) + 5) / 10 
                winLossAmount = Math.round(gambleAmount * multiplier)
                const newMoney = await economy.addMoney(guildId, userId, winLossAmount) 
                levels.addXP(message.guild.id, message.member.id, 250, message, message.member.user.username)

                embed.setTitle(`💰  Gamble - WIN  💰`)
                embed.setColor('#00FF00')
                embed.setDescription(`You won **$${winLossAmount}** with a multiplier of **${multiplier}**! You now have **$${newMoney}**!`)
            } else {
                // Loss
                winLossAmount = -Math.abs(gambleAmount)
                const newMoney = await economy.addMoney(guildId, userId, winLossAmount)

                embed.setTitle(`📉  Gamble - LOSS  📉`)
                embed.setColor('#FF0000')
                embed.setDescription(`You lost **$${gambleAmount}** ;(. Get scammed lol. You now have **$${newMoney}**.`)
            }

            message.channel.send({embeds: [embed]})
        }
    }
}