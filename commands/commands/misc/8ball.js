const Discord = require('discord.js')

module.exports = {
    commands: ['8ball'],
    cooldown: 3,
    minArgs: 1,
    expectedArgs: "<message>",
    callback: (message, arguments) => {
        for (i = 0; i < arguments.length; i++) {
            if (arguments[i].startsWith('<@')) {
                const tagId = arguments[i].substring(2, arguments[i].length-1)
                arguments[i] = message.guild.members.cache.get(tagId).user.username
            }
        }
        const embed = new Discord.MessageEmbed()
        embed.setTitle(`8Ball - "${arguments.join(' ')}"`)
        embed.setColor('#9370DB')
        const roll = Math.ceil(Math.random() * 3)

        // TODO
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