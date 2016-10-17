'use strict';

// Personals update controller

var personalsApp = angular.module('personals');

personalsApp.controller('PersonalsUpdateController', ['$scope', 'filepickerService',
    function($scope, filepickerService) {
        this.rating = 1;
        this.rateFunction = function(rating) {
            alert('Rating selected - ' + rating);
        };
        
        // Update existing Personal
        this.UpdatePrsnl = function(updtpersonal) {

            var personal = updtpersonal;

            personal.$update(function() {
            }, function(errorResponse) {

                $scope.error = errorResponse.data.message;
                console.log(errorResponse.data.message);
            });
        };
        
        //phot update
         $scope.upload = function () {
      filepicker.setKey('ACJvoNUISuSuMS7Xhkqu2z');
      filepickerService.pick(
        {
          mimetype: 'image/*',
          language: 'en',
          services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
          openTo: 'IMAGE_SEARCH'
        },
        function (Blob) {
          console.log(JSON.stringify(Blob));
          $scope.personal.picture = Blob;
          $scope.$apply();
        }
      );
    };
    }
]);