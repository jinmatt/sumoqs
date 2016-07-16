/**
 * Schema for survey choice vote records
 */

var Sequelize = require('sequelize');
var sequelize = require(__base + 'config/sequelize');

var Record = sequelize.define('survey_records', {
  sessionId: {
    type: Sequelize.UUID,
    field: 'sessionId'
  }
}, {
  freezeTableName: true
});

module.exports = Record;
