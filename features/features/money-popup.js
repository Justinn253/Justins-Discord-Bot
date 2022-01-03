const mongo = require('../../util/mongo')
const command = require('../../util/commands')
const Discord = require('discord.js')
const moneyPopupSchema = require('../../schemas/money-popup-schema')
const economy = require('./economy')

const { floor, random } = Math

module.exports = (client) => {
    const cache = {}
    let timerEnd = 0

    command(client, 'setmoneypopup', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.permissions.has("ADMINISTRATOR")) {
            channel.send('You do not have permission to run this command.')
            return
        }

        cache[guild.id] = [channel.id]

        await mongo().then(async (mongoose) => {
            try {
                await moneyPopupSchema.findOneAndUpdate({
                    _id: guild.id
                },{
                    _id: guild.id,
                    channelId: channel.id,
                },{
                    upsert: true
                })
            } finally {
                //mongoose.connection.close()
            }
        })

        await mongo().then(async (mongoose) => {
            try { 
                const result = await moneyPopupSchema.findOne({_id: guild.id})
                cache[guild.id] = result.channelId
            } finally {
                //mongoose.connection.close()
            }
        })
    })

    client.on('messageCreate', async (message) => {
        if (timerEnd <= new Date().getTime()) {
            if (cache[message.guild.id] == undefined || cache[message.guild.id] == null) {
                await mongo().then(async (mongoose) => {
                    try {
                        await moneyPopupSchema.findOneAndUpdate({
                            _id: message.guild.id
                        },{
                            _id: message.guild.id,
                            channelId: message.channel.id,
                        },{
                            upsert: true
                        })
                    } finally {
                        //mongoose.connection.close()
                    }
                })

                await mongo().then(async (mongoose) => {
                    try { 
                        const result = await moneyPopupSchema.findOne({_id: message.guild.id})
                        cache[message.guild.id] = result.channelId
                    } finally {
                        //mongoose.connection.close()
                    }
                })
            }

            if (!message.author.bot && message.channel.id == cache[message.guild.id]) {
                const roll = Math.ceil(Math.random() * 20)

                if (roll == 1) {
                    const words = ['money', 'dollars', 'bank', 'rich']
                    const wordRoll = Math.floor(Math.random() * 4)
                    const embed = new Discord.MessageEmbed()
                        .setTitle('Money Popup Event!')
                        .setDescription(`A money popup event has started! The first person to type **${words[wordRoll]}** gets $10000!`)
                        .setColor('#FFD700')
                    
                    message.channel.send({embeds: [embed]})
                        .then(msg => {
                            setTimeout(() => msg.delete(), 15000)
                        })

                    const filter = (m) => {
                        !m.author.bot,
                        m.content.toLowerCase() == words[wordRoll].toLowerCase()
                    }

                    const collector = new Discord.MessageCollector(message.channel, filter)

                    let answered = false
                    setTimeout(() => {
                        if (!answered) {
                            collector.stop()
                            const endEmbed = new Discord.MessageEmbed()
                                .setTitle('Money Popup Event!')
                                .setDescription(`You have ran out of time!`)
                                .setColor('#FFD700')
                            message.channel.send({embeds: [endEmbed]})
                        }
                    }, 15000)

                    collector.on('collect', async (m) => {
                        if (m.content.toLowerCase() == words[wordRoll].toLowerCase()) {
                            const winnerEmbed = new Discord.MessageEmbed()
                                .setTitle('Money Popup Event!')
                                .setDescription(`${m.author.username} was the first person to get it and won $10000!`)
                                .setColor('#FFD700')
                            collector.stop()
                            answered = true
                            economy.addMoney(m.guild.id, m.author.id, 10000)
                            return message.channel.send({embeds: [winnerEmbed]})
                        }
                    })
                    timerEnd = new Date().getTime() + 20000
                }
            }
        } 
    })
}