const Discord = require('discord.js')
const economy = require('../../../features/features/economy')
const bTop = require('../../../features/features/baltop')

module.exports = {
    commands: ['setjob'],
    description: 'Set a job to earn passive income.',
    cooldown: 30,
    maxArgs: 1,
    expectedArgs: '<job>',
    callback: async (message, arguments, text) => {
        const userId = message.author.id
        const currentJob = await economy.getJob(userId)

        if (arguments.length == 0) {
            return
        }

        if (currentJob.toLowerCase() == arguments[0].toLowerCase()) {
            const setJobEmbed = new Discord.MessageEmbed()
                .setTitle('-- Jobs --')
                .setDescription(`You are already set as ${arguments[0]}`)
                .setColor('#C0C0C0')
            message.channel.send({embeds: [setJobEmbed]})
            return
        }

        const userLevel = await economy.getExactLevel(message.guild.id, userId)
        const job = getJob(arguments[0])

        if (job[0] == 'none') {
            const setJobEmbed = new Discord.MessageEmbed()
                .setTitle('-- Jobs --')
                .setDescription(`Incorrect job parameter. Make sure it is spelled correctly.`)
                .setColor('#C0C0C0')
            message.channel.send({embeds: [setJobEmbed]})
            return
        }

        if (job[2] <= userLevel) {
            if (currentJob.toLowerCase() != 'none' && currentJob != null && currentJob != undefined) {
                const cJob = getJob(currentJob)
                const pay = await economy.claimJobPay(userId, message.author.username, cJob[1])
                const embed = new Discord.MessageEmbed()
                    .setTitle('-- Jobs --')
                    .setDescription(`You have been paid $${pay}.`)
                    .setColor('#C0C0C0')
                message.channel.send({embeds: [embed]})
            }
            const setJobEmbed = new Discord.MessageEmbed()
                .setTitle('-- Jobs --')
                .setDescription(`You have now set your job to **${arguments[0]}**. Use +paycheck to claim your payments.`)
                .setColor('#C0C0C0')
            await economy.setJob(userId, message.author.username, job[0])
            message.channel.send({embeds: [setJobEmbed]})
        } else {
            const setJobEmbed = new Discord.MessageEmbed()
                .setTitle('-- Jobs --')
                .setDescription(`You are too low of a level to be a ${job[0]}`)
                .setColor('#C0C0C0')
            message.channel.send({embeds: [setJobEmbed]})
        }
    }
}

function getJob(choice) {
    if (choice.toLowerCase() == 'beggar') {
        return ['Beggar', 10, 1]
    } else if (choice.toLowerCase() == 'fast-food') {
        return ['Fast-Food', 20, 5]
    } else if (choice.toLowerCase() == 'chef') {
        return ['Chef', 30, 10]
    } else if (choice.toLowerCase() == 'teacher') {
        return ['Teacher', 40, 15]
    } else if (choice.toLowerCase() == 'construction') {
        return ['Construction', 50, 20]
    } else if (choice.toLowerCase() == 'nurse') {
        return ['Nurse', 65, 30]
    } else if (choice.toLowerCase() == 'engineer') {
        return ['Engineer', 75, 40]
    } else if (choice.toLowerCase() == 'stock-trader') {
        return ['Stock-Trader', 90, 50]
    } else if (choice.toLowerCase() == 'doctor') {
        return ['Doctor', 125, 75]
    } else if (choice.toLowerCase() == 'ceo') {
        return ['CEO', 175, 100]
    } else {
        return ['none', 0, 0]
    }
}