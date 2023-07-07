require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const whoamiRouter = require("./routes/whoami");

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.use(whoamiRouter);

const port = process.env.PORT || 3000;
let server = app;

if (process.env.NODE_ENV !== "test") {
  server = app.listen(port, function () {
    console.log("Your app is listening on port " + server.address().port);
  });
}

module.exports = server;
