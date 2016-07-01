/**
 * User model
 */

var Sequelize = require('sequelize');
var sequelize = require(__base + 'config/sequelize');

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  }
}, {
  freezeTableName: true,
});

User.sync();

exports.create = function(first, last, callback) {
  var user = User
    .create({
      firstName: first,
      lastName: last
    });

  if (!user.isRejected) {
    callback(err);
  } else {
    callback(null, true);
  }
};
