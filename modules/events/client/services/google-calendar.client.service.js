'use strict';


angular.module('GoogleCalendarService', [], function($provide){

	$provide.factory('$googleCalendar', function($http, $q){

		var $scope = angular.element(document).scope();

		//the url where our node.js application is located
		//var domain =  window.location;
		 //var baseUrl = domain.protocol +'//'+ domain.hostname +':'+domain.port; //  var baseUrl = 'http://192.168.1.14:3000';// var baseUrl = 'http://localhost:3000';
		
		// console.log('MY URL===>' +baseUrl);
		
		 
		var baseUrl = 'https://mylatestdentalproject.herokuapp.com';
 
		return {
			load: function(){
				var defer = $q.defer();

				$http.get(baseUrl+'/eventload').then(function(response){

					if(response.status === 200){
						$scope.$broadcast('GoogleEventsReceived', response.data.items);
						defer.resolve(response.data.items);
					}

					else{
						$scope.$broadcast('GoogleError', response.data);
						defer.reject(response.data);
					}

				});

				return defer.promise;
			},
			getEvents: function(){
				var defer = $q.defer();

				$http.get(baseUrl+'/events').then(function(response){

					if(response.status === 200){
						$scope.$broadcast('GoogleEventsReceived', response.data.items);
						defer.resolve(response.data.items);
					}

					else{
						$scope.$broadcast('GoogleError', response.data);
						defer.reject(response.data);
					}

				});

				return defer.promise;
			},
			addEvent: function(scheduledDate, endDate, contactInfo, patientInfo){
				var defer = $q.defer();

				var postData = {
					startdate: scheduledDate,
					enddate: endDate,
					contact: contactInfo,
                    patient: patientInfo
				};

				$http.post(baseUrl+'/event', postData, {'Content-Type':  'application/json'})
                .then(function(response){

					if(response.status === 200){
						$scope.$broadcast('eventAddedSuccess', response.data);
						defer.resolve(response.data);
					}
					else{
						console.log(response.data);
						$scope.$broadcast('GoogleError', response.data);
						defer.reject(response.data);
					}
				}, 
                function(response) {
                    console.log(response.data);
                    $scope.$broadcast('GoogleError', response.data);
                    defer.reject(response.data);
                });

				return defer.promise;
			}
		};

	});

});