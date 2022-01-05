module.exports = {
    commands: ['pp', 'weiner', 'peen'],
    cooldown: 3,
    maxArgs: 1,
    expectedArgs: '<user>',
    callback: (message) => {
        const target = message.mentions.users.first() || message.author
        const length = Math.round(Math.random() * 15)
        let stick = '8'

        for (i = 0; i < length; i++) {
            stick += '='
        }
        stick += 'D'

        message.channel.send(`**${target}'s length:** ${stick}`)
    }
}