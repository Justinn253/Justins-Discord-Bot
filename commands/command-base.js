const { prefix } = require('../config.json')

const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission node "${permission}"`)
        }
    }
}

let recentlyRan = [] // userId-command

module.exports = (client, commandOptions) => {
    let {
        commands,
        permissionArgs = '',
        permissionError = 'You do not have permission to run this command.',
        minArgs = 0,
        maxArgs = null,
        cooldown = -1,
        currentCooldown = -1,
        cooldownEnd = -1,
        expectedArgs = '',
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions

    // Ensure the command and aliases are in an array
    if (typeof commands === 'string') {
        commands = [commands]
    }

    //console.log(`Registering command "${commands[0]}"`)

    // Ensure the permissions are in an array and are all valid
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePermissions(permissions)
    }

    // listen for messages
    client.on('messageCreate', message => {
        const { member, content, guild } = message
        for (const alias of commands) {
            const theCommand = content.split(" ")[0]
            //if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
            if (theCommand.toLowerCase() == `${prefix}${alias.toLowerCase()}`) {    


                // Ensure the user has the required permissions
                for (const permission of permissions) {
                    if (!member.permissions.has(permission)) {
                        message.reply(permissionError)
                        return
                    }
                }

                // Ensure the user has the required roles
                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role => 
                        role.name === requiredRole)
                    if (!role || !member.roles.cache.has(role.id)) {
                        message.reply(`You must have the "${requiredRole}" role to use this command.`)
                        return
                    }
                }

                // Ensure the user has not ran this command too frequently
                // userId-command
                let cooldownString = `${member.id}-${commands[0]}`
                if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
                    currentCooldown = Math.round((cooldownEnd - new Date().getTime()) / 1000)
                    message.reply(`You cannot use that command so soon, please wait ${currentCooldown} seconds.`)
                    return
                }

                // Split on any number of spaces
                const arguments = content.split(/[ ]+/)

                // Remove the command which is the first index
                arguments.shift()

                // Ensure we have the correct number of arguments
                if (arguments.length < minArgs || (
                    maxArgs !== null && arguments.length > maxArgs
                )) {
                    message.reply(`Incorrect arguments! Use ${prefix}${alias} ${expectedArgs}`)
                    return
                }

                if (cooldown > 0) {
                    recentlyRan.push(cooldownString)
                    setTimeout(() => {
                        recentlyRan = recentlyRan.filter((string) => {
                            return string !== cooldownString
                        })
                    }, 1000 * cooldown)
                    cooldownEnd = new Date().getTime() + (1000 * cooldown)
                    currentCooldown = cooldown
                }

                // Handle the custom command code
                callback(message, arguments, arguments.join(' '), client)

                return
            }
        }
    })
}
