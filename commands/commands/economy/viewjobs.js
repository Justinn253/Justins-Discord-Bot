const Discord = require('discord.js')
const economy = require('../../../features/features/economy')
const bTop = require('../../../features/features/baltop')

module.exports = {
    commands: ['viewjobs'],
    description: 'View the list of jobs.',
    cooldown: 5,
    callback: async (message, arguments, text) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('-- Jobs --')
            .setDescription(`**Choose a job from the list below:**
                            lvl 1   - Beggar ($10/min)
                            lvl 5   - Fast-Food ($20/min)
                            lvl 10  - Chef ($30/min)
                            lvl 15  - Teacher ($40/min)
                            lvl 20  - Construction ($50/min)
                            lvl 30  - Nurse ($65/min)
                            lvl 40  - Engineer ($75/min)
                            lvl 50  - Stock-Trader ($90/min)
                            lvl 75  - Doctor ($125/min)
                            lvl 100 - CEO ($175/min)`)
            .setColor('#C0C0C0')
        message.channel.send({embeds: [embed]})
    }
}