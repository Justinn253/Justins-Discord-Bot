module.exports = {
    commands: ['servers'],
    cooldown: 20,
    callback: (message, client) => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members`
            )
        })
    }
}