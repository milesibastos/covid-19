const Telegraf = require('telegraf')
const logger = require('pino')()
const loggerHttp = require('pino-http')({ logger })

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me your location'))

module.exports = (req, res) => {
  loggerHttp(req, res)
  const { token, ...query } = req.query
  if (!token) throw new Error('token is required')
  if (token !== process.env.TELEGRAM_TOKEN) throw new Error('token not match')

  bot.handleUpdate(req.body, res)
}
