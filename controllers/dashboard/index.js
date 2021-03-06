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
  surveyModel.getSurveys(function onListing(err, surveys) {
    if (err) {
      return res.render('error', {
        message: 'Oops! Something went wrong.',
        error: err
      });
    }

    res.render('dashboard/index', {
      title: 'SumoQs Dashboard',
      surveys: surveys
    });
  });
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

    res.render('dashboard/choices', {
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

    res.render('dashboard/choices', {
      title: 'SumoQs Dashboard',
      survey: choiceObj[0].survey,
      choices: choiceObj
    });
  });
};


/**
 * @method listChoices
 */
exports.listChoices = function(req, res) {
  surveyModel.getChoices(req.params.surveyId, function onListing(err, choicesObj, surveyObj) {
    if (err) {
      return res.render('error', {
        message: 'Oops! Something went wrong.',
        error: err
      });
    }

    res.render('dashboard/choices', {
      title: 'SumoQs Dashboard',
      survey: surveyObj,
      choices: choicesObj.length
        ? choicesObj
        : null
    });
  });
};


/**
 * @method deleteSurvey
 */
exports.deleteSurvey = function(req, res) {
  surveyModel.deleteSurvey(req.body.surveyId, function onDelete(err, isDeleted) {
    if (err) {
      return res.render('error', {
        message: 'Oops! Something went wrong.',
        error: err
      });
    }

    res.redirect('/dashboard');
  });
};


/**
 * @method getStats
 */
exports.getStats = function(req, res) {
  surveyModel.getStats(req.params.surveyId, function onGetStats(err, statsObj) {
    if (err) {
      return res.render('error', {
        message: 'Oops! Something went wrong.',
        error: err
      });
    }

    res.render('dashboard/stats', {
      title: 'SumoQs Dashboard',
      survey: statsObj
        ? statsObj[0].survey
        : null,
      choices: statsObj
        ? statsObj
        : null
    });
  });
};
