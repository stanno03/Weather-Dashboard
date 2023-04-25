
// get users location

// search engine

//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q=sydney&limit=1&appid=c9b09d7b9d02160b7088c80cf4c4911d


// save that have been selected to local storage and display them.

$( document ).ready(function() {
    $('.searchbar').on('submit', function() {
        // use jquery to get the user value from search from submit. 
       var cityName = $(this).val()
        // make api call using city name to get long/lat
        $.ajax({
            url: "http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=c9b09d7b9d02160b7088c80cf4c4911d",
            type: GET,
            success: function(result){
                var cityData = JSON.parse(result)
                var lon = cityData[lon]
                var lat = cityData[lat]
            }
        })
        // use ajax to make api call to open weather map using the long/lat.
        $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=c9b09d7b9d02160b7088c80cf4c4911d",
                type: GET,
                success: function(result){
                    var cityData = JSON.parse(result)

                    var icon = cityData[icon]
                    var temperature = cityData[temp]
                    var humidity = cityData[humidity]
                    var windSpeed = cityData[wind.speed]


                }

        })
        
        
        
        });
        
    console.log( "ready!" );
});
