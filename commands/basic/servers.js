module.exports = {
    commands: ['servers'],
    callback: (message, arguments, text, client) => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members`
            )
        })
    }
}