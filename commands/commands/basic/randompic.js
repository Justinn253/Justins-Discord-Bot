const Discord = require('discord.js')

const { floor, random } = Math

module.exports = {
    commands: ['randompic'],
    description: 'Generates a random link to prnt.sc for random pictures.',
    cooldown: 3,
    callback: (message, arguments, text) => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
        let id = '';
        for (let i=0; i<4; ++i) id += characters[floor(random()*characters.length)]
        for (let i=0; i<2; ++i) id += floor(random()*9)
        let png = '.png'

        const embed = new Discord.MessageEmbed()
            .setTitle('Random Picture')
            .setURL(`https://prnt.sc/${id}`)
            .setImage(`https://prnt.sc/${id}${png}`)

        message.channel.send({embeds: [embed]})
    }
}