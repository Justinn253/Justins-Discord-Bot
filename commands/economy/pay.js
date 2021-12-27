const economy = require('../../economy')

module.exports = {
    commands: ['pay'],
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

        const guildId = message.guild.id
        const senderUserId = message.author.id
        const receiverUserId = mention.id

        const newMoney1 = await economy.addMoney(guildId, senderUserId, -Math.abs(money))
        const newMoney2 = await economy.addMoney(guildId, receiverUserId, money) 

        message.reply(`You have given <@${receiverUserId}> $${money}. They now have $${newMoney2}.`)
    }
}