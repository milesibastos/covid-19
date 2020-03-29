module.exports = (req, res) => {
  const { token } = req.query
  if (!token) throw new Error('token is required')
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies
  })
}
