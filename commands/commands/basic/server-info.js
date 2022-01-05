const Discord = require('discord.js')

module.exports = {
    commands: ['serverinfo', 'si'],
    cooldown: 20,
    callback: (message) => {
        const { guild } = message

        const { name, memberCount, preferredLocale, 
                createdAt, verified, afkTimeout } = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields({
                name: 'Name',
                value: name,
            },{
                name: 'Members',
                value: memberCount.toString(),
            },{
                name: 'Region',
                value: preferredLocale,
            },{
                name: 'Created',
                value: createdAt.toString(),
            },{
                name: 'Verified',
                value: verified.toString(),
            },{
                name: 'AFK Timeout',
                value: (afkTimeout / 60).toString(),
            })
            message.channel.send({embeds: [embed]}).then(message => {
            setTimeout(() => {
                message.delete()
            }, 1000 * 60)
        })
    }
}