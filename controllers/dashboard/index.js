/**
 * Dashboard controller
 */

var surveyModel = require(__base + 'models/survey');
var debug = require('debug')('sumoqs:server');


/**
 * @method listSurveys
 *
 * Home page of admin dashboard, lists all surveys
 */
exports.listSurveys = function(req, res) {
  res.render('dashboard/index', { title: 'SumoQs Dashboard' });
};


/**
 * @method addSurvey
 *
 * POST endpoint to add a survey, renders a page for adding choices
 */
exports.addSurvey = function(req, res) {
  surveyModel.addSurvey(req.body.survey, function onCreate(err, survey) {
    if (err) {
      return res.render('error', {
        message: 'Oops! Something went wrong.',
        error: err
      });
    }

    res.render('dashboard/add-choices', {
      title: 'SumoQs Dashboard',
      survey: survey
    });
  });
};


/**
 * @method addChoice
 *
 */
exports.addChoice = function(req, res) {
  surveyModel.addChoice(req.body.surveyId, req.body.choice, function onCreate(err, choiceObj) {
    if (err) {
      return res.render('error', {
        message: 'Oops! Something went wrong.',
        error: err
      });
    }

    res.render('dashboard/add-choices', {
      title: 'SumoQs Dashboard',
      survey: choiceObj[0].survey,
      choices: choiceObj
    });
  });
};
