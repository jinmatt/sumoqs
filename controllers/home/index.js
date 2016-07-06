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
  surveyModel.getRandSurvey(function onSurveyGet(err, surveyObj) {
    if (err) {
      return res.render('error', {
        message: 'Oops! Something went wrong.',
        error: err
      });
    }

    res.render('index', {
      title: 'SumoQs',
      survey: surveyObj[0].survey,
      choices: surveyObj
    });
  });
};
