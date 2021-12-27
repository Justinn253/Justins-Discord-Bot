const Discord = require('discord.js')

module.exports = {
    commands: ['help'],
    callback: (message, arguments, text) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('Commands')
            .setColor('#FF0000')
            .addFields({
                name: '+help',
                value: 'Displays the help menu'
            },{
               name: '+randompic',
               value: 'Pulls a link to a random prnt.sc'
            },{
                name: '+serverinfo',
                value: 'Displays basic information about the server'
            },{
                name: `+bal <user>`,
                value: 'Displays yours or another persons balance.'
            },{
                name: `+pay <user> <amount>`,
                value: 'Gives another person money.'
            },{
                name: `+gamble <amount> / all`,
                value: 'Gambles the amount specified (50/50 odds).'
            },{
                name: `+ping`,
                value: '"Pong" (useful to see if bot is responding).'
            },{
                name: `+servers`,
                value: 'Can see every server the bot is in'
            },{
                name: `**(ADMIN)** +ban <user>`,
                value: 'Bans a user'
            },{
                name: `**(ADMIN)** +kick <user>`,
                value: 'Kicks a user'
            },{
                name: `**(ADMIN)** +cc, +clearchannel`,
                value: 'Clears all messages from a channel'
            })
        message.channel.send({embeds: [embed]})
    }
}