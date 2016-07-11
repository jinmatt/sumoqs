var express = require('express');
var router = express.Router();
var dashboard = require(__base + 'controllers/dashboard');

/* Dashboard routes */
router.get('/', dashboard.listSurveys);
router.get('/viewoptions/:surveyId', dashboard.listChoices);
router.get('/stats/:surveyId', dashboard.getStats);
router.post('/addsurvey', dashboard.addSurvey);
router.post('/addchoice', dashboard.addChoice);
router.post('/deletesurvey', dashboard.deleteSurvey);


module.exports = router;
