const config = require('rc')('kbvebot', {
  bot: {
    token: '',
    prefix: '$'
  },
  greet: {
    message: 'Hello {{users}}, welcome to KBVE.',
    threshold: 5
  },
  logging: {
    channel: ''
  },
  groups: {
    admin: []
  }
})

module.exports = config
