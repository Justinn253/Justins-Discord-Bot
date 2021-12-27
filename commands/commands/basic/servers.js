module.exports = {
    commands: ['servers'],
    description: 'Shows every server that this bot is in.',
    cooldown: 20,
    callback: (message, arguments, text, client) => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members`
            )
        })
    }
}