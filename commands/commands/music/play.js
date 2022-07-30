const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const DiscordVoice = require('@discordjs/voice')
const Discord = require('discord.js')
const musicQueue = require('../../../features/features/music-queue')

module.exports = {
    commands: ['play', 'p'],
    cooldown: 1,
    minArgs: 1,
    expectedArgs: '<video url> or <keywords>',
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

        let theQueue = await musicQueue.getQueue(guildId)
        if (theQueue.length == 0) {
            const video = await videoFinder(arguments.join(' '))
            if (video) {
                await musicQueue.addToQueue(video, guildId)
                theQueue = await musicQueue.getQueue(guildId)
                playSong(video, guildId, voiceChannel, message, client)
            } else {
                message.channel.send('No video results found.')
            }
        } else {
            const video = await videoFinder(arguments.join(' '))
            if (video) {
                const theQueue = await musicQueue.addToQueue(video, guildId)
                message.channel.send(`**${video.title}** has been added to queue position **(${theQueue.length})**`)
                const connection = DiscordVoice.getVoiceConnection(message.guild.id)
                if (!connection) {
                    playSong(theQueue[0], guildId, voiceChannel, message, client)
                }
            } else {
                message.channel.send('No video results found.')
            }
        }
    }
}

async function videoFinder(query) {
    const videoResult = await ytSearch(query)

    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null
}

async function playSong(video, guildId, voiceChannel, message, client)  {
    const embed = new Discord.MessageEmbed()

    const stream = ytdl(video.url, {
        filter: 'audioonly',
        opusEncoded: true,
        highWaterMark: 1<<25
    })

    const player = DiscordVoice.createAudioPlayer()
    const resource = DiscordVoice.createAudioResource(stream)

    const connection = await DiscordVoice.joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guildId,
        adapterCreator: message.guild.voiceAdapterCreator
    })

    player.play(resource)
    connection.subscribe(player)

    player.addListener('stateChange', async (oldState, newState) => {
        if (newState.status == 'idle') {
            const queue = await musicQueue.getQueue(guildId)
            queue.shift()
            await musicQueue.updateQueue(guildId, queue)
            queueLength = await musicQueue.getQueueLength(guildId)
            
            if (queueLength > 0) {
                playSong(queue[0], guildId, voiceChannel, message, client)
            } /*else {
                connection.destroy()
                const emptyQueueEmbed = new Discord.MessageEmbed()
                    .setDescription('The queue is empty. Now leaving the voice channel.')
                message.channel.send({embeds: [emptyQueueEmbed]})
            }*/
        }
    })

    if (!voiceChannel) {
        return
    }
    var leaveInterval = setInterval( async () => {
        memberCount = voiceChannel.members.size
        if (memberCount <= 1) {
            const channelConnection = DiscordVoice.getVoiceConnection(message.guild.id)
            player.stop()
            await musicQueue.clearQueue(guildId)
            connection.destroy
            channelConnection.destroy
            clearInterval(leaveInterval)
        }
    }, 15000)

    // client.on('voiceStateUpdate', async (oldState, newState) => {
    //     console.log(client.voice.channel)

    //     if (newState.channel == null || newState.channel == undefined) {
    //         player.stop()
    //         await musicQueue.clearQueue(guildId)
    //         connection.destroy
    //     }
    // })

    embed.setTitle(`:thumbsup: Now Playing **${video.title}**`)
    embed.setDescription(`${video.url}`)
    message.channel.send({embeds: [embed]})
} 

module.exports.skipSong = async (guildId, message, client) => {
    let theQueue = await musicQueue.getQueue(guildId)
    const voiceChannel = message.member.voice.channel
    if (theQueue.length != 0) {
        playSong(theQueue[0], guildId, voiceChannel, message, client)
    } /*else {
        const connection = DiscordVoice.getVoiceConnection(message.guild.id)
        connection.destroy()
        const embed = new Discord.MessageEmbed()
            .setDescription('The queue is empty. Now leaving the voice channel.')
        message.channel.send({embeds: [embed]})
    }*/
}