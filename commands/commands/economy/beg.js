const Discord = require('discord.js')
const economy = require('../../../features/features/economy')

const { floor, random } = Math

module.exports = {
    commands: ['beg'],
    description: 'Begs for a small amount of money.',
    cooldown: 1,
    callback: async (message, arguments) => {
        const rollType = Math.ceil(Math.random() * 9)
        const rollLuck = Math.ceil(Math.random() * 3)

        const embed = new Discord.MessageEmbed()

        const userId = message.author.id
        const guildId = message.guild.id
        console.log(userId)

        if (rollType < 3) {
            // Bad roll type (0 - 99)
            embed.setColor('#FF0000')
            if (rollLuck == 1) {
                embed.addFields({
                    name: 'Beg',
                    value: `Nobody wanted to give you any money.`
                })
            } else if (rollLuck == 2) {
                const amount = Math.ceil(Math.random() * (60 - 40) + 40)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `You were given some spare change. **+$${amount}**`
                })
            } else {
                const amount = Math.ceil(Math.random() * (100 - 60) + 60)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `You found a little bit of money on the street. **+$${amount}**`
                })
            }
        } else if (rollType < 6) {
            // Low average roll type (100 - 200)
            embed.setColor('#FFA500')
            if (rollLuck == 1) {
                const amount = Math.ceil(Math.random() * (130 - 100) + 100)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else if (rollLuck == 2) {
                const amount = Math.ceil(Math.random() * (160 - 130) + 130)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else {
                const amount = Math.ceil(Math.random() * (200 - 160) + 160)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            }
        } else if (rollType < 9) {
            // High average roll type (200-300)
            embed.setColor('#FFFF00')
            if (rollLuck == 1) {
                const amount = Math.ceil(Math.random() * (230 - 200) + 200)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else if (rollLuck == 2) {
                const amount = Math.ceil(Math.random() * (260 - 230) + 230)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else {
                const amount = Math.ceil(Math.random() * (300 - 260) + 260)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            }
        } else {
            // Good roll type (400-600)
            embed.setColor('#00FF00')
            if (rollLuck == 1) {
                const amount = Math.ceil(Math.random() * (450 - 400) + 400)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else if (rollLuck == 2) {
                const amount = Math.ceil(Math.random() * (500 - 450) + 450)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else {
                const amount = Math.ceil(Math.random() * (600 - 500) + 500)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            }
        }

        message.channel.send({embeds: [embed]})
    }
}