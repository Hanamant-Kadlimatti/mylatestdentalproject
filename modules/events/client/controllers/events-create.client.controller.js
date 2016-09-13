'use strict';

var eventCreateApp = angular.module('events');

eventCreateApp.controller('EventsCreateController',
    ['$scope', '$googleCalendar', '$location', '$log', '$filter', '$compile', 'prsnlService', '$mdDialog', '$mdMedia', '$rootScope',
        function ($scope, $googleCalendar, $location, $log, $filter, $compile, prsnlService, $mdDialog, $mdMedia, $rootScope) {

            $scope.events = [];

            this.selectedDentist = prsnlService.getDentist();
            this.selectedTreatment = prsnlService.getTreatment();

            $scope.myDate = new Date();

            $scope.minDate = new Date();

            $scope.maxDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth() + 2,
                $scope.myDate.getDate());

            $.datepicker.setDefaults({
                showOn: 'both',
                buttonImageOnly: true,
                buttonImage: 'calendar.gif',
                buttonText: 'Calendar'
            });

            // Checkbox code

            $scope.items = ['Asthma', 'High Blood Presure', 'Bleeding Disorder', 'Heart Disease', 'Diabetes'];
            $scope.selected = [];

            $scope.toggle = function (item, list) {
                var idx = list.indexOf(item);
                if (idx > -1) {
                    list.splice(idx, 1);
                }
                else {
                    list.push(item);
                }
            };

            $scope.exists = function (item, list) {
                return list.indexOf(item) > -1;
            };


            //Book an appointment            
            this.addEvent = function () {

                console.log('Start Time:', $scope.event.startTime);

                var time = $scope.event.startTime.match(/(\d+)(?::(\d\d))?\s*(p?)/);
                $scope.event.startDate.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
                $scope.event.startDate.setMinutes(parseInt(time[2]) || 0);

                console.log('Start Date:', $scope.event.startDate);

                //format end date/time object in to google format
                var endDate = new Date($scope.event.startDate);
                endDate.setMinutes(endDate.getMinutes() + this.selectedTreatment.duration);
                console.log('End Date:', endDate);

                $scope.patientInfo = {
                    patientName: $scope.event.patientName,
                    contact: $scope.event.patientPhoneNumber,
                    emailId: $scope.event.patientEmail
                };

                $rootScope.patient = $scope.patientInfo.patientName;
                $rootScope.dateTime = $scope.event.startDate;


                $googleCalendar.addEvent($scope.event.startDate, endDate, this.selectedDentist, $scope.patientInfo)
                    .then(function (result) {
                        console.log('Add Event Result:', result);
                        $scope.showSuccess();


                    }, function (result) {
                        $scope.showFailed();
                    });

            };

            this.updateTime = function () {

                $scope.notavailable = '';

                var _date = $filter('date')(new Date($scope.event.startDate), 'EEEE');

                $('#timePick').timepicker('remove');

                for (var index = 0; index < this.selectedDentist.slots.length; index++) {

                    var slot = this.selectedDentist.slots[index];

                    if (slot.day === _date) {

                        $scope.event.minTime = $filter('date')(new Date(slot.starttime), 'shortTime');
                        $scope.event.maxTime = $filter('date')(new Date(slot.endtime), 'shortTime');

                        $('#timePick').timepicker({
                            'minTime': $filter('date')(new Date(slot.starttime), 'shortTime'),
                            'maxTime': $filter('date')(new Date(slot.endtime), 'shortTime'),
                            'showDuration': true,
                            'step': this.selectedTreatment.duration,
                            'disableTextInput': true,
                            'timeFormat': 'H:i'
                        });

                        $scope.notavailable = '';
                        break;
                    }
                    else {
                        $scope.notavailable = 'No Slots Available for the selected date';   //$scope.notavailable = '';
                    }



                }

            };

            function DialogController($scope, $mdDialog, prsnlService) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
                $scope.selectedDentist = prsnlService.getDentist();
                $scope.selectedTreatment = prsnlService.getTreatment();

                $scope.displayName = $rootScope.patient;
                $scope.displayDateTime = $rootScope.dateTime;

            }

            $scope.showFailed = function () {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'modules/events/views/failed.tmpl.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                })
                    .then(function (answer) {
                        $location.path('/');
                    }, function () {
                        $location.path('/');
                    });
                $scope.$watch(function () {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function (wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });
            };

            $scope.showSuccess = function () {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'modules/events/views/success.tmpl.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                })
                    .then(function (answer) {
                        $location.path('/');
                    }, function () {
                        $location.path('/');
                    });
                $scope.$watch(function () {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function (wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });
            };

        }]);