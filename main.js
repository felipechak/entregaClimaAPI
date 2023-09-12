document.addEventListener("DOMContentLoaded",()=>{
    const openWeatherAPIKey = "c86c0f7d64de1081b5206e39c0598a18"
    let searchInput = document.getElementById("searchInput")
    let cardContainer = document.getElementById("cardContainer")
    
    const getWeather = async (name) => {
        cardContainer.innerHTML = ""  
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${openWeatherAPIKey}`
          let response = await getJSONData(url)
          console.log(response)
          let cardText = getCardHTML(response.data.name, response.data.weather[0].main, response.data.wind.speed, Math.round(response.data.main.temp),response.data.main.humidity)
          cardContainer.innerHTML = cardText
          return response
      }
    const getCardHTML = (cityName,forecast,wind,temp,humidity,) => {
        return `<div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-8 col-lg-6 col-xl-4">
                  <div class="card" style="color: #4B515D; border-radius: 35px;">
                    <div class="card-body p-4">
                      <div class="d-flex">
                        <h6 class="flex-grow-1">${cityName}</h6>
                      </div>
                      <div class="d-flex flex-column text-center mt-5 mb-4">
                        <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;"> ${temp} °C </h6>
                        <span class="small" style="color: #868B94">${forecast}</span>
                      </div>
                      <div class="d-flex align-items-center">
                        <div class="flex-grow-1" style="font-size: 1rem;">
                          <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i>
                            <span class="ms-1">${wind} km/</span></div>
                        <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1"> ${humidity}% </span>
                        </div>`
    }

    let getJSONData = function(url){
        let result = {};
        return fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }else{
            throw Error(response.statusText);
          }
        })
        .then(function(response) {
              result.status = 'ok';
              result.data = response;
              return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
    }

    let searchTerm = "Paris"

    

    document.getElementsByTagName("button")[0].addEventListener("click", ()=>{
      getWeather(document.getElementById("searchInput").value)
    });
})