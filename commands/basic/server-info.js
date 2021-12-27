const Discord = require('discord.js')

module.exports = {
    commands: ['serverinfo', 'si'],
    callback: (message, arguments, text) => {
        const { guild } = message

        const { name, memberCount, preferredLocale, 
                createdAt, verified, banner, afkTimeout } = guild
        const icon = guild.iconURL()
        //console.log(name, memberCount.toString(), preferredLocale, createdAt.toString(), verified.toString(), banner, afkTimeout.toString(), icon)

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