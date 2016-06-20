// SERVICES
weatherApp.service('cityService', function() {
   
    this.city = "New York, NY";
    
});

//CUSTOM SERVICE TO MAKE API CALL
weatherApp.service('weatherService', ['$resource', function($resource) {
   
    this.GetWeatherData = function(city, days) {
        //API call to get weather data
        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback : "JSON_CALLBACK"}, { get: {method: "JSONP"}});
    
        //Store the JSON response
        return weatherAPI.get( { q: city, cnt: days, APPID: 'c60596606b9c7eb8c6ac2dae9bf89f9c' });
    };
}]);