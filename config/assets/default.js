'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.min.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
        'public/lib/fullcalendar/dist/fullcalendar.css',
        'public/lib/jquery-timepicker-jt/jquery.timepicker.css',
        'public/lib/angular-material/angular-material.css',
        'public/lib/font-awesome/font-awesome.css',
        'public/lib/angular-input-stars-directive/angular-input-stars.css',
        'public/lib/angularMultipleSelect/build/multiple-select.min.css',
        'public/lib/fullcalendar-scheduler/dist/scheduler.css'
      ],
      js: [
        //'public/lib/jquery/dist/jquery.min.js',
        //'public/lib/jquery-ui/jquery-ui.js',
        //'public/lib/angular/angular.js',
        'public/lib/angular-route/angular-route.js',
        'public/lib/angular-resource/angular-resource.js',
        //'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/angular-ui-calendar/src/calendar.js',
        'public/lib/moment/moment.js',
        'public/lib/angular-moment/angular-moment.js',
        'public/lib/fullcalendar/dist/fullcalendar.js',
        'public/lib/angular-cookies/angular-cookies.js',
        'public/lib/angular-filter/dist/angular-filter.min.js',
        'public/lib/angular-strap/dist/angular-strap.min.js',   
        'public/lib/angular-strap/dist/angular-strap.tpl.min.js', 
        'public/lib/jquery-timepicker-jt/jquery.timepicker.min.js',
        'public/lib/angular-jquery-timepicker/src/timepickerdirective.js',
        'public/lib/angular-material/angular-material.js',
        'public/lib/angular-input-stars-directive/angular-input-stars.js',
        'public/lib/angularMultipleSelect/build/multiple-select.min.js',
        'public/lib/fullcalendar-scheduler/dist/scheduler.js',
        //'public/lib/angular-aria/angular-aria.js'
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};