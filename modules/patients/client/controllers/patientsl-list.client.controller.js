'use strict';

var patientApp = angular.module('patients');

patientApp.controller('PatientslController', ['$scope', 'Patientls', function ($scope, Patientls) {

    var patients;

    Patientls.query(function(result){
        $scope.patients = result;
        patients = $scope.patients;
        $scope.totalItems = $scope.patients.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 20;
    });    


    $scope.$watch("currentPage", function () {
        setPagingData($scope.currentPage);
    });

    function setPagingData(page) {

        if (patients && patients.length > 0) {
            var pagedData = patients.slice(
                (page - 1) * $scope.itemsPerPage,
                page * $scope.itemsPerPage
            );

            $scope.patients = pagedData;
        }

    }

}]);