'use strict';

// Configuring the Patients module
angular.module('patients',['multipleSelect','mgcrea.ngStrap', 'ngMaterial', 'ui.bootstrap']).run(['Menus',
  function (Menus) {
    // Add the patients dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Patient Information',
      state: 'patients',
      type: 'dropdown',
      roles: ['user']
    });
     // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'patients', {
      title: 'Patient Information',
      state: 'patients.list'
    });
     Menus.addSubMenuItem('topbar', 'patients', {
      title: 'Patients Latest',
      state: 'patients.patientlslist'
    });
  }
]);



