const Discord = require('discord.js')
const economy = require('../../../features/features/economy')
const levels = require('../../../features/features/levels')

module.exports = {
    commands: ['beg'],
    cooldown: 30,
    callback: async (message) => {
        const rollType = Math.ceil(Math.random() * 9)
        const rollLuck = Math.ceil(Math.random() * 3)

        const embed = new Discord.MessageEmbed()

        const userId = message.author.id
        const guildId = message.guild.id

        let amount = 0

        // TODO
        if (rollType < 3) {
            // Bad roll type (0 - 200)
            embed.setColor('#FF0000')
            if (rollLuck == 1) {
                embed.addFields({
                    name: 'Beg',
                    value: `Nobody wanted to give you any money. :(`
                })
            } else if (rollLuck == 2) {
                amount = Math.ceil(Math.random() * (150 - 100) + 150)
                embed.addFields({
                    name: 'Beg',
                    value: `You were given some spare change. **+$${amount}**`
                })
            } else {
                amount = Math.ceil(Math.random() * (200 - 150) + 150)
                embed.addFields({
                    name: 'Beg',
                    value: `You found a little bit of money on the street. **+$${amount}**`
                })
            }
        } else if (rollType < 6) {
            // Low average roll type (200 - 350)
            embed.setColor('#FFA500')
            if (rollLuck == 1) {
                amount = Math.ceil(Math.random() * (250 - 200) + 200)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else if (rollLuck == 2) {
                amount = Math.ceil(Math.random() * (300 - 250) + 250)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else {
                amount = Math.ceil(Math.random() * (350 - 300) + 300)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            }
        } else if (rollType < 9) {
            // High average roll type (350 - 500)
            embed.setColor('#FFFF00')
            if (rollLuck == 1) {
                amount = Math.ceil(Math.random() * (400 - 350) + 350)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else if (rollLuck == 2) {
                amount = Math.ceil(Math.random() * (450 - 400) + 400)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else {
                amount = Math.ceil(Math.random() * (500 - 450) + 450)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            }
        } else {
            // Good roll type (500 - 650)
            embed.setColor('#00FF00')
            if (rollLuck == 1) {
                amount = Math.ceil(Math.random() * (550 - 500) + 500)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else if (rollLuck == 2) {
                amount = Math.ceil(Math.random() * (600 - 500) + 450)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            } else {
                amount = Math.ceil(Math.random() * (650 - 600) + 600)
                embed.addFields({
                    name: 'Beg',
                    value: `**+$${amount}**`
                })
            }
        }
        await economy.addMoney(guildId, userId, amount)

        levels.addXP(message.guild.id, message.member.id, 100, message, message.member.user.username)
        message.channel.send({embeds: [embed]})
    }
}