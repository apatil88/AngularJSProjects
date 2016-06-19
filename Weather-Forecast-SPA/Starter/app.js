// MODULE

var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    //To get weather for number of days in the request
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    
});


// SERVICES
weatherApp.service('cityService', function() {
   
    this.city = "New York, NY";
    
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    //Watch the city value when it changes
    $scope.$watch('city', function() {
        
       cityService.city = $scope.city; 
    
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || 2;
    
    //API call to get weather data
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback : "JSON_CALLBACK"}, { get: {method: "JSONP"}});
    
    //Store the JSON response
    $scope.weatherResult = $scope.weatherAPI.get( { q: $scope.city, cnt: $scope.days, APPID: 'c60596606b9c7eb8c6ac2dae9bf89f9c'});
    
    $scope.convertToFahrenheit = function(degK){
        return Math.round((1.8 * (degK - 273)) + 32); 
    };
    
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);  
    };

}]);