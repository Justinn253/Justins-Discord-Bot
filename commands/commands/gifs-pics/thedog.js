const Discord = require('discord.js')

module.exports = {
    commands: ['thedog'],
    description: 'My companions',
    cooldown: 5,
    callback: (message, arguments, text) => {
        const dogs = ['https://cdn.discordapp.com/attachments/923692313149075486/927802508045324298/theDog.png',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802508288606239/theDog2.jpg',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802508489941043/theDog3.png',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802508770938910/theDog4.jpg',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802509001637888/theDog5.jpg',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802509211361300/theDog6.png',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802509609795614/theDog7.png',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802509827932230/theDog8.jpg',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802510012477500/theDog9.png',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802510276702218/theDog10.jpg',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802603448983602/theDog11.png',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802603658678282/theDog12.png',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802603860029520/theDog13.jpg',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802604040355840/theDog14.png',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802604254273546/theDog15.png',
                      'https://cdn.discordapp.com/attachments/923692313149075486/927802604484980746/theDog16.png',
                    ]

        const roll = Math.floor(Math.random() * 16)
        const embed = new Discord.MessageEmbed()
            .setTitle('A member of the dogs.')
            .setImage(dogs[roll])

            message.channel.send({embeds: [embed]})
    }
}