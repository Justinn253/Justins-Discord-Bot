const Discord = require('discord.js')

module.exports = {
    commands: ['music'],
    cooldown: 10,
    callback: (message) => {

        const embed = new Discord.MessageEmbed()
                .setTitle('__Music Commands__')
                .setColor('#FF0000')
                .setThumbnail('https://cdn.discordapp.com/attachments/924054502607314965/925138866355179570/theDog12.png')
                .setFields({
                    name: 'play, p <url> OR <keywords>',
                    value: 'Play a song or put a song in the queue.'
                },{
                    name: 'skip',
                    value: 'Skips the current song in the queue.'
                },{
                    name: 'queue',
                    value: 'See the current queue.'
                },{
                    name: 'clear',
                    value: 'Clear the current queue.'
                },{
                    name: 'leave',
                    value: 'Have the bot leave channel. Will also clear the queue.'
                })

        message.channel.send({embeds: [embed]})
    }
}