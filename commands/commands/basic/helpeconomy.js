const Discord = require('discord.js')

module.exports = {
    commands: ['economy'],
    description: 'Displays bot commands in the "economy" category.',
    cooldown: 10,
    callback: (message, arguments, text) => {

        const embed = new Discord.MessageEmbed()
                .setTitle('__Economy Commands__')
                .setColor('#FF0000')
                .setThumbnail('https://cdn.discordapp.com/attachments/924054502607314965/925138866355179570/theDog12.png')
                .setFields({
                    name: 'balance <user>, bal <user>',
                    value: 'Displays your balance or another persons balance.'
                },{
                    name: 'beg',
                    value: 'Begs for a small amount of money.'
                },{
                    name: 'daily',
                    value: 'Claims your daily rewards.'
                },{
                    name: 'gamble <amount>',
                    value: 'Gambles a specified amount of money (50/50 odds).'
                },{
                    name: 'level <user>',
                    value: 'Displays your level or another persons level.'
                },{
                    name: 'pay <user> <amount>',
                    value: 'Pays a user a specified amount of your money.'
                },)

        message.channel.send({embeds: [embed]})
    }
}