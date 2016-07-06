/**
 * A middleware to handle user sessions
 */

var uuid = require('uuid');

/**
 * @method setSession
 */
exports.setSession = function(req, res, next) {
  var hasSession = req.signedCookies.sessionId
    ? true
    : false;

  if (!hasSession) {
    res.cookie('sessionId', uuid.v4(), {
      httpOnly: true,
      signed: true
    });
  }

  next();
};
