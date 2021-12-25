const path = require('path')
const fs = require('fs')

const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const mongo = require('./mongo')

const { floor, random } = Math
const fetch = require('node-fetch')

const config = require('./config.json')
const command = require('./commands')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')
const sendMessage = require('./send-message')
const welcome = require('./welcome')
const messageCount = require('./message-counter')

const { prefix } = config

client.setMaxListeners(0)

client.on('ready', async () => {
    console.log('The client is ready!')

    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    readCommands('commands')

    // Connects to mongo and will close connection.
    await mongo().then(mongoose => {
        try {
            console.log('Connected to mongo!')
        } finally {
            mongoose.connection.close()
        }
    })

    client.user.setPresence({
        activities: [{
            name: `${prefix}help`
        }], 
            status: 'online'
    })

    // Classis ping -> pong command.
    command(client, 'ping', (message) => {
        message.channel.send('Pong!')
    })

    // Displays number of members in a server.
    command(client, 'servers', (message) => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members`
            )
        })
    })

    // Clears a channel of all messages.
    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    // Changes status of the bot. Does not work.
    command(client, 'status', message => {
        const content = message.content.replace('+status ', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })

    // Sends a private message when someone types "ping".
    privateMessage(client, 'ping', 'Pong!')

    // Creates a text channel.
    command(client, 'createtextchannel', (message) => {
        const name = message.content.replace('+createtextchannel ', '')

        message.guild.channels.create(name, {
            type: 'text', 
        }).then((channel) => {

        })   
    })

    // Creates a voice channel. Does not work for some reason.
    command(client, 'createvoicechannel', (message) => {
        const name = message.content.replace('+createvoicechannel ', '')

        message.guild.channels.create(name, {
            type: 'voice', 
        }).then ((channel) => {
                    
        })
    })

    // Creates an embeded message
    command(client, 'embed', (message) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('Example text embed')
            .setDescription('Example description')
            .setURL('https://www.youtube.com/watch?v=C22dH_ZUj-Q&list=PLaxxQQak6D_fxb9_-YsmRwxfw5PH9xALe&index=11')
            .setAuthor(message.author.username)
            .setImage('https://i.imgur.com/OHIQCdC.jpeg')
            .setFooter('The dog', 'https://i.imgur.com/OHIQCdC.jpeg')
            .setColor('#00AAFF')
            .addFields({
                name: 'Field 1',
                value: 'Hello World',
            })

        message.channel.send({embeds: [embed]})
    })

    // Attempts to send a random picture from prnt.sc. Picture does not load.
    command(client, 'randompic', (message) => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
        let id = '';
        for (let i=0; i<4; ++i) id += characters[floor(random()*characters.length)]
        for (let i=0; i<2; ++i) id += floor(random()*9)
        let png = '.png'

        const embed = new Discord.MessageEmbed()
            .setTitle('Random Picture')
            .setURL(`https://prnt.sc/${id}`)
            .setImage(`https://prnt.sc/${id}${png}`)

        message.channel.send({embeds: [embed]})
    })

    // Displays basic information of a server.
    command(client, 'serverinfo', (message) => {
        const { guild } = message

        const { name, memberCount, preferredLocale, 
                createdAt, verified, banner, afkTimeout } = guild
        const icon = guild.iconURL()
        //console.log(name, memberCount.toString(), preferredLocale, createdAt.toString(), verified.toString(), banner, afkTimeout.toString(), icon)

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields({
                name: 'Name',
                value: name,
            },{
                name: 'Members',
                value: memberCount.toString(),
            },{
                name: 'Region',
                value: preferredLocale,
            },{
                name: 'Created',
                value: createdAt.toString(),
            },{
                name: 'Verified',
                value: verified.toString(),
            },{
                name: 'AFK Timeout',
                value: (afkTimeout / 60).toString(),
            })
        message.channel.send({embeds: [embed]}).then(message => {
            setTimeout(() => {
                message.delete()
            }, 1000 * 60)
        })
    })

    // Bans a user.
    command(client, 'ban', (message) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`
        const target = mentions.users.first()

        if (member.permissions.has('ADMINISTRATOR') || member.permissions.has('BAN_MEMBERS')) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                if (targetMember.bannable) {
                    targetMember.ban()
                    message.channel.send(`${tag} ${targetMember} has been banned.`)
                } else {
                    message.channel.send(`${tag} target is too high of a role to be banned.`)
                }
            } else {
                message.channel.send(`${tag} Please specify someone to ban.`)
            }
        } else {
            message.channel.send(`${tag} You do not have permission to use this command.`)
        }
    })

    // Kicks a user.
    command(client, 'kick', (message) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`
        const target = mentions.users.first()

        if (member.permissions.has('ADMINISTRATOR') || member.permissions.has('KICK_MEMBERS')) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                if (targetMember.kickable) {
                    targetMember.kick()
                    message.channel.send(`${tag} ${targetMember} has been kicked.`)
                } else {
                    message.channel.send(`${tag} target is too high of a role to be kicked.`)
                }
            } else {
                message.channel.send(`${tag} Please specify someone to kick.`)
            }
        } else {
            message.channel.send(`${tag} You do not have permission to use this command.`)
        }
    })

    // Welcome
    welcome(client)

    // Message-Counter
    messageCount(client)

    // Displays commands for the user.
    command(client, 'help', (message) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('Commands')
            .setColor('#FF0000')
            .addFields({
                name: '+help',
                value: 'Displays the help menu'
            },{
               name: '+randompic',
               value: 'Pulls a link to a random prnt.sc'
            },{
                name: '+serverinfo',
                value: 'Displays basic information about the server'
            },{
                name: `**(ADMIN)** +ban <user>`,
                value: 'Bans a user'
            },{
                name: `**(ADMIN)** +cc, +clearchannel`,
                value: 'Clears all messages from a channel'
            },{
                name: `**(ADMIN)** +createtextchannel <name>`,
                value: 'Creates a text channel with a specified name'
            })
        message.channel.send({embeds: [embed]})
    })

})

client.login(config.token)