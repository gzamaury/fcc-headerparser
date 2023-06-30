// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Header Parser Microservice
const headerParserPath = '/api/whoami';
const gettingIp = (req, res, next) => {
  console.log(`ip: ${req.ip}`);
  req.ipaddress = req.ip;
  
  next()
}
const gettingLanguage = (req, res, next) => {
  console.log(`language: ${req.headers['accept-language']}`);
  req.language = req.headers['accept-language'];
  
  next()
}

app.get(headerParserPath, gettingIp, gettingLanguage);

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
