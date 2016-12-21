const Command = require('../../lib/command')
const { render } = require('pixie')

class HelpCommand extends Command {

  constructor (bot, config) {
    super(bot, config)

    this.name = 'help'
    this.usage = 'help'
    this.description = 'Show this messsage'
    this.commands = bot._commands
  }

  handle (message, args, flags) {
    const format = '- {{prefix}}{{usage}} : {{description}} {{admin}}'
    const commands = []
    this.commands.forEach(c => {
      commands.push(render(format, {
        admin: c.getAdmin() ? '(admin)' : '',
        prefix: this.config.bot.prefix,
        usage: c.getUsage(),
        description: c.getDescription()
      }))
    })

    message.channel.sendCode('', commands.join('\n'))
  }

}

module.exports = HelpCommand
