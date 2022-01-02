const Discord = require('discord.js')
const economy = require('../../../features/features/economy')

module.exports = {
    commands: ['balance', 'bal'],
    description: 'Displays your balance.',
    cooldown: 3,
    maxArgs: 1,
    expectedArgs: '[Target user\'s @]',
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id

        const money = await economy.getMoney(guildId, userId)

        const embed = new Discord.MessageEmbed()
        .setDescription(`${target}'s balance: **$${money}**`)
        message.channel.send({embeds: [embed]})
    }
}