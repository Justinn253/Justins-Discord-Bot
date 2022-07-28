const Discord = require('discord.js')
const DiscordVoice = require('@discordjs/voice')
const musicQueue = require('../../../features/features/music-queue')
const play = require('./play')

module.exports = {
    commands: ['skip'],
    cooldown: 1,
    callback: async (message, args, argsJ, client) => {
        const guildId = message.guild.id
        const embed = new Discord.MessageEmbed()
        const connection = DiscordVoice.getVoiceConnection(guildId)

        if (connection) {
            let theQueue = await musicQueue.getQueue(guildId)
            theQueue.shift()
            await musicQueue.updateQueue(guildId, theQueue)

            if (message.member.voice.channel != null && message.member.voice.channel != undefined) {
                embed.setDescription('The current song has been skipped')
                play.skipSong(guildId, message, client)
            }
        } else {
            embed.setDescription('I am not connected to any voice channels.')
        }

        message.channel.send({embeds: [embed]})
    }
}