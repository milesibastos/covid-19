import bot from "./bot";

const loggerHttp = require("pino-http")();

export default async (req, res) => {
  loggerHttp(req, res);
  const { token } = req.query;
  if (!token) return res.status(401).send("token is required");
  if (token !== process.env.TELEGRAM_TOKEN)
    return res.status(403).send("token not match");

  await bot.handleUpdate(req.body, res);
  res.end();
};
