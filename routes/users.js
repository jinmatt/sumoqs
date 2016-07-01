var express = require('express');
var router = express.Router();
var users = require(__base + 'controllers/users');

/* GET users listing. */
router.get('/', users.create);

module.exports = router;
