const path = require('path')
const fs = require('fs')

module.exports = (client) => {

    const commandBase = require(`./command-base.js`)

    const commands = []

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== 'command-base.js' && file !== 'load-commands.js') {
                const options = require(path.join(__dirname, dir, file))
                commands.push(options)
                if (client) {
                    commandBase(client, options)
                }
            }
        }
    }
    
    readCommands('.')

    return commands
}