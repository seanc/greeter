const Listener = require('../../lib/listener')
const { render } = require('pixie')
const dot = require('pixie-dot')
const waterfall = require('async-waterfall')
const dedent = require('dedent')

class JoinListener extends Listener {

  constructor (bot, config) {
    const greetMessage = config.greetMessage
    const questions = config.questions

    bot.on('guildMemberAdd', member => {
      const { user, guild } = member
      user.sendMessage(render(greetMessage, { user, guild }, { engines: [dot] })).then(message => {
        const filter = m => m.author.discriminator === user.discriminator
        const replies = []

        waterfall(questions.map(question => {
          return (cb) => {
            message.channel.sendMessage(question).then(message => {
              const convo = message.channel.createCollector(filter, {
                time: 60000
              })

              convo.once('message', message => {
                const reply = message.content
                replies.push({question, reply})
                cb()
              })

              convo.on('end', () => replies.push([question, 'none']))
            })
          }
        }), (err, result) => {
          user.sendMessage(config.verificationMessage)
          guild.channels.find('name', config.verificationChannel)
          .sendMessage(dedent`**VERIFICATION FOR ${user.username.toUpperCase()}**

            ${replies.map(answer => {
              const { question, reply } = answer
              return '**' + question + '** ' + reply
            }).join('\n')}`
          )
        })
      })
    })
    super(bot, config)
  }

}

module.exports = JoinListener
