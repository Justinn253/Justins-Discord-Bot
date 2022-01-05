module.exports = {
    commands: ['ban'],
    description: '(ADMIN) Bans a user',
    expectedArgs: '<user>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`
        const target = mentions.users.first()

        if (member.permissions.has('ADMINISTRATOR') || member.permissions.has('BAN_MEMBERS')) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                if (targetMember.bannable) {
                    targetMember.ban()
                    message.channel.send(`${tag} ${targetMember} has been banned.`)
                } else {
                    message.channel.send(`${tag} target is too high of a role to be banned.`)
                }
            } else {
                message.channel.send(`${tag} Please specify someone to ban.`)
            }
        } else {
            message.channel.send(`${tag} You do not have permission to use this command.`)
        }
    },
    permissions: 'ADMINISTRATOR'
}