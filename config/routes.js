/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /login': 'LoginController.login',
  'POST /signup': 'LoginController.signup',
  'POST /updatemodel': 'LoginController.updatemodel',
  'GET /test': 'LoginController.test',
  'POST /createevent': 'EventController.createevent',
  'GET /getevents': 'EventController.getevents',
  'GET /gethistoricevents': 'EventController.gethistoricevents',
  'GET /getdetailed': 'EventController.getdetailed',
  'POST /applytoevent': 'EventController.applytoevent',
};
