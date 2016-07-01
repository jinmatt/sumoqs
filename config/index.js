/**
 * Configuration manager
 *
 * @author: Jinsu Mathew <jinsu.mails@gmail.com>
 */

// Module dependencies
var fs = require('fs');
var path = require('path');
var node_env = process.env.NODE_ENV;
var config_buffer = null;

// Init config_buffer according to the NODE_ENV
switch (node_env) {
  case 'production':
    config_buffer = fs.readFileSync(path.resolve(__dirname, 'production.json'), 'utf-8');
    break;
  case 'staging':
    config_buffer = fs.readFileSync(path.resolve(__dirname, 'staging.json'), 'utf-8');
    break;
  default:
    config_buffer = fs.readFileSync(path.resolve(__dirname, 'default.json'), 'utf-8');
}


var config = JSON.parse(config_buffer);
module.exports = config;
