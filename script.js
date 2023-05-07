
// get users location

// search engine

//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q=sydney&limit=1&appid=c9b09d7b9d02160b7088c80cf4c4911d


// save that have been selected to local storage and display them.

$(document).ready(function() {
    $(".btn").click(function() {
        // use jquery to get the user value from search from submit. 
       var cityName = $(this).siblings('#searchbar').val();
        // make api call using city name to get long/lat

      fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=c9b09d7b9d02160b7088c80cf4c4911d')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                for(i = 0; i < data.length; i ++){
                    resultsArr = data[i];
                }
                var lat = resultsArr.lat
                var lon = resultsArr.lon
                console.log(lat)
                console.log(lon)
                console.log(resultsArr)

                fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat +  '&lon=' + lon + '&appid=c9b09d7b9d02160b7088c80cf4c4911d')
                .then(res => res.json())
                .then( data => {
                    console.log(data)
                    for(i = 0; i < data.length; i ++){
                        weatherDataArr = data[i];
                    }
    
                })
                
               
            })

          
                
                
                
                
           
        });
        


    console.log( "ready!" );
});
