const Discord = require('discord.js')

module.exports = {
    commands: ['misc'],
    cooldown: 10,
    callback: (message) => {

        const embed = new Discord.MessageEmbed()
                .setTitle('__Misc Commands__')
                .setColor('#FF0000')
                .setThumbnail('https://cdn.discordapp.com/attachments/924054502607314965/925138866355179570/theDog12.png')
                .setFields({
                    name: 'ping',
                    value: '"Pong" (useful) for seeing if the bot is responding.'
                },{
                    name: 'pp, weiner, peen <user>',
                    value: 'Check your size.'
                },{
                    name: '8ball',
                    value: 'See if something is true or not.'
                },{
                    name: 'leagueult, lu',
                    value: 'Trivia game - Guess the league champion based on their ultimate name.'
                },{
                    name: 'leaguetitle, lt',
                    value: 'Trivia game - Guess the league champion based on their title.'
                })

        message.channel.send({embeds: [embed]})
    }
}