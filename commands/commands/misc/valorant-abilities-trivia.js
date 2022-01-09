const Discord = require('discord.js')
const economy = require('../../../features/features/economy')
const levels = require('../../../features/features/levels')

module.exports = {
    commands: ['valorantabilities', 'va'],
    cooldown: 3,
    callback: async (message) => {
        const triviaMap = new Map()
        const selection = Math.ceil(Math.random() * 14)
        createTriviaMap(triviaMap, selection)

        const abilityName = getRandomKey(triviaMap)
        const agentName = triviaMap.get(abilityName)

        const embed = new Discord.MessageEmbed()
            .setTitle('Valorant Abilities Trivia')
            .addFields({
                name: `__Ability Name__`,
                value: String(`\`${abilityName}\``),
                inline: true
            },{
                name: `__Agent Name__`,
                value: `\`???\``,
                inline: true
            })
            .setDescription('_Guess the agent based on their ability_')
            .setColor('#FA4454')
        
        message.channel.send({embeds: [embed]})
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
            })

        const filter = (m) => {
            !m.author.bot,
            m.content.toLowerCase() == agentName.toLowerCase()
        }

        const collector = new Discord.MessageCollector(message.channel, filter)

        let answered = false
        setTimeout(() => {
            if (!answered) {
                collector.stop()
                const endEmbed = new Discord.MessageEmbed()
                    .setTitle('Valorant Abilities Trivia')
                    .setDescription(`You have ran out of time! The correct answer was ${agentName}`)
                    .setColor('#FA4454')
                message.channel.send({embeds: [endEmbed]})
            }
        }, 15000)
        const timerEnd = new Date().getTime()

        collector.on('collect', async (m) => {
            if (m.content.toLowerCase() == agentName.toLowerCase()) {
                const guessTime = Math.round((new Date().getTime() - timerEnd) / 1000)
                const moneyEarned = Math.round((((timerEnd + 15000) - new Date().getTime()) * 20) / 1000)
                const winnerEmbed = new Discord.MessageEmbed()
                    .setTitle('Valorant Abilities Trivia')
                    .setDescription(`${m.author.username} has guessed the agent first in ${guessTime} seconds and earned ${moneyEarned}! The correct answer was \`${agentName}\`.`)
                    .setColor('#FA4454')
                collector.stop()
                answered = true
                await economy.addMoney(m.guild.id, m.author.id, moneyEarned)
                await levels.addXP(message.guild.id, message.member.id, 50, message, message.member.user.username)
                return message.channel.send({embeds: [winnerEmbed]})
            }
        })
    }
}

function getRandomKey(triviaMap) {
    selection = Math.floor(Math.random() * triviaMap.size)
    let counter = 0
    for (let key of triviaMap.keys()) {
        if (counter++ === selection) {
            return key
        }
    }
}
 
function createTriviaMap(triviaMap, selection) {
    if (selection == 1) {
        triviaMap.set('Gravity Well', 'Astra')
        triviaMap.set('Nova Pulse', 'Astra')
        triviaMap.set('Nebula / Dissipate', 'Astra')
        triviaMap.set('Astral Form / Cosmic Divide', 'Astra')
    } else if (selection == 2) {
        triviaMap.set('Aftershock', 'Breach')
        triviaMap.set('Flashpoint', 'Breach')
        triviaMap.set('Fault Line', 'Breach')
        triviaMap.set('Rolling Thunder', 'Breach')
    } else if (selection == 3) {
        triviaMap.set('Stim Beacon', 'Brimstone')
        triviaMap.set('Incendiary', 'Brimstone')
        triviaMap.set('Sky Smoke', 'Brimstone')
        triviaMap.set('Orbital Strike', 'Brimstone')
    } else if (selection == 4) {
        triviaMap.set('Trademark', 'Chamber')
        triviaMap.set('Headhunter', 'Chamber')
        triviaMap.set('Rendezvous', 'Chamber')
        triviaMap.set('Tour De Force', 'Chamber')
    } else if (selection == 5) {
        triviaMap.set('Trapwire', 'Cypher')
        triviaMap.set('Cyber Cage', 'Cypher')
        triviaMap.set('Spycam', 'Cypher')
        triviaMap.set('Neural Theft', 'Cypher')
    } else if (selection == 6) {
        triviaMap.set('Cloudburst', 'Jett')
        triviaMap.set('Updraft', 'Jett')
        triviaMap.set('Tailwind', 'Jett')
        triviaMap.set('Bladestorm', 'Jett')
    } else if (selection == 7) {
        triviaMap.set('Frag/ment', 'KAY/O')
        triviaMap.set('Flash/drive', 'KAY/O')
        triviaMap.set('Zero/point', 'KAY/O')
        triviaMap.set('Null/cmd', 'KAY/O')
    } else if (selection == 8) {
        triviaMap.set('Nanoswarm', 'Killjoy')
        triviaMap.set('Alarmbot', 'Killjoy')
        triviaMap.set('Turret', 'Killjoy')
        triviaMap.set('Lockdown', 'Killjoy')
    } else if (selection == 9) {
        triviaMap.set('Shrouded Step', 'Omen')
        triviaMap.set('Paranoia', 'Omen')
        triviaMap.set('Dark Cover', 'Omen')
        triviaMap.set('From the Shadows', 'Omen')
    } else if (selection == 10) {
        triviaMap.set('Blaze', 'Phoenix')
        triviaMap.set('Curveball', 'Phoenix')
        triviaMap.set('Hot Hands', 'Phoenix')
        triviaMap.set('Run it Back', 'Phoenix')
    } else if (selection == 11) {
        triviaMap.set('Boom Bot', 'Raze')
        triviaMap.set('Blast Pack', 'Raze')
        triviaMap.set('Paint Shells', 'Raze')
        triviaMap.set('Showstopper', 'Raze')
    } else if (selection == 12) {
        triviaMap.set('Leer', 'Reyna')
        triviaMap.set('Devour', 'Reyna')
        triviaMap.set('Dismiss', 'Reyna')
        triviaMap.set('Empress', 'Reyna')
    } else if (selection == 13) {
        triviaMap.set('Barrier Orb', 'Sage')
        triviaMap.set('Slow Orb', 'Sage')
        triviaMap.set('Healing Orb', 'Sage')
        triviaMap.set('Resurrection', 'Sage')
    } else if (selection == 14) {
        triviaMap.set('Regrowth', 'Skye')
        triviaMap.set('Trailblazer', 'Skye')
        triviaMap.set('Guiding Light', 'Skye')
        triviaMap.set('Seekers', 'Skye')
    } else if (selection == 15) {
        triviaMap.set('Owl Drone', 'Sova')
        triviaMap.set('Shock Bolt', 'Sova')
        triviaMap.set('Recon Bolt', 'Sova')
        triviaMap.set('Hunters Fury', 'Sova')
    } else if (selection == 16) {
        triviaMap.set('Snake Bite', 'Viper')
        triviaMap.set('Poison Cloud', 'Viper')
        triviaMap.set('Toxic Screen', 'Viper')
        triviaMap.set('Viper\'s Pit', 'Viper')
    } else if (selection == 17) {
        triviaMap.set('Fakeout', 'Yoru')
        triviaMap.set('Blindside', 'Yoru')
        triviaMap.set('Gatecrash', 'Yoru')
        triviaMap.set('Dimensional Drift', 'Yoru')
    } 
}