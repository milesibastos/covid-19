const Telegraf = require("telegraf");
const TelegrafI18n = require("telegraf-i18n");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");

const path = require("path");
const logger = require("pino")();
const loggerHttp = require("pino-http")({ logger });

const repository = require("../../repository");

const i18n = new TelegrafI18n({
  defaultLanguage: "en",
  defaultLanguageOnMissing: true,
  directory: path.resolve(__dirname, "locales"),
  templateData: {
    pluralize: TelegrafI18n.pluralize,
    uppercase: (value) => value.toUpperCase(),
  },
});

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
// bot.use(Telegraf.memorySession())
bot.use(i18n.middleware());

bot.start(({ i18n, replyWithHTML }) =>
  replyWithHTML(
    i18n.t("greeting"),
    Extra.markup((markup) => {
      return markup
        .resize()
        .keyboard([
          i18n.t("worldwide"),
          markup.locationRequestButton(i18n.t("local")),
        ]);
    })
  )
);

bot.help(TelegrafI18n.reply("help", Extra.HTML()));

bot.hears(TelegrafI18n.match("worldwide"), ({ i18n, reply }) =>
  repository
    .worldwide()
    .then((statistics) =>
      reply(i18n.t("statistics", { locale: i18n.locale(), ...statistics }))
    )
);

bot.on("text", (ctx) => ctx.reply(ctx.message.text));

module.exports = (req, res) => {
  loggerHttp(req, res);
  const { token } = req.query;
  if (!token) throw new Error("token is required");
  if (token !== process.env.TELEGRAM_TOKEN) throw new Error("token not match");

  bot.handleUpdate(req.body, res);
};
