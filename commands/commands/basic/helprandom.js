const Discord = require('discord.js')

module.exports = {
    commands: ['random'],
    cooldown: 10,
    callback: (message) => {

        const embed = new Discord.MessageEmbed()
                .setTitle('__Random Commands__')
                .setColor('#FF0000')
                .setThumbnail('https://cdn.discordapp.com/attachments/924054502607314965/925138866355179570/theDog12.png')
                .setFields({
                    name: 'serverinfo, si',
                    value: 'Displays basic information about this server.'
                })

        message.channel.send({embeds: [embed]})
    }
}