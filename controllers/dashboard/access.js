/**
 * Dashboard access management
 */

var debug = require('debug')('sumoqs:server');

/**
 * @method login
 */
exports.login = function(req, res) {
  res.render('dashboard/login', {
    title: 'SumoQs Dashboard - Login'
  });
};



/**
 * @method verify
 */
exports.verify = function(req, res) {

  // Get password from config env
  var configPassword = process.env.ADMIN_PASS;

  // If config not set by env
  if (!configPassword) {
    return res.render('error', {
      message: 'Application not configured with a admin password.',
      error: new Error('Invalid application config: ADMIN_PASS env missing')
    });
  }

  var isCorrect = configPassword === req.body.password
    ? true
    : false;

  if (isCorrect) {
    res.cookie('isVerified', isCorrect, {
      httpOnly: true,
      signed: true
    });
  } else {
    return res.render('dashboard/login', {
      title: 'SumoQs Dashboard - Login failed',
      err: 'Invalid password'
    });
  }

  res.redirect('/dashboard');
};



/**
 * @method logout
 */
exports.logout = function(req, res) {
  res.clearCookie('isVerified');

  res.redirect('/dashboard/login');
};
