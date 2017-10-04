'use strict';

/**
 * Module dependencies.
 */
var patientslPolicy = require('../policies/patientsl.server.policy'),
patientsl = require('../controllers/patientsl.server.controller');

module.exports = function (app) {
  // Patients collection routes
  app.route('/api/patientls')
    .get(patientsl.list)
    .post(patientsl.create);

  // Single patient routes
  app.route('/api/patientls/:patientId')
    .get(patientsl.read)
    .put(patientsl.update)
    .delete(patientsl.delete);
    

  // Finish by binding the patient middleware
  app.param('patientId', patientsl.patientByID);
};
