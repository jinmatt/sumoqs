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
    var sessionId = uuid.v4();
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      signed: true
    });

    req.sessionId = sessionId;
  } else {
    req.sessionId = req.signedCookies.sessionId;
  }

  next();
};
