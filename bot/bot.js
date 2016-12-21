const glob = require('require-glob')
const spawnargs = require('spawn-args')
const config = require('../lib/config')
const { Client } = require('discord.js')
const logcb = require('log-cb')
const minimist = require('minimist')

const bot = new Client()

function bootstrap(bot, config) {
  const commands = new Map()
  bot._commands = commands 

  glob(['./{commands,listeners}/**/*.js']).then(modules => {
    modules = Object.assign({}, modules.listeners || {}, modules.commands || {})
    for (let module in modules) {
      module = (new modules[module](bot, config))
      const parent = Object.getPrototypeOf(module.constructor).name
      if (parent === 'Command') commands.set(module.getName(), module)
    }
  }).catch(err => console.log(err))

  bot.on('message', message => {
    if (!message.content.startsWith(config.bot.prefix)) return
    const prefix = config.bot.prefix
    const input = spawnargs(message.content.slice(prefix.length))
    const parse = minimist(input)
    const name = parse._.shift()
    const args = parse._
    delete parse._
    const flags = parse

    if (commands.has(name)) {
      const command = commands.get(name)
      if (command.getAdmin() && !config.groups.admin.includes(message.author.id)) return
      command.handle(message, args, flags)
    }
  })

  bot.on('error', logcb.err())
  bot.login(config.bot.token)
}

// console.log(config)

bootstrap(bot, config)
