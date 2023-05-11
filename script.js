
// get users location

// search engine

// save that have been selected to local storage and display them.
$(document).ready(function() {
    $(".btn").click(function() {
        // use jquery to get the user value from search from submit. 
        let appid = "c9b09d7b9d02160b7088c80cf4c4911d"
        let cityName = $(this).siblings('#searchbar').val();
        // make api call using city name to get long/lat

      fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=c9b09d7b9d02160b7088c80cf4c4911d')
            .then(res => res.json())
            .then(data => {
                for(let i = 0; i < data.length; i ++){
                    var resultsArr = data[i];
                }
                let lat = resultsArr.lat
                let lon = resultsArr.lon

                // make api call with the lon and lat to get the current weather data for that city. 
                fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat +  '&lon=' + lon + '&appid=c9b09d7b9d02160b7088c80cf4c4911d')
                .then(res => res.json())
                .then( data => {
                       console.log(data)
                        $('#City').append(data.name)
                        $('#Temp').append(data.main.temp)
                        $('#Wind').append(data.wind.speed)
                        $('#Humidity').append(data.main.humidity)
                        
                    

                })

                fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +  '&lon=' + lon + '&appid=c9b09d7b9d02160b7088c80cf4c4911d')
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                        // $('#Date').append(dt_txt)
                        $('#Temp').append(data.list[3].main.temp)
                        $('#Wind').append(data.list[3].wind.speed)
                        $('#Humidity').append(data.list[3].main.humidity)
                        // $('#Wind').append(data.four.wind.speed)
                        // $('#Humidity').append(data.four.main.humidity)
                        $('#Temp').append(data.list[11].main.temp)
                        $('#Wind').append(data.list[11].wind.speed)
                        $('#Humidity').append(data.list[11].main.humidity)

                        $('#Temp').append(data.list[19].main.temp)
                        $('#Wind').append(data.list[19].wind.speed)
                        $('#Humidity').append(data.list[19].main.humidity)

                        $('#Temp').append(data.list[27].main.temp)
                        $('#Wind').append(data.list[27].wind.speed)
                        $('#Humidity').append(data.list[27].main.humidity)

                        $('#Temp').append(data.list[35].main.temp)
                        $('#Wind').append(data.list[35].wind.speed)
                        $('#Humidity').append(data.list[35].main.humidity)

                })

            })      
                 
        });
        


    console.log( "ready!" );
});
