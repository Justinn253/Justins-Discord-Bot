const Discord = require('discord.js')

module.exports = {
    commands: ['bite'],
    cooldown: 2,
    expectedArgs: "[Target user's @]",
    callback: (message) => {
        const embed = new Discord.MessageEmbed()
            .setImage("https://cdn.discordapp.com/attachments/710758816425181225/928556754676121610/IMG_8349.jpg")

            message.channel.send({embeds: [embed]})
    }
}