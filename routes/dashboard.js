var express = require('express');
var router = express.Router();
var dashboard = require(__base + 'controllers/dashboard');

/* Dashboard routes */
router.get('/', dashboard.listSurveys);
router.post('/addsurvey', dashboard.addSurvey);
router.post('/addchoice', dashboard.addChoice);


module.exports = router;
