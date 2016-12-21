const Command = require('../../lib/command')

class PurgeCommand extends Command {

  constructor (bot, config) {
    super(bot, config)

    this.name = 'purge'
    this.usage = 'purge <id|all> <count>'
    this.description = 'Purge messages'
    this.admin = true
  }

  handle (message, args, flags) {
    if (args.length < 1) {
      return message.reply('Invalid arguments')
    }

    const filter = message.content.split(' ')[1]
    const limit = args[1] > 100 ? 100 : args[1]

    message.channel.fetchMessages()
    .then(messages => {
      if (filter === 'all' || filter === '*') {
        return this.deleteMessages(messages, limit, deleted => {
          this.message(message.reply(`Deleted ${deleted} messages`)).deleteAfter(4000)
        })
      }

      this.deleteMessages(messages.filter(m => m.author.id === filter), limit, deleted => {
        this.message(message.reply(`Deleted ${deleted} messages from ${message.guild.member(filter)}`)).deleteAfter(4000)
      })
    })
  }

  deleteMessages (messages, limit, cb) {
    if (messages.size === 0) return cb(0)
    if (messages.size < limit) limit = messages.size
    messages = messages.array()
    for (var i = 0; i <= limit; i++) messages[i].delete()
    cb(i)
  }

}

module.exports = PurgeCommand
