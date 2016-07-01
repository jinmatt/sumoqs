/**
 * User controller
 */

var userModel = require(__base + 'models/user')

exports.create = function(req, res) {
  userModel.create('Doe', 'John', function onCreate(err, isSuccess) {
    res.send('IsSuccess: ' + isSuccess);
  });
};
