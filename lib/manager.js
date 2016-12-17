const { ShardingManager } = require('discord.js')
const config = require('./config')
const manager = new ShardingManager('./bot/bot.js', {
  totalShards: config.shards || 'auto',
  token: config.token
})
const log = require('./log')()

manager.on('launch', shard => {
  log.info(`Shard ${shard.id} started`)
})

module.exports = manager
