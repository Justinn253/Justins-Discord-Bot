const Discord = require('discord.js')
const economy = require('../../../features/features/economy')

module.exports = {
    commands: ['top', 'richest'],
    description: 'Displays the richest people in the server',
    cooldown: 3,
    callback: async (message, arguments) => {
        const userId = message.author.id
        const guildId = message.guild.id
        //economy.sortByMoney(guildId, userId)
    }
}