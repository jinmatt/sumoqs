var express = require('express');
var router = express.Router();
var dashboard = require(__base + 'controllers/dashboard');
var access = require(__base + 'controllers/dashboard/access');

/* Dashboard routes */
router.get('/', dashboard.listSurveys);
router.get('/login', access.login);
router.get('/viewoptions/:surveyId', dashboard.listChoices);
router.get('/stats/:surveyId', dashboard.getStats);
router.post('/addsurvey', dashboard.addSurvey);
router.post('/addchoice', dashboard.addChoice);
router.post('/deletesurvey', dashboard.deleteSurvey);
router.post('/login', access.verify);


module.exports = router;
