const Discord = require('discord.js')
const economy = require('../../../features/features/economy')

module.exports = {
    commands: ['level', 'xp'],
    cooldown: 3,
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author

        const guildId = message.guild.id
        const userId = target.id

        const level = await economy.getLevel(guildId, userId)
        const exactLevel = await economy.getExactLevel(guildId, userId)
        const levelColor = getLevelColor(exactLevel)

        const embed = new Discord.MessageEmbed()
        .setDescription(`${target} is level: **${level}**`)
        .setColor(levelColor)
        message.channel.send({embeds: [embed]})
    }
}

function getLevelColor(level) {
    // White - default
    let color = '#FFFFFF'
    if (level >= 10 && level < 20) {
        // Grey
        color = '#808080'
    } else if (level >= 20 && level < 30) {
        // Yellow
        color = '#FFFF00'
    } else if (level >= 30 && level < 40) {
        // Green
        color = '#00FF00'
    } else if (level >= 40 && level < 50) {
        // Aqua
        color = '#00FFFF'
    } else if (level >= 50 && level < 70) {
        // Blue
        color = '#0000FF'
    } else if (level >= 70 && level < 100) {
        // Orange
        color = '#FFA500'
    } else if (level >= 100 && level < 150) {
        // Purple
        color = '#5D3FD3'
    } else if (level >= 150 && level < 200) {
        // Red
        color = '#FF0000'
    } else if (level >= 200) {
        // Black
        color = '#000000'
    }
    return color
}