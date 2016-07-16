/**
 * Survey model
 */

var _ = require('lodash');
var debug = require('debug')('sumoqs:server');
var Sequelize = require('sequelize');
var sequelize = require(__base + 'config/sequelize');
var Choice = require('./choice');
var Record = require('./record');


/**
 * Survey model definition
 */
var Survey = sequelize.define('survey', {
 survey: {
   type: Sequelize.STRING,
   field: 'survey'
 }
}, {
 freezeTableName: true
});


/**
 * Define relations
 */
Survey.hasMany(Choice);
Survey.hasMany(Record);
Choice.belongsTo(Survey);
Choice.hasMany(Record);
Survey.sync();


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


/**
 * @method getSurveys
 * @return {Object} surveys
 */
exports.getSurveys = function(callback) {
  Survey.findAll()
  .then(function(surveys) {
    callback(null, surveys);
  })
  .catch(function(err) {
    callback(err);
  });
};


/**
 * @method getChoices
 * @param {Number} surveyId
 * @return {Object} choices
 */
exports.getChoices = function(surveyId, callback) {
  Choice.findAll({
    include: [{
      model: Survey
    }],
    where: { surveyId: surveyId }
  })
  .then(function(choicesObj) {

    // Get the survey obj, chances are choiceObj can be empty
    Survey.findOne({
      where: {
        id: surveyId
      }
    })
    .then(function(surveyObj) {
      callback(null, choicesObj, surveyObj);
    })
    .catch(function(err) {
      callback(err);
    });

  })
  .catch(function(err) {
    callback(err);
  });
};


/**
 * @method deleteSurvey
 * @param {Number} surveyId
 * @param {Boolean} - success or not
 *
 * @todo remove choices corresponding to the surveyId
 */
exports.deleteSurvey = function(surveyId, callback) {
  Survey.destroy({
    where: {
      id: surveyId
    }
  })
  .then(function() {
    callback(null, true);
  })
  .catch(function(err) {
    callback(err);
  });
};



/**
 * @method getRandSurvey
 * @param {String} sessionId
 * @return {Object} surveyObj
 */
exports.getRandSurvey = function(sessionId, callback) {

  Record.sync()
    .then(function() {
      Record.findAll({
        where: {
          sessionId: sessionId
        },
        attributes: [
          'surveyId'
        ]
      })
      .then(function(records) {
        var recordsArr = _.map(records, 'surveyId');

        var whereNotIn = {};
        if (recordsArr.length) {
          whereNotIn = {
            id: {
              $notIn: recordsArr
            }
          }
        }

        Survey.find({
          order: [
            Sequelize.fn('RAND')
          ],
          where: whereNotIn
        })
        .then(function(survey) {

          if (!survey) {
            return callback(null, null);
          }


          // FIXME: should be a single query, this is bad! Need to find out why RAND with `include` not working
          Choice.findAll({
            include: [{
              model: Survey
            }],
            where: {
              surveyId: survey.id
            }
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

      })
      .catch(function(err) {
        callback(err);
      });
    })
    .catch(function(err) {
      callback(null, null);
    });
};



/**
 * @method recordSurvey
 * @return {Object} as record callback object
 */
exports.recordSurvey = function(sessionId, surveyId, choiceId, callback) {
  Record.sync()
    .then(function() {
      Record.create({
        sessionId: sessionId,
        surveyId: surveyId,
        surveyChoiceId: choiceId
      })
      .then(function(record) {
        callback(null, record);
      })
      .catch(function(err) {
        callback(err);
      });
    });
};



/**
 * @method getStats
 * @param {Number} surveyId
 * @return {Object} as statsObj with results count for each choices
 */
exports.getStats = function(surveyId, callback) {
  Record.findAll({
    where: {
      surveyId: surveyId
    },
    attributes: ['surveyId', 'surveyChoiceId', [Sequelize.fn('COUNT', Sequelize.col('surveyChoiceId')), 'votes']],
    group: ['surveyId', 'surveyChoiceId']
  })
  .then(function(statsObj) {

    Choice.findAll({
      include: [{
        model: Survey
      }],
      where: {
        surveyId: surveyId
      }
    })
    .then(function(surveyObj) {
      //debug(JSON.stringify(surveyObj));
      var surveyObj = mergeVotes(surveyObj, statsObj);
      callback(null, surveyObj);
    })
    .catch(function(err) {
      callback(err);
    });

  })
  .catch(function(err) {
    callback(null, null);
  });
};



/**
 * @method mergeVotes
 *
 * helper method to merge statsObj with surveyObj when getting votes
 */
function mergeVotes(surveyObj, statsObj) {

  //Remove unwanted prototypes
  surveyObj = JSON.parse(JSON.stringify(surveyObj));
  statsObj = JSON.parse(JSON.stringify(statsObj));

  var newSurveyObj = _(surveyObj).forEach(function(survey) {
    var statsItem = _.find(statsObj, { surveyChoiceId: survey.id });
    survey.votes = statsItem
      ? statsItem.votes
      : 0;
  });

  return newSurveyObj;
}
