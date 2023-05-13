
// get users location
// search engine
// to do: safe to recent 
// add image
// polish html/css

$(document).ready(function() {

    function weatherCall(cityName){
        fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=c9b09d7b9d02160b7088c80cf4c4911d')
        .then(res => res.json())
        .then(data => {
            for(let i = 0; i < data.length; i ++){
                var resultsArr = data[i];
            }
            let lat = resultsArr.lat
            let lon = resultsArr.lon
      
            // make api call with the lon and lat to get the current weather data for that city. 
            fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + lat +  '&lon=' + lon + '&appid=c9b09d7b9d02160b7088c80cf4c4911d')
            .then(res => res.json())
            .then( data => {
                
                let icon = data.weather.icon
                console.log(data.weather.icon)
      
                    $('#City').append(data.name)
                    $('#Icon').append(src= "https://openweathermap.org/img/w/" + icon + ".png")
                    $('#Date').append(dayjs.unix(data.dt).format('DD MM YYYY'));
                    $('#Temp').append(data.main.temp + " &deg;" + "C")
                    $('#Wind').append(data.wind.speed + " KM/H")
                    $('#Humidity').append(data.main.humidity + " %")
                    
                
      
            })
      
            fetch('https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat +  '&lon=' + lon + '&appid=c9b09d7b9d02160b7088c80cf4c4911d')
            .then(res => res.json())
            .then(data => {
                
                
                console.log(data)
                    $('#DateOne').append(dayjs.unix(data.list[3].dt).format('DD MM YYYY'));
                    $('#TempOne').append(data.list[3].main.temp + " &deg;" + "C")
                    $('#WindOne').append(data.list[3].wind.speed + " KM/H")
                    $('#HumidityOne').append(data.list[3].main.humidity + " %")
                    // $('#Wind').append(data.four.wind.speed)
                    // $('#Humidity').append(data.four.main.humidity)
                    $('#DateTwo').append(dayjs.unix(data.list[11].dt).format('DD MM YYYY'));
                    $('#TempTwo').append(data.list[11].main.temp + " &deg;" + "C")
                    $('#WindTwo').append(data.list[11].wind.speed + " KM/H")
                    $('#HumidityTwo').append(data.list[11].main.humidity + " %")
      
                    $('#DateThree').append(dayjs.unix(data.list[19].dt).format('DD MM YYYY'));
                    $('#TempThree').append(data.list[19].main.temp + " &deg;" + "C")
                    $('#WindThree').append(data.list[19].wind.speed + " KM/H")
                    $('#HumidityThree').append(data.list[19].main.humidity + " %")
      
                    $('#DateFour').append(dayjs.unix(data.list[27].dt).format('DD MM YYYY'));
                    $('#TempFour').append(data.list[27].main.temp + " &deg;" + "C")
                    $('#WindFour').append(data.list[27].wind.speed + " KM/H")
                    $('#HumidityFour').append(data.list[27].main.humidity + " %")
      
                    $('#DateFive').append(dayjs.unix(data.list[35].dt).format('DD MM YYYY'));
                    $('#TempFive').append(data.list[35].main.temp + " &deg;" + "C")
                    $('#WindFive').append(data.list[35].wind.speed + " KM/H")
                    $('#HumidityFive').append(data.list[35].main.humidity + " %")
      
            })
          })
      }

    $(".btn").on("click", function() {

        let cityName = $(this).siblings('#searchbar').val();

            weatherCall(cityName);
        });
        
    $("#searchbar").on("keypress", function(e) {
        if(e.key === 'Enter'){
            let cityName = $('#searchbar').val();
            weatherCall(cityName)
        }


    })


    $(".btn").on("click", function(e) {
        let cityName = $(this).siblings('#searchbar').val();
        console.log(cityName)
        
        let item = <''
        

        $(".recent").append(item);
     localStorage.setItem(cityName)

    })

    console.log( "ready!" );
});
