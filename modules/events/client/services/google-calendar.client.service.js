'use strict';


angular.module('GoogleCalendarService', [], function ($provide) {

	$provide.factory('$googleCalendar', function ($http, $q, $location) {

		var $scope = angular.element(document).scope();

		//the url where our node.js application is located
		var baseUrl = $location.protocol() + '://' + location.host;

		return {
			getEventByUser: function (user, startDate, endDate) {
				var defer = $q.defer();

				var jsonData = {
					params: {
						startdate: startDate,
						enddate: endDate,
						user: user.fName + ' ' + user.lName
					}
				}

				$http.get(baseUrl + '/api/getEventByUser', jsonData)
					.then(function (response) {

						if (response.status === 200) {
							$scope.$broadcast('GoogleEventsReceived', response.data.items);
							defer.resolve(response.data.items);
							console.log(response.data.items);
						}

						else {
							$scope.$broadcast('GoogleError', response.data);
							defer.reject(response.data);
						}

					});

				return defer.promise;
			},
			getEvents: function () {
				var defer = $q.defer();

				$http.get(baseUrl + '/api/events').then(function (response) {

					if (response.status === 200) {
						$scope.$broadcast('GoogleEventsReceived', response.data.items);
						defer.resolve(response.data.items);
						console.log(response.data.items);
					}

					else {
						$scope.$broadcast('GoogleError', response.data);
						defer.reject(response.data);
					}

				});

				return defer.promise;
			},
			addEvent: function (scheduledDate, endDate, contactInfo, patientInfo) {
				var defer = $q.defer();

				var postData = {
					startdate: scheduledDate,
					enddate: endDate,
					contact: contactInfo,
                    patient: patientInfo
				};

				$http.post(baseUrl + '/api/events', postData, { 'Content-Type': 'application/json' })
					.then(function (response) {

						if (response.status === 200) {
							$scope.$broadcast('eventAddedSuccess', response.data);
							defer.resolve(response.data);
						}
						else {
							console.log(response.data);
							$scope.$broadcast('GoogleError', response.data);
							defer.reject(response.data);
						}
					},
					function (response) {
						console.log(response.data);
						$scope.$broadcast('GoogleError', response.data);
						defer.reject(response.data);
					});

				return defer.promise;
			}
		};

	});

});