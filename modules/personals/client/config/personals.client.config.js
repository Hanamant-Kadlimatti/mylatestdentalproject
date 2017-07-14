'use strict';

// Configuring the Personals module
angular.module('personals',['multipleSelect','mgcrea.ngStrap', 'ngMaterial', 'angular-filepicker']).run(['Menus',
  function (Menus) {
    // Add the personals dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'personals',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'personals', {
      title: 'Dentist Lists',
      state: 'personals.list'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'personals', {
      title: 'Treatment Types',
      state: 'personals.appttypelist'
    });
  }
]);
