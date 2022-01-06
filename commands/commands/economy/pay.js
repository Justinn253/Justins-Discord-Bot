const economy = require('../../../features/features/economy')

module.exports = {
    commands: ['pay', 'give', 'loan'],
    cooldown: 3,
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<Target's @> <amount>",
    callback: async (message, arguments) => {
        const mention = message.mentions.users.first()

        if (!mention) {
            message.reply('Please tag a user to add coins to.')
            return
        }

        const money = arguments[1]
        if (isNaN(money)) {
            message.reply('Please provide a valid amount.')
            return
        }

        if (money < 0) {
            message.reply('You can\'t send a negative amount of money, idiot')
            return
        }

        const guildId = message.guild.id
        const senderUserId = message.author.id
        const receiverUserId = mention.id
        const senderBalance = await economy.getMoney(guildId, senderUserId)

        if (mention.bot) {
            message.reply(`You have paid ${mention.username} **$${senderBalance}**! You now have **$0**. Pranked, you can't rob bots!`)
            return
        }

        if (senderBalance < money) {
            message.reply('You do not have enough money')
        } else {
            await economy.addMoney(guildId, senderUserId, -Math.abs(money))
            const newMoney2 = await economy.addMoney(guildId, receiverUserId, money) 
            message.reply(`${message.author.username} has paid ${mention.username} **$${money}**. They now have **$${newMoney2}**.`)
        }
    }
}