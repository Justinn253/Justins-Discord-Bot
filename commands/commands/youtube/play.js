const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const Discord = require('@discordjs/voice')

module.exports = {
    commands: ['play'],
    description: 'Play a video from youtube',
    cooldown: 5,
    minArgs: 1,
    expectedArgs: '<video url> or <keywords>',
    callback: async (message, arguments) => {
        const voiceChannel = message.member.voice.channel.id
        const guildId = message.guild.id

        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to use this command.')
        }

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query)

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null
        }

        const video = await videoFinder(arguments.join(' '))

        if (video) {
            const stream = ytdl(video.url, {filter: 'audioonly'})
            const player = Discord.createAudioPlayer()
            const resource = Discord.createAudioResource(stream)

            const connection = await Discord.joinVoiceChannel({
                channelId: voiceChannel,
                guildId: guildId,
                adapterCreator: message.guild.voiceAdapterCreator
            })

            player.play(resource)
            connection.subscribe(player)

            player.on(Discord.AudioPlayerStatus.Idle, () => {
                console.log('idle')
                connection.destroy()
            })

            await message.reply(` :thumbsup: Now Playing **${video.title}**`)
        } else {
            message.channel.send('No video results found')
        }
    }
}