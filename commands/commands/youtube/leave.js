const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')

module.exports = {
    commands: ['leave'],
    description: '',
    cooldown: 5,
    minArgs: 1,
    expectedArgs: '',
    callback: async (message, arguments) => {
        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to use this command.')
        }
        
        const connection = await voiceChannel.join()

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query)

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null
        }

        const video = await videoFinder(arguments.join(' '))

        if (video) {
            const stream = ytdl(video.url, {filter: 'audioonly'})
            connection.play(stream, {seek: 0, volume: 1})
                .on('finish', () => {
                    voiceChannel.leave()
                })

                await message.reply(` :thumbsup: Now Playing **${video.title}**`)
        } else {
            message.channel.send('No video results found')
        }
    }
}