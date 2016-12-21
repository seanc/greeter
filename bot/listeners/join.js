const Listener = require('../../lib/listener')
const { render } = require('pixie')
const dot = require('pixie-dot')
const waterfall = require('async-waterfall')
const dedent = require('dedent')
const { Collection } = require('discord.js')

class JoinListener extends Listener {

  constructor (bot, config) {
    const greetMessage = config.greet.message

    let newUsers = new Collection()

    bot.on('guildMemberAdd', member => {
      const { user, guild } = member
      newUsers.set(user.id, user)

      const logging = guild.channels.find('id', config.logging.channel)
      if (logging) logging.sendMessage(`${member} joined`)

      if (newUsers.size >= config.greet.threshold) {
        const users = newUsers.map(u => u.toString()).join(', ')
        guild.defaultChannel.sendMessage(render(greetMessage, { users }))
        newUsers = new Collection()
      }
    })

    bot.on('guildMemberRemove', member => {
      const { user } = member
      if (newUsers.exists('id', user.id)) newUsers.delete(user.id)
    })

    super(bot, config)
  }

}

module.exports = JoinListener
