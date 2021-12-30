const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const mongo = require('./util/mongo')

const { floor, random } = Math
const fetch = require('node-fetch')

const config = require('./config.json')
const loadCommands = require('./commands/load-commands')
// const command = require('./commands')
// const firstMessage = require('./first-message')
// const privateMessage = require('./private-message')
// const sendMessage = require('./send-message')
const welcome = require('./features/features/welcome')
const messageCount = require('./features/features/message-counter')
const levels = require('./features/features/levels')

const { prefix } = config

client.setMaxListeners(0)

client.on('ready', async () => {
    console.log('The client is ready!')

    loadCommands(client)

    // Connects to mongo and will close connection.
    // await mongo().then(mongoose => {
    //     try {
    //         console.log('Connected to mongo!')
    //     } finally {
    //         mongoose.connection.close()
    //     }
    // })

    client.user.setPresence({
        activities: [{
            name: `${prefix}help`
        }], 
            status: 'online'
    })

    // Welcome
    welcome(client)

    // Message-Counter
    messageCount(client)

    // Levels
    levels(client)

})

client.login(config.token)