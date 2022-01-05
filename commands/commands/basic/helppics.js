const Discord = require('discord.js')

module.exports = {
    commands: ['gifs', 'pics'],
    cooldown: 10,
    callback: (message) => {

        const embed = new Discord.MessageEmbed()
                .setTitle('__Gifs/Pics Commands__')
                .setColor('#FF0000')
                .setThumbnail('https://cdn.discordapp.com/attachments/924054502607314965/925138866355179570/theDog12.png')
                .setFields({
                    name: 'nobitches <user>',
                    value: 'YOU GET NO BITCHES'
                },{
                    name: 'gigachad',
                    value: 'Show them whos the real shrigma.'
                },{
                    name: 'randompic',
                    value: 'Gets a random link from prnt.sc'
                },{
                    name: 'sneakysneaky',
                    value: 'I WAS HIDING HE HE HE HA'
                },{
                    name: 'thedog',
                    value: 'Show a member of the dogs.'
                })

        message.channel.send({embeds: [embed]})
    }
}