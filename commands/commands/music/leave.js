const DiscordVoice = require('@discordjs/voice')
const Discord = require('discord.js')
const musicQueue = require('../../../features/features/music-queue')

module.exports = {
    commands: ['leave'],
    cooldown: 3,
    callback: async (message) => {
        const connection = DiscordVoice.getVoiceConnection(message.guild.id)
        const embed = new Discord.MessageEmbed()

        if (connection) {
            connection.destroy()
            musicQueue.clearQueue(guildId)
            embed.setDescription('Now leaving the voice channel.')
        } else {
            embed.setDescription('I am not connected to any voice channels.')
            return
        }

        message.channel.send({embeds: [embed]})
    }
}
