const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.dbConnect();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
  }

  async dbConnect() {
    await dbConnection();
  }

  routes() {
    this.app.use("/api/phrases", require("../routes/phrases.routes"));
    this.app.use(
      "/api/notifications",
      require("../routes/notifications.routes")
    );
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log("Server run in port: ", this.port)
    );
  }
}

module.exports = Server;
