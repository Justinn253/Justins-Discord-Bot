const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require('./config.json')
const command = require('./commands')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')

client.on('ready', () => {
    console.log('The client is ready!')

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

    // Sends a message to the specified channel if it is empty.
    firstMessage(client, '923692313149075486', 'hello world!!!', ['✅', '❌'])

    // Sends a private message when someone types "ping".
    privateMessage(client, 'ping', 'Pong!')

})

client.login(config.token)