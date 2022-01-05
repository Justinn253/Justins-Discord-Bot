const musicQueue = require('../../../features/features/music-queue')
const Discord = require('discord.js')

module.exports = {
    commands: ['queue'],
    cooldown: 3,
    callback: async (message, arguments) => {
        const queue = await musicQueue.getQueue(message.guild.id)
        const queueLength = await musicQueue.getQueueLength(message.guild.id)
        const embed = new Discord.MessageEmbed()
            .setTitle(`__The Music Queue__`)

        if (queueLength > 0) {
            for (i = 0; i < queueLength; i++) {
                embed.addFields({
                    name: `**${i+1}.**`,
                    value: `${queue[i].title}`
                })
            }
        } else {
            embed.addFields({
                name: `**Empty**`,
                value: `Use +play <link> to add a video to the queue.`
            })
        }

        message.channel.send({embeds: [embed]})
    }
}