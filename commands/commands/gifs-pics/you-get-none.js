const Discord = require('discord.js')

module.exports = {
    commands: ['nobitches'],
    cooldown: 2,
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    callback: (message) => {
        const embed = new Discord.MessageEmbed()
            .setImage("https://c.tenor.com/wzC5w0jPSH8AAAAC/yougetnobitches-toy-story.gif")

            message.channel.send({embeds: [embed]})
    }
}