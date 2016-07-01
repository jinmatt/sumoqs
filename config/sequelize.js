/**
 * MySQL config
 *
 * @author: Jinsu Mathew <jinsu.mails@gmail.com>
 */

var Sequelize = require('sequelize');
var config = require(__base + 'config');

var sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  host: config.mysql.host,
  port: config.mysql.port,
  dialect: 'mysql',
  logging: config.mysql.logging,
  pool: {
    max: config.mysql.poolMax,
    min: config.mysql.poolMin,
    idle: config.mysql.poolIdle
  }
});

module.exports = sequelize;
