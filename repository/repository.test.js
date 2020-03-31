const repository = require("./index");

test.skip("should list worldwide", async () => {
  const response = await repository("worldwide");
  console.log(response);
  expect(response).not.toBeNull();
});
