const Discord = require('discord.js')
const economy = require('../../../features/features/economy')

module.exports = {
    commands: ['battle'],
    description: 'Start a battle game.',
    cooldown: 30,
    minArgs: 1,
    expectedArgs: "<user>, <user>, ...",
    callback: async (message, arguments, client) => {
        const mentions = message.mentions.users.first(arguments.length)
        const players = new Array()

        if (!mentions) {
            message.reply('You must tag one or more person to play.')
            return
        }

        // for (mention of mentions) {
        //     if (mention.bot) {
        //         message.reply('You cannot add a bot to a battle (for now).')
        //         return
        //     }
        // }

        createPlayers(players, message, mentions)
        displayStats(players, message)

        for (i = 0; i < players.length; i++) {
            let i = 0
            console.log('test')

            const confirmation = await message.channel.send(`It is now tests turn. Pick a card and a target.`);
            const answers = ['y', 'yes', 'n', 'no'];
            const filter = (m) =>
            answers.includes(m.content.toLowerCase()) &&
            m.author.id === message.author.id;

            const collector = confirmation.channel.createMessageCollector(filter, {
                max: 1,
                time: 10000,
            });

            collector.on('collect', async (m) => {
                if (m.content.toLowerCase() === answers[2] ||
                    m.content.toLowerCase() === answers[3]) {
                    return message.channel.send(`Action has been cancelled.`);
                }
            });

            collector.on('end', (collected, reason) => {
                if (reason === 'time') {
                    message.channel.send(`Cancelled`);
                }
            });
            
            // client.on('messageCreate', message => {
            //     const { member, content, guild } = message
            //     if (message.author.username == player[i].name) {
                    
            //     }
            // })


            // if (getPlayersLeft(players) > 1) {
            //     i = 0
            // }
        }
    }
}

function createPlayers(players, message, mentions) {
    // Push player that started battle.
    let player = {
        name: message.author.username,
        health: 100,
        alive: 'Alive',
        armor: 10,
        damage: 20,
        agility: 10,
        mana: 100,
        color: '#FFFFFFF'
    }
    players.push(player)

    // Push all mentions
    for (mention of mentions) {
        let player = {
            name: mention.username,
            health: 100,
            alive: 'Alive',
            armor: 10,
            damage: 20,
            agility: 10,
            mana: 100,
            color: '#FFFFFFF'
        }
        players.push(player)
    }
    assignColors(players)
}

function getPlayersLeft(players) {
    let counter = 0
    for (player of players) {
        if (player.alive == 'Alive') {
            counter++
        }
    }
    return counter
}

function displayStats(players, message) {
    let embedList = []
    for (i = 0; i < players.length; i++) {
        const embed = new Discord.MessageEmbed()
            .setTitle(String(players[i].name + ' - ' + players[i].alive))
            .setColor(players[i].color)
            .addFields({
                name: 'Health',
                value: String(players[i].health),
                inline: true
            },{
                name: 'Armor',
                value: String(players[i].armor),
                inline: true
            },{
                name: 'Damage',
                value: String(players[i].damage),
                inline: true
            },{
                name: 'Agility',
                value: String(players[i].agility),
                inline: true
            },{
                name: 'Mana',
                value: String(players[i].mana),
                inline: true
            },{
                name: '\u200b',
                value: '\u200b',
                inline: true
            })
            embedList.push(embed)
    }
    message.channel.send({embeds: embedList})
}

function assignColors(players) {
    const commonColors = [
        '#00FF00',
        '#FF0000',
        '#3399FF',
        '#FFFF00',
        '#FFA500',
        '#000000',
        '#FFFFFF',
        '#FF80ED',
        '#794044',
        '#808080'
    ]

    let i = 0
    for (player of players) {
        player.color = commonColors[i]
        i++
    }
}