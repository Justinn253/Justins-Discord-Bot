const Discord = require('discord.js')

module.exports = {
    commands: ['randompic'],
    cooldown: 2,
    callback: (message) => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
        let id = '';
        for (let i=0; i<4; ++i) id += characters[Math.floor(Math.random() * characters.length)]
        for (let i=0; i<2; ++i) id += Math.random(Math.random() * 9)
        let png = '.png'

        const embed = new Discord.MessageEmbed()
            .setTitle('Random Picture')
            .setURL(`https://prnt.sc/${id}`)
            .setImage(`https://prnt.sc/${id}${png}`)

        message.channel.send({embeds: [embed]})
    }
}