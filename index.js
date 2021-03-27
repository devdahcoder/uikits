import {API_KEY} from "./config.js";

window.addEventListener("load", () => {
    let weatherCardIcon = document.querySelector(".weather-card-icon");
    let weatherCardStateText = document.querySelector(".weather-card-state-text");
    let weatherCardDegreeText = document.querySelector(".weather-card-degree-text");
    let weatherCardMainText = document.querySelector(".weather-card-main-text");


    // weather icon condition
    const weatherIcon = (icon) => {
        switch (icon) {
            case "Clouds":
                weatherCardIcon.src = "./assets/images/cloudy.svg";
                break;
            case "Sunny":
                weatherCardIcon.src = "./assets/images/sun.svg";
                break;
        
            default:
                return icon;
                break;
        }
    }


    // location getter
    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            let url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                const { name, clouds, weather } = data;

                weatherIcon(weather[0].main);
                weatherCardStateText.textContent = name;
                weatherCardDegreeText.textContent = clouds.all;
                weatherCardMainText.textContent = weather[0].main;
              })
              .catch((error) => {
                console.log("Something went wrong");
                console.log(error);
              });
            },
            () => {
                console.log("your browser does not support it");
            }
        );
        
    }

    getUserLocation();
});