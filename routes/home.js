var express = require('express');
var router = express.Router();
var home = require(__base + 'controllers/home');
var sessionHandler = require(__base + 'libs/session-handler');

/* GET home page. */
router.get('/', sessionHandler.setSession, home.getHome);

module.exports = router;
