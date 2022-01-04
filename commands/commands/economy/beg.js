const Discord = require('discord.js')
const economy = require('../../../features/features/economy')
const levels = require('../../../features/features/levels')

const { floor, random } = Math

module.exports = {
    commands: ['beg'],
    description: 'Begs for a small amount of money.',
    cooldown: 30,
    callback: async (message, arguments) => {
        const rollType = Math.ceil(Math.random() * 9)
        const rollLuck = Math.ceil(Math.random() * 3)

        const embed = new Discord.MessageEmbed()

        const userId = message.author.id
        const guildId = message.guild.id

        if (rollType < 3) {
            // Bad roll type (0 - 200)
            embed.setColor('#FF0000')
            if (rollLuck == 1) {
                embed.addFields({
                    name: 'Beg',
                    value: `Nobody wanted to give you any money. :(`
                })
            } else if (rollLuck == 2) {
                const amount = Math.ceil(Math.random() * (150 - 100) + 150)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `You were given some spare change. **+$${amount}**`
                })
            } else {
                const amount = Math.ceil(Math.random() * (200 - 150) + 150)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `You found a little bit of money on the street. **+$${amount}**`
                })
            }
        } else if (rollType < 6) {
            // Low average roll type (200 - 350)
            embed.setColor('#FFA500')
            if (rollLuck == 1) {
                const amount = Math.ceil(Math.random() * (250 - 200) + 200)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else if (rollLuck == 2) {
                const amount = Math.ceil(Math.random() * (300 - 250) + 250)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else {
                const amount = Math.ceil(Math.random() * (350 - 300) + 300)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            }
        } else if (rollType < 9) {
            // High average roll type (350 - 500)
            embed.setColor('#FFFF00')
            if (rollLuck == 1) {
                const amount = Math.ceil(Math.random() * (400 - 350) + 350)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else if (rollLuck == 2) {
                const amount = Math.ceil(Math.random() * (450 - 400) + 400)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else {
                const amount = Math.ceil(Math.random() * (500 - 450) + 450)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            }
        } else {
            // Good roll type (500 - 650)
            embed.setColor('#00FF00')
            if (rollLuck == 1) {
                const amount = Math.ceil(Math.random() * (550 - 500) + 500)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else if (rollLuck == 2) {
                const amount = Math.ceil(Math.random() * (600 - 500) + 450)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else {
                const amount = Math.ceil(Math.random() * (650 - 600) + 600)
                await economy.addMoney(guildId, userId, amount)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            }
        }

        levels.addXP(message.guild.id, message.member.id, 100, message, message.member.user.username)
        message.channel.send({embeds: [embed]})
    }
}