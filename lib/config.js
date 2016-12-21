const hardOpts = require('rc')('greeter', {
  token: '',
  guild: '',
  greetMessage: 'Hello {{user.username}}, welcome to the {{guild.name}} Discord, I need to ask you a few questions to get you started.',
  verificationChannel: 'general',
  verificationMessage: 'Great! Thanks for answering those questions, we\'ll get you verified soon!',
  questions: [
    'What is your name?'
  ]
})
const softOpts = require('minimist')(process.argv.slice(2))
const config = Object.assign(hardOpts, softOpts)
module.exports = config
