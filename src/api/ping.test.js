import { createServer } from "zeit-now-node-server";
// import http, { Server } from "http";
// import { Bridge } from "@now/node-bridge/bridge";
import request from "supertest";
import app from "./ping";
// const { Bridge } = require("@now/node-bridge/bridge");
// const server = http.createServer((req, res) => res.end("1"));
// const srv = http.createServer(app);
const srv = createServer(app);
// const server = new Server();

describe("Test the root path", () => {
  test("It should response the GET method", (done) => {
    // const server = new Server((req, res) =>
    //   res.end(
    //     JSON.stringify({
    //       method: req.method,
    //       path: req.url,
    //       headers: req.headers,
    //     })
    //   )
    // );
    // const mockListener = jest.fn((req, res) => {
    //   res.end('hello');
    // });
    // const bridge = new Bridge(server);
    // bridge.listen();
    request(srv)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });

    // server.close();
  });
});
