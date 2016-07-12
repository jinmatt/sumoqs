var express = require('express');
var router = express.Router();
var dashboard = require(__base + 'controllers/dashboard');
var access = require(__base + 'controllers/dashboard/access');
var auth = require(__base + 'libs/auth');

/* Dashboard routes */
router.get('/', auth.verify, dashboard.listSurveys);
router.get('/login', access.login);
router.get('/logout', access.logout);
router.get('/viewoptions/:surveyId', auth.verify, dashboard.listChoices);
router.get('/stats/:surveyId', auth.verify, dashboard.getStats);
router.post('/addsurvey', auth.verify, dashboard.addSurvey);
router.post('/addchoice', auth.verify, dashboard.addChoice);
router.post('/deletesurvey', auth.verify, dashboard.deleteSurvey);
router.post('/login', access.verify);


module.exports = router;
