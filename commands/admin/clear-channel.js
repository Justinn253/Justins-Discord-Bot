module.exports = {
    commands: ['clearchannel', 'cc'],
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