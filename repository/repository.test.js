const repository = require('./index')

test('should list www', async () => {
  const response = await repository('worldwide')
  console.log(response)
  expect(response).not.toBeNull()
})
