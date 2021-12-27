module.exports = {
    commands: ['ping'],
    callback: (message, arguments, text) => {
        message.channel.send('Pong!')
    }
}