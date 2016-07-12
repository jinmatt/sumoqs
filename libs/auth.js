/**
 * A middleware to secure admin access
 */

var debug = require('debug')('sumoqs:server');

/**
 * @method verify
 */
exports.verify = function(req, res, next) {
  var isVerified = req.signedCookies.isVerified
    ? true
    : false;

  if (!isVerified) {
    return res.redirect('/dashboard/login');
  }

  next();
};
