const musicQueue = require('../../../features/features/music-queue')

module.exports = {
    commands: ['clearqueue'],
    cooldown: 3,
    callback: async (message, arguments) => {
        musicQueue.clearQueue(message.guild.id)
    }
}