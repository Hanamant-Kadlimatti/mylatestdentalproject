'use strict';

// Personals controller

var personalsApp = angular.module('personals');

personalsApp.directive('onErrorSrc', function() {
    return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src !== attrs.onErrorSrc) {
              attrs.$set('src', attrs.onErrorSrc);
            }
          });
        }
    };
});

personalsApp.controller('PersonalsController', ['$scope', '$stateParams', 'Personals', '$uibModal', '$log', '$q', 'slotService',
    function($scope, $stateParams, Personals, $uibModal, $log, $q, slotService) {

        // Find a list of Personals
        this.personals = Personals.query();

        console.log(this.personals);

        // Open a modal window to create a single personal record

        this.modelCreate = function(size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modules/personals/views/create-personal.client.view.html',

                controller: function($scope, $uibModalInstance) {

                    $scope.ok = function() {
                        $uibModalInstance.close($scope.personal);
                    };

                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };

                },
                size: size
            });

            modalInstance.result.then(function(selectedItem)
            { $scope.selected = selectedItem; }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };

        // Open a modal window to update a single personal record
        this.modelUpdate = function(size, selectedPersonal) {

            var elements = [];
            for (var index = 0; index < selectedPersonal.treatments.length; index++) {
                var element = selectedPersonal.treatments[index];

                elements[index] = {
                    description: element.description,
                    duration: element.duration,
                    price: element.price,
                    checked: true
                };
            }

            selectedPersonal.treatments = elements;

            console.log(selectedPersonal);

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modules/personals/views/edit-personal.client.view.html',
                controller: function($scope, $uibModalInstance, selectedPersonal) {

                    $scope.personal = selectedPersonal;

                    $scope.ok = function() {
                        $uibModalInstance.close($scope.personal);
                    };

                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };

                },
                size: size,
                resolve: {
                    selectedPersonal: function() {
                        return selectedPersonal;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {

            });


        };

        // Open a modal window to update a single personal record
        this.modelSchedule = function(size, selectedPersonal) {

            var modalInstance = $uibModal.open({

                animation: $scope.animationsEnabled,

                templateUrl: 'modules/personals/views/list-apptslots.client.view.html',

                controller: function($scope, $uibModalInstance, selectedPersonal, slotService) {

                    $scope.personal = selectedPersonal;
                    slotService.slotList = selectedPersonal.slots;

                    //console.log($scope.slotList);

                    $scope.ok = function() {
                        $uibModalInstance.close($scope.personal);
                    };

                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };

                },

                size: size,

                resolve: {
                    selectedPersonal: function() {
                        return selectedPersonal;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {

            });
        };

        // Remove existing Personal
        this.remove = function(personal) {

            if (confirm('Are you sure you want to delete this user?')) {
                if (personal) {

                    personal.$remove();

                    for (var i in this.personals) {
                        if (this.personals[i] === personal) {
                            this.personals.splice(i, 1);
                        }
                    }

                } else {
                    this.personal.$remove(function() { });
                }
            }
        };

    }
]);
