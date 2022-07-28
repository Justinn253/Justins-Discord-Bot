const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const DiscordVoice = require('@discordjs/voice')
const Discord = require('discord.js')
const musicQueue = require('../../../features/features/music-queue')

module.exports = {
    commands: ['join', 'j'],
    cooldown: 1,
    callback: async (message, arguments, argsJoin, client) => {
        let voiceChannel
        const guildId = message.guild.id

        if (message.member.voice.channel != null && message.member.voice.channel != undefined) {
            voiceChannel = message.member.voice.channel
        } else {
            return message.channel.send('You need to be in a voice channel to use this command.')
        }

        if (voiceChannel.id == undefined || voiceChannel.id == null) {
            return message.channel.send('You need to be in a voice channel to use this command.')
        }

        const connection = await DiscordVoice.joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: guildId,
            adapterCreator: message.guild.voiceAdapterCreator
        })
    }
}