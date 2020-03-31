const Telegraf = require("telegraf");
const TelegrafI18n = require("telegraf-i18n");
const Extra = require("telegraf/extra");
// const Markup = require("telegraf/markup");

const path = require("path");
const logger = require("pino")();
const loggerHttp = require("pino-http")({ logger });

const repository = require("../../repository");
const geocoding = require("../../repository/geocoding");
const firestoreSession = require("../../session-firestore");
const { Firestore } = require("@google-cloud/firestore");

function fromB64(string) {
  return Buffer.from(string, "base64").toString();
}
const GCLOUD_CREDENTIALS = fromB64(process.env.GCLOUD_CREDENTIALS);
const credentials = JSON.parse(GCLOUD_CREDENTIALS);

const db = new Firestore({
  projectId: credentials.project_id,
  credentials,
});

const I18n = new TelegrafI18n({
  useSession: true,
  defaultLanguage: "en",
  defaultLanguageOnMissing: true,
  directory: path.resolve(__dirname, "locales"),
  templateData: {
    pluralize: TelegrafI18n.pluralize,
    uppercase: (value) => value.toUpperCase(),
  },
});

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.use(firestoreSession(db.collection("sessions")));
bot.use(I18n.middleware());
// bot.use(Telegraf.log());
// bot.use((ctx, next) => {
//   logger.info(ctx.message);
//   return next();
// });

bot.catch((err, ctx) => {
  logger.error(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.start(({ i18n, reply }) =>
  reply(
    i18n.t("greeting"),
    Extra.markdown().markup((markup) =>
      markup.inlineKeyboard(
        [
          markup.callbackButton("English", "en"),
          markup.callbackButton("Português", "pt"),
          markup.callbackButton(i18n.t("worldwide"), "worldwide"),
        ],
        { columns: 2 }
      )
    )
  )
);

bot.action("en", (ctx) => {
  ctx.i18n.locale("en");
  return ctx.editMessageText(
    ctx.i18n.t("greeting"),
    Extra.HTML().markup((markup) =>
      markup.inlineKeyboard(
        [
          markup.callbackButton("English", "en"),
          markup.callbackButton("Português", "pt"),
          markup.callbackButton(ctx.i18n.t("worldwide"), "worldwide"),
        ],
        { columns: 2 }
      )
    )
  );
});

bot.action("pt", (ctx) => {
  ctx.i18n.locale("pt");
  return ctx.editMessageText(
    ctx.i18n.t("greeting"),
    Extra.HTML().markup((markup) =>
      markup.inlineKeyboard(
        [
          markup.callbackButton("English", "en"),
          markup.callbackButton("Português", "pt"),
          markup.callbackButton(ctx.i18n.t("worldwide"), "worldwide"),
        ],
        { columns: 2 }
      )
    )
  );
});

bot.action("worldwide", ({ i18n, reply }) =>
  repository.worldwide().then((statistics) =>
    reply(
      i18n.t("statistics", { locale: i18n.locale(), ...statistics }),
      Extra.markup((markup) => {
        return markup
          .resize()
          .keyboard([
            i18n.t("worldwide"),
            markup.locationRequestButton(i18n.t("local")),
          ]);
      })
    )
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
bot.on("location", ({ i18n, message: { location }, reply }) =>
  geocoding(location.latitude, location.longitude).then(
    ({ country, locality }) =>
      repository.country(country.long_name).then((countryStatistics) =>
        repository.locality(locality.short_name).then((statistics) => {
          const msg = `${country.long_name}\n${i18n.t("statistics", {
            locale: i18n.locale(),
            ...countryStatistics,
          })}\n${locality.long_name}\n${i18n.t("statistics", {
            locale: i18n.locale(),
            ...cases,
            ...statistics,
          })}`;
          return reply(msg);
        })
      )
  )
);

module.exports = async (req, res) => {
  loggerHttp(req, res);
  const { token } = req.query;
  if (!token) throw new Error("token is required");
  if (token !== process.env.TELEGRAM_TOKEN) throw new Error("token not match");

  await bot.handleUpdate(req.body, res);
  res.end();
};

const cases = { cases: 0, confirmed: 0, deaths: 0, recovered: 0 };
