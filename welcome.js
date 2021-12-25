const mongo = require('./mongo')
const command = require('./commands')
const welcomeSchema = require('./schemas/welcome-schema')

module.exports = (client) => {
    const cache = {

    }

    command(client, 'setwelcome', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.permissions.has("ADMINISTRATOR")) {
            channel.send('You do not have permission to run this command.')
            return
        }

        let text = content

        const split = text.split(' ')

        if (split.length < 2) {
            channel.send('Please provide a welcome message')
            return
        }

        split.shift()
        text = split.join(' ')

        cache[guild.id] = [channel.id, text]

        await mongo().then(async (mongoose) => {
            try {
                await welcomeSchema.findOneAndUpdate({
                    _id: guild.id
                },{
                    _id: guild.id,
                    channelId: channel.id,
                    text
                },{
                    upsert: true
                })
            } finally {
                mongoose.connection.close()
            }
        })
    })

    const onJoin = async (member) => {
        const { guild } = member

        let data = cache[guild.id]

        if (!data) {
            console.log('FETCHING FROM DATABASE')

            await mongo().then(async (mongoose) => {
                try {
                    const result = await welcomeSchema.findOne({ _id: guild.id })

                    cache[guild.id] = data = [result.channelId, result.text]
                } finally {
                    mongoose.connection.close()
                }
            })
        }

        const channelId = data[0]
        const text = data[1]

        const channel = guild.channels.cache.get(channelId)
        channel.send(text.replace(/<@>/g, `<@${member.id}>`))
    }

    // For testing purposes
    command(client, 'simulatejoin', (message) => {
        onJoin(message.member)
    })
 
    // For testing purposes
    client.on('guildMemberAdd', (member) => {
        onJoin(member)
    })
}