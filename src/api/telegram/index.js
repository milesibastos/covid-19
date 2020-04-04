import Telegram from "./telegram";

const loggerHttp = require("pino-http")();

export default async (req, res) => {
  loggerHttp(req, res);
  const { token } = req.query;
  if (!token) {
    res.status(401).send("token is required");
    return;
  }
  if (token !== process.env.TELEGRAM_TOKEN) {
    res.status(403).send("token not match");
    return;
  }
  const bot = Telegram();
  await bot.handleUpdate(req.body, res);
  res.end();
};
