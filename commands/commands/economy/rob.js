const Discord = require('discord.js')
const economy = require('../../../features/features/economy')
const levels = require('../../../features/features/levels')

module.exports = {
    commands: ['rob'],
    description: 'Try to rob someone for some of their money.',
    cooldown: 60,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<Target's @>",
    callback: async (message, arguments) => {
        const userTag = message.author.username
        const targetTag = message.mentions.users.first().username
        const userId = message.author.id
        const targetId = message.mentions.users.first().id
        const guildId = message.guild.id
        const userMoney = await economy.getMoney(guildId, userId)
        const targetMoney = await economy.getMoney(guildId, targetId)
        const userLevel = await economy.getExactLevel(guildId, userId)
        const userMaxStealAmount = userLevel * 10000

        if (userMoney < 500) {
            message.reply('You need $500 or more to rob someone.')
            return
        }

        if (targetMoney < 500) {
            message.reply('Target is too poor to be robbed. They need $500 or more.')
            return
        }

        const roll = Math.ceil(Math.random() * 10)

        const embed = new Discord.MessageEmbed()
        embed.setTitle(`${userTag} robbing ${targetTag}`)

        if (roll < 8) {
            // Fail - Always lose $500
            embed.setColor('#FF0000')
            const rollMessage = Math.ceil(Math.random() * 10)
            if (rollMessage == 1) {
                embed.setDescription(`You were shot dead! ${targetTag} has taken **$500** from you.`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney - 500}`
                })
            } else if (rollMessage == 2) {
                embed.setDescription(`${targetTag} called the cops! You were arrested and paid them **$500**.`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney - 500}`
                })
            } else if (rollMessage == 3) {
                embed.setDescription(`${targetTag} has robbed you instead! They stole **$500** from you.`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney - 500}`
                })
            } else if (rollMessage == 4) {
                embed.setDescription(`You have tripped and fell. ${targetTag} thinks you're pathetic and takes **$500**!`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney - 500}`
                })
            } else if (rollMessage == 5) {
                embed.setDescription(`You approached ${targetTag}. They were too intimidating so you gave them **$500** and ran away!`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney - 500}`
                })
            } else if (rollMessage == 6) {
                embed.setDescription(`${targetTag} called you a loser. You started crying as they took **$500** from you.`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney - 500}`
                })
            } else if (rollMessage == 7) {
                embed.setDescription(`${targetTag} made you explode! They took **$500** from you!`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney - 500}`
                })
            } else if (rollMessage == 8) {
                embed.setDescription(`${targetTag} had backup and you were clobbered to death. They took **$500** from you!`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney - 500}`
                })
            } else if (rollMessage == 9) {
                embed.setDescription(`You slipped on a banana peel and brutally died! ${targetTag} took **$500** from you.`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney - 500}`
                })
            } else {
                embed.setDescription(`You managed to steal **$2000** from ${targetTag}! But they also took **$2500** from you.`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney - 500}`
                })
            }

            economy.addMoney(guildId, userId, -500)
            economy.addMoney(guildId, targetId, 500)

        } else {
            // Success - Steal a variable amount of money. Does not exceed 35% of targets money.
            const stealRoll = Math.ceil(Math.random() * 10)
            let stealAmount = 0
            const maxStealAmount = targetMoney * 0.1

            if (stealRoll < 8) {
                // 10% - 24%
                stealAmount = Math.round(targetMoney * (Math.ceil(Math.random() * 5) / 100)) 
                if (stealAmount > userMaxStealAmount) {
                    stealAmount = userMaxStealAmount
                }
            } else  {
                // 25 - 35%
                stealAmount = Math.round(targetMoney * (Math.ceil(Math.random() * 10) / 100))
                if (stealAmount > userMaxStealAmount) {
                    stealAmount = userMaxStealAmount
                }
            }

            embed.setColor('#00FF00')
            const rollMessage = Math.ceil(Math.random() * 10)
            if (rollMessage == 1) {
                embed.setDescription(`You have successfully robbed ${targetTag} for **$${stealAmount}**!`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney + stealAmount}`
                })
            } else if (rollMessage == 2) {
                embed.setDescription(`${targetTag} self-desctructed! Too bad you were not close to them. You stole **$${stealAmount}**!`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney + stealAmount}`
                })
            } else if (rollMessage == 3) {
                embed.setDescription(`A bystander tries to help... just not ${targetTag}. You stole **$${stealAmount}**!`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney + stealAmount}`
                })
            } else if (rollMessage == 4) {
                embed.setDescription(`You throw pocket sand into ${targetTag}'s eyes. You run off with **$${stealAmount}**.`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney + stealAmount}`
                })
            } else if (rollMessage == 5) {
                embed.setDescription(`You murder ${targetTag} for fun and take **$${stealAmount}**!`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney + stealAmount}`
                })
            } else if (rollMessage == 6) {
                embed.setDescription(`${targetTag} is already overdosed on crack. You steal **$${stealAmount}**!`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney + stealAmount}`
                })
            } else if (rollMessage == 7) {
                embed.setDescription(`${targetTag}'s internal organs fail. You take **$${stealAmount}** from their corpse.`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney + stealAmount}`
                })
            } else if (rollMessage == 8) {
                embed.setDescription(`${targetTag} gives you **$${stealAmount}** to leave them alone. You kill them anyway.`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney + stealAmount}`
                })
            } else if (rollMessage == 9) {
                embed.setDescription(`${targetTag} tries to play dead. You take **$${stealAmount}** anyway.`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney + stealAmount}`
                })
            } else  {
                embed.setDescription(`${targetTag} tries to fight back. You annihilate them in hand-to-hand combat and steal **$${stealAmount}**!`)
                embed.addFields({
                    name: '- NEW BALANCE -',
                    value: `$${userMoney + stealAmount}`
                })
            }

            if (stealAmount > maxStealAmount) {
                console.log(`Error stealing - ${stealAmount} exceeds ${maxStealAmount}.`)
            } else {
                economy.addMoney(guildId, userId, stealAmount)
                economy.addMoney(guildId, targetId, -stealAmount)
                levels.addXP(message.guild.id, message.member.id, 350, message, message.member.user.username)
            }
        }

        message.channel.send({embeds: [embed]})
    }
}