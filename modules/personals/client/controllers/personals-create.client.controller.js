'use strict';

// Personals create controller

var personalsApp = angular.module('personals');

personalsApp.controller('PersonalsCreateController', ['$scope', 'Personals', 'Notify', 'filepickerService',
  function ($scope, Personals, Notify, filepickerService) {
    
    // Create new Personal
    this.CreatePrsnl = function () {

      // Create new Personal object
      var personal = new Personals({
        fName: this.fName,
        lName: this.lName,
        emailId: this.emailId,
        contact: this.contact,
        //isConsultant: this.isConsultant,
        speciality: this.speciality,
        qualification: this.qualification,
        experience: this.experience,
        rating: this.rating,
        treatments: this.selectedTreatments,
        slots: this.slots,
        picture: this.picture
      });

      // Redirect after save
      personal.$save(function (response) {

        // Clear form fields
        $scope.fName = '';
        $scope.lName = '';
        $scope.emailId = '';
        $scope.contact = '';
        //$scope.isConsultant = '';
        $scope.speciality = '';
        $scope.qualification = '';
        $scope.experience = '';
        $scope.rating = null;
        $scope.selectedTreatments = null;
        $scope.slots = null;
        $scope.picture = null;
        Notify.sendMsg('NewPersonal', {'id': response._id});
        
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    
    //photo upload
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
          $scope.createPrsnlCtrl.picture = Blob;
          $scope.$apply();
        }
      );
    };
    
  }
]);

