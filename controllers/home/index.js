/**
 * Home page controller
 */

var surveyModel = require(__base + 'models/survey');
var debug = require('debug')('sumoqs:server');


/**
 * @method getHome
 *
 */
exports.getHome = function(req, res) {
  surveyModel.getRandSurvey(req.sessionId, function onSurveyGet(err, surveyObj) {
    if (err) {
      return res.render('error', {
        message: 'Oops! Something went wrong.',
        error: err
      });
    }

    if(!surveyObj) {
      return res.render('index', {
        title: 'SumoQs'
      });
    }

    res.render('index', {
      title: 'SumoQs',
      survey: surveyObj[0].survey,
      choices: surveyObj
    });
  });
};


/**
 * @method recordSurvey
 */
exports.recordSurvey = function(req, res) {
  surveyModel.recordSurvey(req.sessionId, req.body.surveyId, req.body.selectedChoice, function onSurveyRecord(err, record) {
    if (err) {
      return res.render('error', {
        message: 'Oops! Something went wrong.',
        error: err
      });
    }

    res.render('thanks', {
      title: 'SumoQs'
    });
  });
};
