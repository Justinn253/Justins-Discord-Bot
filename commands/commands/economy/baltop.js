const Discord = require('discord.js')
const economy = require('../../../features/features/economy')
const bTop = require('../../../features/features/baltop')

module.exports = {
    commands: ['baltop', 'lb', 'leaderboard', 'top', 'richest'],
    cooldown: 10,
    maxArgs: 1,
    expectedArgs: '<list_size>',
    callback: async (message) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('-- Global Balance Leaderboard --')
            .setColor('#50C878')

        let listSize = 15

        let sortedProfiles = await economy.sortByMoney(listSize)
        let sortedProfiles2 = []
        for (i = 0; i < listSize; i++) {
            sortedProfiles2[i] = sortedProfiles[i]
        }

        sortedProfiles2 = await bTop.setLeaderboard(sortedProfiles2)

        let leaderboard = ``
        for (i = 0; i < listSize; i++) {
            let name = sortedProfiles2[i].username
            const money = sortedProfiles2[i].money
            if (name == undefined || name == null) {
                name = 'Temporary Name'
            }
            leaderboard += `**${i+1}.**  ${name}:  _$${money}_\n`
        }
        embed.setDescription(String(leaderboard))

        message.channel.send({embeds: [embed]})
    }
}