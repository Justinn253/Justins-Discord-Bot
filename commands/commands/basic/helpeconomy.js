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
                    name: 'baltop',
                    value: 'See the global balance leaderboard.'
                },{
                    name: 'gamble <amount>',
                    value: 'Gambles a specified amount of money (40/60 odds).'
                },{
                    name: 'level <user>, xp <user>',
                    value: 'Displays your level or another persons level.'
                },{
                    name: 'pay <user> <amount>',
                    value: 'Pays a user a specified amount of your money.'
                },{
                    name: 'rob <user>',
                    value: 'Attempts to rob someone for some of their money.'
                },{
                    name: 'setjob <job>',
                    value: 'Set a job to earn passive income.'
                },{
                    name: 'paycheck',
                    value: 'Claim the pay from your job.'
                },{
                    name: 'viewjobs',
                    value: 'View the list of jobs'
                })

        message.channel.send({embeds: [embed]})
    }
}