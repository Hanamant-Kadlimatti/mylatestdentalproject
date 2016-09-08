'use strict';

module.exports = {
  app: {
    title: 'Scheduling Application',
    description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
    keywords: 'MongoDB, Express, AngularJS, Node.js',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions',
  logo: 'modules/core/img/brand/logo.png',
  favicon: 'modules/core/img/brand/favicon.ico',
  uploads: {
    profileUpload: {
      dest: './modules/users/img/profile/uploads/', // Profile upload destination path
      limits: {
        fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
      }
    }
  }
};
