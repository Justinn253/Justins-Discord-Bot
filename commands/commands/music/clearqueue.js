const Discord = require('discord.js')
const musicQueue = require('../../../features/features/music-queue')

module.exports = {
    commands: ['clearqueue'],
    cooldown: 3,
    callback: async (message) => {
        const embed = new Discord.MessageEmbed()
        musicQueue.clearQueue(message.guild.id)

        embed.setTitle(`__Queue__`)
        embed.setDescription('The Queue has been cleared.')
        message.channel.send({embeds: [embed]})
    }
}