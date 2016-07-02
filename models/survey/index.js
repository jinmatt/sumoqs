/**
 * Survey model
 */

var Sequelize = require('sequelize');
var sequelize = require(__base + 'config/sequelize');
var debug = require('debug')('sumoqs');

var Survey = sequelize.define('survey', {
 survey: {
   type: Sequelize.STRING,
   field: 'survey'
 }
}, {
 freezeTableName: true,
});

var Choice = sequelize.define('survey_choices', {
  choice: {
    type: Sequelize.STRING,
    field: 'choice'
  },
}, {
  freezeTableName: true,
});

Survey.hasMany(Choice);
Choice.belongsTo(Survey);

/**
 * Add new survey
 * @method addSurvey
 * @param {String} survey - survey question
 * @return {Object} - new survey object as callback
 */
exports.addSurvey = function(survey, callback) {
  Survey.sync()
    .then(function() {
      Survey.create({
       survey: survey
      })
      .then(function(surveyObj) {
        callback(null, surveyObj);
      })
      .catch(function(err) {
        callback(err);
      });
    });
};


/**
 * Add new choice to a survey
 * @method addChoice
 * @param {Number} surveyId
 * @param {String} choice - choice for surveyId
 * @return {Object} - survey with choices
 */
exports.addChoice = function(surveyId, choice, callback) {
  Choice.sync()
    .then(function() {
      Choice.create({
       choice: choice,
       surveyId: surveyId
      })
      .then(function(choiceObj) {

        // Query the complete survey obj with choice
        Choice.findAll({
          include: [{
            model: Survey
          }],
          where: { surveyId: surveyId }
        })
        .then(function(surveyObj) {
          callback(null, surveyObj);
        })
        .catch(function(err) {
          callback(err);
        });

      })
      .catch(function(err) {
        callback(err);
      });
    });
};
