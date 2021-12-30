const Discord = require('discord.js')
const economy = require('../../../features/features/economy')

module.exports = {
    commands: ['level', 'xp'],
    description: 'Displays your level progress',
    cooldown: 3,
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id

        const level = await economy.getLevel(guildId, userId)

        const embed = new Discord.MessageEmbed()
        .setDescription(`${target} is level: **${level}**`)
        message.channel.send({embeds: [embed]})
    }
}