const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const DiscordVoice = require('@discordjs/voice')
const musicQueue = require('../../../features/features/music-queue')

module.exports = {
    commands: ['play', 'p'],
    cooldown: 3,
    minArgs: 1,
    expectedArgs: '<video url> or <keywords>',
    callback: async (message, arguments) => {
        let voiceChannel
        const guildId = message.guild.id

        if (message.channel.voice.channel != null && message.channel.voice.channel != undefined) {
            voiceChannel = message.member.voice.channel.id
        } else {
            return message.channel.send('You need to be in a voice channel to use this command.')
        }

        if (voiceChannel == undefined || voiceChannel == null) {
            return message.channel.send('You need to be in a voice channel to use this command.')
        }

        // const videoFinder = async (query) => {
        //     const videoResult = await ytSearch(query)

        //     return (videoResult.videos.length > 1) ? videoResult.videos[0] : null
        // }

        let theQueue = await musicQueue.getQueue(guildId)
        if (theQueue.length == 0) {
            const video = await videoFinder(arguments.join(' '))
            if (video) {
                await musicQueue.addToQueue(video, guildId)
                theQueue = await musicQueue.getQueue(guildId)
                playSong(video, guildId, voiceChannel, message)
            } else {
                message.channel.send('No video results found.')
            }
        } else {
            const video = await videoFinder(arguments.join(' '))
            if (video) {
                const theQueue = await musicQueue.addToQueue(video, guildId)
                message.channel.send(`**${video.title}** has been added to queue position **(${theQueue.length})**`)
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

async function playSong(video, guildId, voiceChannel, message) {

    const stream = ytdl(video.url, {
        filter: 'audioonly',
        opusEncoded: true,
        highWaterMark: 1<<25
    })

    const player = DiscordVoice.createAudioPlayer()
    const resource = DiscordVoice.createAudioResource(stream)

    const connection = await DiscordVoice.joinVoiceChannel({
        channelId: voiceChannel,
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
                playSong(queue[0], guildId, voiceChannel, message)
            }
        }
    })

    await message.channel.send(` :thumbsup: Now Playing **${video.title}**`)
} 