require('dotenv').config();
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

const headerParserPath = '/api/whoami';
const gettingIp = (req, res, next) => {
  req.ipaddress = req.ip;
  
  next()
}
const gettingLanguage = (req, res, next) => {
  req.language = req.headers['accept-language'];
  
  next();
}
const gettingBrowser = (req, res, next) => {
  req.software = req.headers['user-agent'];
  
  next();
}
const headerParserHandler = (req, res) => {
  let resObj = {
    ipaddress: req.ipaddress,
    language: req.language,
    software: req.software
  };

  res.json(resObj);
}

app.get(
  headerParserPath, 
  gettingIp, 
  gettingLanguage, 
  gettingBrowser,
  headerParserHandler
);

const port = process.env.PORT || 3000;
let server = app;

if (process.env.NODE_ENV !== "test") {
  server = app.listen(port, function () {
    console.log("Your app is listening on port " + server.address().port);
  });
}

module.exports = server;