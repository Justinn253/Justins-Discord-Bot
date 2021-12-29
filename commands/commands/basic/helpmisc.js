const Discord = require('discord.js')

module.exports = {
    commands: ['misc'],
    description: 'Displays bot commands in the "misc" category',
    cooldown: 10,
    callback: (message, arguments, text) => {

        const embed = new Discord.MessageEmbed()
                .setTitle('__Misc Commands__')
                .setColor('#FF0000')
                .setThumbnail('https://cdn.discordapp.com/attachments/924054502607314965/925138866355179570/theDog12.png')
                .setFields({
                    name: 'ping',
                    value: '"Pong" (useful) for seeing if the bot is responding.'
                },{
                    name: 'pp <user>, weiner <user>, peen <user>',
                    value: 'Check your size.'
                },{
                    name: 'nobitches <user>',
                    value: 'YOU GET NO BITCHES'
                },{
                    name: '8ball',
                    value: 'See if something is true or not.'
                })

        message.channel.send({embeds: [embed]})
    }
}