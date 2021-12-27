module.exports = {
    commands: ['ban'],
    description: '(ADMIN) Kicks a member.',
    expectedArgs: '<user>',
    permissionError: 'You need admin permission to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`
        const target = mentions.users.first()

        if (member.permissions.has('ADMINISTRATOR') || member.permissions.has('KICK_MEMBERS')) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                if (targetMember.kickable) {
                    targetMember.kick()
                    message.channel.send(`${tag} ${targetMember} has been kicked.`)
                } else {
                    message.channel.send(`${tag} target is too high of a role to be kicked.`)
                }
            } else {
                message.channel.send(`${tag} Please specify someone to kick.`)
            }
        } else {
            message.channel.send(`${tag} You do not have permission to use this command.`)
        }
    },
    permissions: 'ADMINISTRATOR'
}