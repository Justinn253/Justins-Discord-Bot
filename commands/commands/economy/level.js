const economy = require('../../../features/features/economy')

module.exports = {
    commands: ['level', 'xp'],
    description: 'Displays your level progress',
    cooldown: 3,
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id

        const level = await economy.getLevel(guildId, userId)

        message.reply(`${target} is level: ${level}`)
    }
}