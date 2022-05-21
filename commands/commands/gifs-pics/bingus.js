const Discord = require('discord.js')

module.exports = {
    commands: ['bingus'],
    cooldown: 2,
    callback: (message) => {
        const dogs = ['https://cdn.discordapp.com/attachments/914607504997118036/977423136297451570/unknown.png',
                      'https://cdn.discordapp.com/attachments/914607504997118036/977423219999014943/unknown.png',
                      'https://cdn.discordapp.com/attachments/914607504997118036/977423251363987516/unknown.png',
                      'https://cdn.discordapp.com/attachments/914607504997118036/977423450052362280/unknown.png'
                    ]

        const roll = Math.floor(Math.random() * 4)
        const embed = new Discord.MessageEmbed()
            .setTitle(`B i n g u s`)
            .setImage(dogs[roll])
            .setColor('#E2B8B4')

            message.channel.send({embeds: [embed]})
    }
}