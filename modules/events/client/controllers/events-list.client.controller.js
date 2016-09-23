'use strict';

var eventsApp = angular.module('events');

eventsApp.controller('EventsController', ['$scope', '$googleCalendar', '$uibModal', '$log', '$mdSidenav',
    function ($scope, $googleCalendar, $uibModal, $log, $mdSidenav) {


        //================================================================================
        // Variables
        //================================================================================

        $scope.events = [];
        $scope.calEvents = [];
        $scope.eventSources = [];
        $scope.isCalendarView = true;
        $scope.isTableView = false;
        $scope.isSidenavOpen = false;

        /* config object */
        $scope.uiConfig = {
            calendar: {
                schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
                editable: false,
                
                aspectRatio: 1.5,

                header: {
                    left: 'month,agendaWeek,agendaDay,verticalResourceView',
                    center: 'title',
                    right: 'today prev,next'
                },

                views: {
                    verticalResourceView: {
                        type: 'timeline',
                        duration: { days: 1 },
                        buttonText: 'day by doctor',

                    },
                    agendaDay: {
                        resources: false
                    }
                },
                minTime: '8:00',
                maxTime: '21:00',

                resourceAreaWidth: '20%',
                resourceLabelText: 'Doctors',

                resources: [
                    { id: 'Dr Rajendra Kurady', name: 'Dr Rajendra Kurady', eventColor: 'green' },
                    { id: 'Dr. Saphal Shetty', name: 'Dr. Saphal Shetty', eventColor: 'green' },
                    { id: 'Dr. Satish K', title: 'Dr. Satish K', eventColor: 'brown' },
                    { id: 'Dr. Siddharth K', name: 'Dr. Siddharth K', eventColor: 'orange' },
                    { id: 'Prof. Dr. Shiva Shanakar', name: 'Prof. Dr. Shiva Shanakar', eventColor: 'red' },
                    { id: 'Prof. Dr. Ponnanna A A', name: 'Prof. Dr. Ponnanna A A', eventColor: 'lime' },
                    { id: 'Prof. Dr. Anjan Shah', title: 'Prof. Dr. Anjan Shah', eventColor: 'purple' },
                    { id: 'Dr. Sudarshan Pujari', title: 'Dr. Sudarshan Pujari', eventColor: '#9ACD32' },
                    { id: 'Dr. Sudarshan A', title: 'Dr. Sudarshan A', eventColor: 'maroon' },
                    { id: 'Dr. Manjunath Hegde', title: 'Dr. Manjunath Hegde', eventColor: 'black' },
                    { id: 'Dr. Pallavi Urs', title: 'Dr. Pallavi Urs', eventColor: '#FF00FF' },
                    { id: 'Dr. Veena Aralli', title: 'Dr. Veena Aralli', eventColor: '#0000FF' },
                    { id: 'Prof. Dr. Dharma M Hinduja', title: 'Prof. Dr. Dharma M Hinduja', eventColor: '#00FFFF' },
                    { id: 'Prof. Dr. Nanda Kishor', title: 'Prof. Dr. Nanda Kishor', eventColor: '#FFC0CB' },
                    { id: 'Prof. Dr. Sunil Rao', title: 'Prof. Dr. Sunil Rao', eventColor: '#BDB76B' },

                    { id: 'Dr.Aparna Srinivas', title: 'Dr.Aparna Srinivas', eventColor: '#00BFFF' },
                    { id: 'Dr. Harish Sampath', title: 'Dr. Harish Sampath', eventColor: '#9ACD32' },
                    { id: 'Dr.Ranjitha Shetty', title: 'Dr.Ranjitha Shetty', eventColor: '#FFFFE0' },
                    { id: 'Dr. Syed Mutheei Ulla', title: 'Dr. Syed Mutheei Ulla', eventColor: '#B8860B' },
                ],

                eventClick: $scope.alertOnEventClick
            }
        };

        this.toggleview = function () {
            if ($scope.isCalendarView === true) {
                $scope.isCalendarView = false;
                $scope.isTableView = true;
            }
            else {
                $scope.isCalendarView = true;
                $scope.isTableView = false;
            }
        };

        /* alert on eventClick calendar*/
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            $scope.currentEvent = date;
            $mdSidenav('right').toggle();
        };

        //================================================================================
        // Scope Functions
        //================================================================================

        $scope.getEvents = function () {
            $googleCalendar.getEvents().then(function (events) {

                $scope.events = events;

                for (var index = 0; index < events.length; index++) {
                    var event = events[index];

                    $scope.calEvents[index] = {
                        'title': event.summary,
                        'start': event.start.dateTime,
                        'end': event.end.dateTime,
                        'description': event.description,
                        'resourceId': event.summary,
                        'stick': 'true'
                    };
                    console.log(event.summary);
                }

            });
        };

        $scope.eventSources = [$scope.calEvents];

        $scope.setCurrentEvent = function (event) {
            $scope.currentEvent = event;
        };


    }]);

