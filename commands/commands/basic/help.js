const Discord = require('discord.js')
const loadCommands = require('../../load-commands.js')
const { prefix } = require('../../../config.json')

module.exports = {
    commands: ['help'],
    description: 'Displays bot commands',
    cooldown: 10,
    callback: (message, arguments, text) => {
        //const commands = loadCommands()

        const embed = new Discord.MessageEmbed()
                .setTitle('__Commands For Justins Bot__')
                .setColor('#FF0000')
                .setThumbnail('https://cdn.discordapp.com/attachments/924054502607314965/925138866355179570/theDog12.png')
                .setFields({
                    name: 'help',
                    value: 'Displays the help menu.'
                },{
                    name: 'basic',
                    value: 'Displays commands in the "basic" category.'
                },{
                    name: 'economy',
                    value: 'Displays commands in the "economy" category.'
                },{
                    name: 'misc',
                    value: 'Displays commands in the "misc" category.'
                },{
                    name: 'admin',
                    value: 'Displays commands in the "admin" category.'
                })

        message.channel.send({embeds: [embed]})


        // for (const command of commands) {
        //     const mainCommand = typeof command.commands === 'string' ? command.commands : command.commands[0]
        //     const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
        //     const { description } = command

        //     embed.addFields({
        //         name: mainCommand,
        //         value: description
        //     })
        // }
        // console.log('out?')
    }
}