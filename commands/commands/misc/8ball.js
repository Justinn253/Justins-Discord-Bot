const Discord = require('discord.js')
const { floor, random } = Math

module.exports = {
    commands: ['8ball'],
    description: 'See if something is true or not.',
    cooldown: 3,
    minArgs: 1,
    expectedArgs: "<message>",
    callback: (message, arguments, text) => {
        const embed = new Discord.MessageEmbed()
        embed.setTitle(`8Ball - "${arguments.join(' ')}"`)
        embed.setColor('#9370DB')
        const roll = Math.ceil(Math.random() * 3)

        if (roll == 1) {
            embed.setDescription('No')
        } else if (roll == 2) {
            embed.setDescription('Maybe')
        } else {
            embed.setDescription('Yes')
        }

        message.channel.send({embeds: [embed]})
    }
}