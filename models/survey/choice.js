/**
 * Schema for survey choices
 *
 * 1:m relation from survey:choice
 */

var Sequelize = require('sequelize');
var sequelize = require(__base + 'config/sequelize');

var Choice = sequelize.define('survey_choices', {
 choice: {
   type: Sequelize.STRING,
   field: 'choice'
 },
}, {
 freezeTableName: true
});

module.exports = Choice;
