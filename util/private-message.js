// Sends specified reply text based on user input.
module.exports = (client, triggerText, replyText) => {
    client.on('messageCreate', message => {
        if (/* message.channel.type === 'dm' && */
            message.content.toLowerCase() === triggerText.toLowerCase()) {
            message.author.send(replyText)
        }
    })
}