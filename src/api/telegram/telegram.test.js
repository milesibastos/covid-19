import request from "supertest";
import { createServer } from "zeit-now-node-server";
import app from "./index";
import Telegram from "./telegram";

jest.mock("./telegram");

const srv = createServer(app);

describe("testing webhook", () => {
  process.env.TELEGRAM_TOKEN = "foo:bar";

  test("It should response the GET method", (done) => {
    Telegram.mockImplementation(() => ({
      handleUpdate: jest.fn(),
    }));
    request(srv).post("/?token=foo:bar").expect(200, done);
  });

  test("token is required", (done) => {
    request(srv).post("/").expect(401, done);
  });

  test("token not match", (done) => {
    request(srv).post("/?token=foo").expect(403, done);
  });
});
