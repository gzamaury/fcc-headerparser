const router = require("express").Router();

router.get("/api/whoami", function (req, res) {
  const ipaddress = req.ip;
  const { "accept-language": language, "user-agent": software } = req.headers;

  res.json({
    ipaddress,
    language,
    software,
  });
});

module.exports = router;