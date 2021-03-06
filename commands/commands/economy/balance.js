const Discord = require('discord.js')
const economy = require('../../../features/features/economy')

module.exports = {
    commands: ['balance', 'bal'],
    cooldown: 3,
    maxArgs: 1,
    expectedArgs: '[Target user\'s @]',
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author

        if (target.bot) {
            message.reply('Why would you think a bot has money?? Are you trying to rob a helpless being??')
            return
        }

        const guildId = message.guild.id
        const userId = target.id

        const money = await economy.getMoney(guildId, userId)

        const embed = new Discord.MessageEmbed()
            .setDescription(`${target.username}'s balance: **$${money}**`)
            .setColor('#00FF00')
        message.channel.send({embeds: [embed]})
    }
}