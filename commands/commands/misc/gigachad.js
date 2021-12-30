const Discord = require('discord.js')

module.exports = {
    commands: ['gigachad'],
    description: 'Show them whos the real shrigma.',
    cooldown: 10,
    callback: (message, arguments, text) => {
        const embed = new Discord.MessageEmbed()
            .setImage("https://c.tenor.com/epNMHGvRyHcAAAAC/gigachad-chad.gif")

            message.channel.send({embeds: [embed]})
    }
}