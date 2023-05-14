
var searchedCityList = [];

function weatherCall(cityName){
    const apiKey = "c9b09d7b9d02160b7088c80cf4c4911d";
    $('#current').empty()
    $('#dayOne').empty()
    $('#dayTwo').empty()
    $('#dayThree').empty()
    $('#dayFour').empty()
    $('#dayFive').empty()
    
       // make an api call using city name to get the lon and lat
       fetch(`https://api.openweathermap.org/geo/1.0/direct?q=' + ${cityName} + '&limit=1&appid=${apiKey}`)
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
           .then( data => 
               {
                    let weatherIcon = data.weather.icon
                    console.log(weatherIcon)
        
              
     
                   let currentWeatherDiv = 
                   '<p class="p" id="City">' + data.name +  '</p>'+
                   '<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"></img>'+
                   '<p class="p" id="Date">' + dayjs.unix(data.dt).format('DD MM YYYY')  +'</p>'+
                   '<p class="p"id="Temp">'+ "Temp: " + data.main.temp + " &deg;" + "C" +'</p>' +
                   '<p class="p" id="Wind">'+ "Wind Speed: " + data.wind.speed + " KM/H" +'</p>' +
                   '<p class="p" id="Humidity">'+ "Humidity: " + data.main.humidity + " %"+'</p>' 

                   $("#current").append(currentWeatherDiv)
           })
           // make api call with lon and lat for the 5 day forecast
           fetch('https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat +  '&lon=' + lon + '&appid=c9b09d7b9d02160b7088c80cf4c4911d')
           .then(res => res.json())
           .then(data => {
               
               let dayOneDiv = 
               '<p class="p" id="DateOne">' + dayjs.unix(data.list[3].dt).format('DD MM YYYY')  +'</p>'+
               '<p class="p"id="IconOne">'+ "Temp: " + data.list[3].main.temp + " &deg;" + "C" +'</p>' +
               '<p class="p" id="TempOne">'+ "Wind Speed: " + data.list[3].wind.speed + " KM/H" +'</p>' +
               '<p class="p" id="HumidityOne">'+ "Humidity: " + data.list[3].main.humidity + " %"+'</p>' 

               $("#dayOne").append(dayOneDiv)

               let dayTwoDiv =
               '<p class="p" id="DateOne">' + dayjs.unix(data.list[11].dt).format('DD MM YYYY')  +'</p>'+
               '<p class="p"id="IconOne">'+ "Temp: " + data.list[11].main.temp + " &deg;" + "C" +'</p>' +
               '<p class="p" id="TempOne">'+ "Wind Speed: " + data.list[11].wind.speed + " KM/H" +'</p>' +
               '<p class="p" id="HumidityOne">'+ "Humidity: " + data.list[11].main.humidity + " %"+'</p>' 

               $('#dayTwo').append(dayTwoDiv)
             
               let dayThreeDiv =
               '<p class="p" id="DateOne">' + dayjs.unix(data.list[19].dt).format('DD MM YYYY')  +'</p>'+
               '<p class="p"id="IconOne">'+ "Temp: " + data.list[19].main.temp + " &deg;" + "C" +'</p>' +
               '<p class="p" id="TempOne">'+ "Wind Speed: " + data.list[19].wind.speed + " KM/H" +'</p>' +
               '<p class="p" id="HumidityOne">'+ "Humidity: " + data.list[19].main.humidity + " %"+'</p>' 

               $('#dayThree').append(dayThreeDiv) 

               let dayFourDiv = 

               '<p class="p" id="DateOne">' + dayjs.unix(data.list[27].dt).format('DD MM YYYY')  +'</p>'+
               '<p class="p"id="IconOne">'+ "Temp: " + data.list[27].main.temp + " &deg;" + "C" +'</p>' +
               '<p class="p" id="TempOne">'+ "Wind Speed: " + data.list[27].wind.speed + " KM/H" +'</p>' +
               '<p class="p" id="HumidityOne">'+ "Humidity: " + data.list[27].main.humidity + " %"+'</p>' 

               $('#dayFour').append(dayFourDiv)

               let dayFiveDiv = 

               '<p class="p" id="DateOne">' + dayjs.unix(data.list[35].dt).format('DD MM YYYY')  +'</p>'+
               '<p class="p"id="IconOne">'+ "Temp: " + data.list[35].main.temp + " &deg;" + "C" +'</p>' +
               '<p class="p" id="TempOne">'+ "Wind Speed: " + data.list[35].wind.speed + " KM/H" +'</p>' +
               '<p class="p" id="HumidityOne">'+ "Humidity: " + data.list[35].main.humidity + " %"+'</p>' 

               $('#dayFive').append(dayFiveDiv)
   
     
           })
         })
     }

function saveCity(cityName){
    
    localStorage.setItem("city", cityName)
}

function getCity(cityName){
    localStorage.getItem()
}

function displayRecent(){

}

function addCity(cityName){
    let cityExists = false;
        for(let i = 0; i < searchedCityList.length; i ++){
            if(cityName === searchedCityList[i]){
                cityExists = true;
              break;
            } 
        } 
        if(!cityExists){
            searchedCityList.push(cityName);
            localStorage.setItem("city", cityName)
            let cityButton = '<button type="submit" class="btn btn-primary btn-lg col-2">'+ cityName +'</button>'
            $("#Recent").append(cityButton);
        }
}

$(document).ready(function() {


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

// add a handler to save searched cities to local storage
    $(".btn").on("click", function(e) {
    let cityName = $(this).siblings('#searchbar').val().trim();
    addCity(cityName)
    
   

    
    

    })

    
    


    console.log( "ready!" );
});
