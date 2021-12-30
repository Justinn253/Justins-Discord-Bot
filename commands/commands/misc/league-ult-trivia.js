module.exports = {
    commands: ['leagueulttrivia'],
    description: 'Try to match the league champion with their ultimate name.',
    cooldown: 3,
    callback: (message, arguments, text) => {
        message.channel.send('Pong!')
    }
}