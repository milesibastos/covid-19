module.exports = (req, res) => {
  const { token } = req.query
  if (!token) throw new Error('token is required')
  if (token !== process.env.TELEGRAM_TOKEN) throw new Error('token not match')
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies
  })
}
