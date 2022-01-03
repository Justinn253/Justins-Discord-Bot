const Discord = require('discord.js')

module.exports = {
    commands: ['admin'],
    description: 'Displays bot commands in the "admin" category',
    cooldown: 10,
    callback: (message, arguments, text) => {

        const embed = new Discord.MessageEmbed()
                .setTitle('__Admin Commands__')
                .setColor('#FF0000')
                .setThumbnail('https://cdn.discordapp.com/attachments/924054502607314965/925138866355179570/theDog12.png')
                .setFields({
                    name: 'ban <user>',
                    value: 'Bans a user.'
                },{
                    name: 'kick <user>',
                    value: 'Kicks a user.'
                },{
                    name: 'setmoneypopup',
                    value: 'Sets up the money pop up event for that channel.'
                },{
                    name: 'clearchannel, cc',
                    value: 'Clears the current channel of all messages.'
                },)

        message.channel.send({embeds: [embed]})
    }
}