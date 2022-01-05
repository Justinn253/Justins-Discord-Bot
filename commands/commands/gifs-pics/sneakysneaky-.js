const Discord = require('discord.js')

module.exports = {
    commands: ['sneakysneaky'],
    cooldown: 2,
    callback: (message) => {
        const embed = new Discord.MessageEmbed()
            .setImage("https://cdn.discordapp.com/attachments/710758816425181225/926245655314317433/20211229_204730.jpg")

            message.channel.send({embeds: [embed]})
    }
}