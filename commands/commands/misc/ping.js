module.exports = {
    commands: ['ping'],
    description: '"Pong" (useful for seeing if the bot is responding).',
    cooldown: 5,
    callback: (message, arguments, text) => {
        message.channel.send('Pong!')
    }
}