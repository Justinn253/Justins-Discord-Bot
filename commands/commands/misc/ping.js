module.exports = {
    commands: ['ping'],
    cooldown: 5,
    callback: (message) => {
        message.channel.send('Pong!')
    }
}