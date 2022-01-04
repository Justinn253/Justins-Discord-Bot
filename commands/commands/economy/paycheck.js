const Discord = require('discord.js')
const economy = require('../../../features/features/economy')
const bTop = require('../../../features/features/baltop')

module.exports = {
    commands: ['paycheck'],
    description: 'Claim your paycheck from your job.',
    cooldown: 180,
    callback: async (message, arguments, text) => {
        const userId = message.author.id
        const currentJob = await economy.getJob(userId)

        const cJob = getJob(currentJob.toLowerCase())

        if (cJob != null || cJob != undefined) {
            const pay = await economy.claimJobPay(userId, message.author.username, cJob[1])

            if (cJob[1] == null || cJob[1] == undefined || cJob[1] == 'none') {
                const embed = new Discord.MessageEmbed()
                    .setTitle('-- Jobs --')
                    .setDescription(`You can't be paid for not working... use +setjob to start working.`)
                    .setColor('#C0C0C0')
                message.channel.send({embeds: [embed]})
            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle('-- Jobs --')
                    .setDescription(`You have been paid $${pay}.`)
                    .setColor('#C0C0C0')
                message.channel.send({embeds: [embed]})
            }
        } else {
            const embed = new Discord.MessageEmbed()
                    .setTitle('-- Jobs --')
                    .setDescription(`You can't be paid for not working... use +setjob to start working.`)
                    .setColor('#C0C0C0')
                message.channel.send({embeds: [embed]})
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
    }
}