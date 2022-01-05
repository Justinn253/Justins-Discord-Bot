const Discord = require('@discordjs/voice')

module.exports = {
    commands: ['leave'],
    cooldown: 3,
    callback: async (message, arguments) => {
        const connection = Discord.getVoiceConnection(message.guild.id)

        if (connection) {
            connection.destroy()
        } else {
            return message.channel.send('I am not connected to any voice channels.')
        }
    }
}
