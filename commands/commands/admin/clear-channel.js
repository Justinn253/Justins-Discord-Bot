module.exports = {
    commands: ['clearchannel', 'cc'],
    description: '(ADMIN) Clears a channel of all messages.',
    permissionError: 'You need admin permission to run this command',
    callback: (message, arguments, text) => {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    },
    permissions: 'ADMINISTRATOR'
}