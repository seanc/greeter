module.exports = scope => require('catlog')(`greeter:${scope ? scope : 'main'} `)
