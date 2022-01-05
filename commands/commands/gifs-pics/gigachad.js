const Discord = require('discord.js')

module.exports = {
    commands: ['gigachad'],
    cooldown: 2,
    callback: (message) => {
        const embed = new Discord.MessageEmbed()
            .setImage("https://c.tenor.com/epNMHGvRyHcAAAAC/gigachad-chad.gif")

            message.channel.send({embeds: [embed]})
    }
}