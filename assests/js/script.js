

$(document).ready(function() {


    // call the displayCurrentCity function and use geolocation to get the location of the user.
    // displayCurrentCity()
   

// weather call function on click of submit button
    $(".btn").on("click", function(e) {
        e.preventDefault()

        let cityName = $('#searchbar').val().toLowerCase();
        weatherCall(cityName);

        });
        
    //   event handler for pressing enter in the searchbar which calls the weathercall  
    $("#searchbar").on("keypress", function(e) {
       
        if(e.key === 'Enter'){
            let cityName = $('#searchbar').val().toLowerCase();
            weatherCall(cityName)
        }


    })

// add a handler to save searched cities to local storage on click 
    // $(".btn").on("click", function(e) {
    //  e.preventDefault()
    // let cityName = $(this).siblings('#searchbar').val();
    // if(cityName == null){
    //     return; 
    // }


    // addCity(cityName)
    // })

    // add a handler to save searched cities to local storage on enter key pressed.
    // $("#searchbar").on("keypress", function(e) {
        
    //     if(e.key === 'Enter'){
    //     let cityName = $(this).val()
    //     // addCity(cityName)
       
    //     }
    //     })

       
        // function to add a city to local storage
        function addCity(cityName){
            let cityExists = false;
            let savedCity = JSON.parse(localStorage.getItem("city")) || [];
            
                for(let i = 0; i < savedCity.length; i ++){
                    if(cityName === savedCity[i]){
                        cityExists = true;
                      break;
                    } 
                } 
                if(!cityExists){
                    let searchedCityList = JSON.parse(localStorage.getItem("city")) || [];
                    searchedCityList.push(cityName)
                    localStorage.setItem("city", JSON.stringify(searchedCityList));
                    let cityButton = '<button type="submit" class="btn btn-primary btn-lg col-2">'+ cityName +'</button>'
                    $("#Recent").append(cityButton);
                }
        }
        //function to display cities saved in local storage 
        function displayRecent(){
    
    
            let savedCity = JSON.parse(localStorage.getItem("city")) || [];
        
        
            savedCity.forEach(savedCity => {
        
            let displaySaved ='<button type="submit" id = "btn" class="recentBtn btn btn-primary btn-lg col-6">'+ savedCity +'</button>'
                $("#recent").append(displaySaved);
            
           });
        
        // function to weathercall when one of the recent saved buttons have been clicked
           $(".recentBtn").on("click", function(e) {
            e.preventDefault()
            let cityName = $(this).text().toLowerCase();
            if(cityName == null){
                return; 
            }
                weatherCall(cityName);
            });
        
           
        }

        // api call to the open weather api. Does both the current and 5 day get requests in one function.
        function weatherCall(cityName){
            const apiKey = "c9b09d7b9d02160b7088c80cf4c4911d";
            // clear all divs 
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
                   .then( data => {
                       
                              let icon = data.weather[0].icon
                              let iconURL = "https://openweathermap.org/img/w/"+icon+".png";
                
                      
             
                           let currentWeatherDiv = 
                           '<p class="p" id="City">' + data.name +  '</p>'+
                           '<p class="p" id="Date">' +"Currently: " +'</p>'+
                           '<img src= '+iconURL+'></img>'+
                           '<p class="p"id="Temp">'+ "Temp: " + data.main.temp + " &deg;" + "C" +'</p>' +
                           '<p class="p" id="Wind">'+ "Wind Speed: " + data.wind.speed + " KM/H" +'</p>' +
                           '<p class="p" id="Humidity">'+ "Humidity: " + data.main.humidity + " %"+'</p>' 
        
                           $("#current").append(currentWeatherDiv)
                   })
                   //call the addCity function to add city to saved searches    
                   addCity(cityName)
                   // make api call with lon and lat for the 5 day forecast
                   fetch('https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat +  '&lon=' + lon + '&appid=c9b09d7b9d02160b7088c80cf4c4911d')
                   .then(res => res.json())
                   .then(data => {
                       
        
                        var icon = data.list[3].weather[0].icon
                        var iconURL = "https://openweathermap.org/img/w/"+icon+".png";
                       
                       let dayOneDiv = 
                       '<p class="p" id="DateOne">' + dayjs.unix(data.list[3].dt).format('DD MM YYYY')  +'</p>'+
                       '<img src= '+iconURL+'></img>'+
                       '<p class="p"id="IconOne">'+ "Temp: " + data.list[3].main.temp + " &deg;" + "C" +'</p>' +
                       '<p class="p" id="TempOne">'+ "Wind Speed: " + data.list[3].wind.speed + " KM/H" +'</p>' +
                       '<p class="p" id="HumidityOne">'+ "Humidity: " + data.list[3].main.humidity + " %"+'</p>' 
        
                       $("#dayOne").append(dayOneDiv)
        
                        var icon = data.list[11].weather[0].icon
                        var iconURL = "https://openweathermap.org/img/w/"+icon+".png";
                       let dayTwoDiv =
                       '<p class="p" id="DateOne">' + dayjs.unix(data.list[11].dt).format('DD MM YYYY')  +'</p>'+
                       '<img src= '+iconURL+'></img>'+
                       '<p class="p"id="IconOne">'+ "Temp: " + data.list[11].main.temp + " &deg;" + "C" +'</p>' +
                       '<p class="p" id="TempOne">'+ "Wind Speed: " + data.list[11].wind.speed + " KM/H" +'</p>' +
                       '<p class="p" id="HumidityOne">'+ "Humidity: " + data.list[11].main.humidity + " %"+'</p>' 
        
                       $('#dayTwo').append(dayTwoDiv)
        
                       var icon = data.list[19].weather[0].icon
                       var iconURL = "https://openweathermap.org/img/w/"+icon+".png";
                       let dayThreeDiv =
                       '<p class="p" id="DateOne">' + dayjs.unix(data.list[19].dt).format('DD MM YYYY')  +'</p>'+
                       '<img src= '+iconURL+'></img>'+
                       '<p class="p"id="IconOne">'+ "Temp: " + data.list[19].main.temp + " &deg;" + "C" +'</p>' +
                       '<p class="p" id="TempOne">'+ "Wind Speed: " + data.list[19].wind.speed + " KM/H" +'</p>' +
                       '<p class="p" id="HumidityOne">'+ "Humidity: " + data.list[19].main.humidity + " %"+'</p>' 
        
                       $('#dayThree').append(dayThreeDiv) 
        
                       var icon = data.list[27].weather[0].icon
                       var iconURL = "https://openweathermap.org/img/w/"+icon+".png";
                       let dayFourDiv =       
                       '<p class="p" id="DateOne">' + dayjs.unix(data.list[27].dt).format('DD MM YYYY')  +'</p>'+
                       '<img src= '+iconURL+'></img>'+
                       '<p class="p"id="IconOne">'+ "Temp: " + data.list[27].main.temp + " &deg;" + "C" +'</p>' +
                       '<p class="p" id="TempOne">'+ "Wind Speed: " + data.list[27].wind.speed + " KM/H" +'</p>' +
                       '<p class="p" id="HumidityOne">'+ "Humidity: " + data.list[27].main.humidity + " %"+'</p>' 
        
                       $('#dayFour').append(dayFourDiv)
        
                       var icon = data.list[35].weather[0].icon
                       var iconURL = "https://openweathermap.org/img/w/"+icon+".png";
                       let dayFiveDiv = 
                       '<p class="p" id="DateOne">' + dayjs.unix(data.list[35].dt).format('DD MM YYYY')  +'</p>'+
                       '<img src= '+iconURL+'></img>'+
                       '<p class="p"id="IconOne">'+ "Temp: " + data.list[35].main.temp + " &deg;" + "C" +'</p>' +
                       '<p class="p" id="TempOne">'+ "Wind Speed: " + data.list[35].wind.speed + " KM/H" +'</p>' +
                       '<p class="p" id="HumidityOne">'+ "Humidity: " + data.list[35].main.humidity + " %"+'</p>' 
        
                       $('#dayFive').append(dayFiveDiv)
           
             
                   })
                 })
             }

            //  call the display recent function to display cities saved in local storage
             displayRecent()
            

    console.log( "ready!" );
});
