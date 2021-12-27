const economy = require('../../economy')

const { floor, random } = Math

module.exports = {
    commands: ['gamble'],
    minArgs: 1,
    expectedArgs: "<amount> or 'all'",
    callback: async (message, arguments) => {
        const userId = message.author.id
        const guildId = message.guild.id
        const userMoney = await economy.getMoney(guildId, userId)
        const gambleAmount = arguments[0]

        if (userMoney < 500 || gambleAmount < 500) {
            message.reply('You need $500 or more to gamble.')
            return
        }

        if (gambleAmount == 'all') {
            gambleAmount = userMoney
        }

        var winLossAmount = 0
        if (!isNaN(gambleAmount)) {
            const roll = Math.round(Math.random())
            if (roll == 1) {
                // Win
                const multiplier = Math.floor(Math.random() * (15 - 5) + 5) / 10 
                winLossAmount = gambleAmount * multiplier
                const newMoney = await economy.addMoney(guildId, userId, winLossAmount) 
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