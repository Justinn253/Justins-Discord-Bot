const economy = require('../../../features/features/economy')
const levels = require('../../../features/features/levels')

const { floor, random } = Math

module.exports = {
    commands: ['gamble'],
    description: 'Gambles a specified amount of money (50/50 odds).',
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
            if (roll > 5) {
                // Win
                const multiplier = Math.floor(Math.random() * (15 - 5) + 5) / 10 
                winLossAmount = Math.round(gambleAmount * multiplier)
                const newMoney = await economy.addMoney(guildId, userId, winLossAmount) 
                levels.addXP(message.guild.id, message.member.id, 250, message, message.member.user.username)
                message.reply(`You won $${winLossAmount} with a multiplier of ${multiplier}! You now have $${newMoney}!`)
            } else {
                // Loss
                winLossAmount = -Math.abs(gambleAmount)
                const newMoney = await economy.addMoney(guildId, userId, winLossAmount)
                message.reply(`You lost ${gambleAmount} ;(. Get scammed lol. You now have $${newMoney}`)
            }
        }
    }
}