'use strict';

module.exports = function (app) {
  // Root routing
  var event = require('../controllers/events.server.controller');

  app.route('/api/loadprofile').get(event.loadprofile);

  app.route('/api/events').get(event.list);

  app.route('/api/events').post(event.create);

};