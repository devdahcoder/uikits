import {API_KEY} from "./config.js";

window.addEventListener("load", () => {
    let weatherCardIcon = document.querySelector(".weather-card-icon");
    let weatherCardStateText = document.querySelector(".weather-card-state-text");
    let weatherCardDegreeText = document.querySelector(".weather-card-degree-text");
    let weatherCardMainText = document.querySelector(".weather-card-main-text");
    let sliderInput = document.querySelector(".music-player-card-slider");
    let progressBar = document.querySelector(".music-card-progress-fill");
    let playingBanner = document.querySelector(".music-player-card-image");
    let playBtn = document.querySelector(".music-card-control-play");
    let artistName = document.querySelector(".music-player-card-artist-name");
    let songName = document.querySelector(".music-player-card-song-name");
    let songDurationStart = document.querySelector(".music-player-card-duration-start");
    let songDurationEnd = document.querySelector(".music-player-card-duration-end");
    let playOrPauseIcon = document.querySelector(".music-card-control-play-icon");
    let nextBtn = document.querySelector(".music-card-player-control-next-btn");
    let prevBtn = document.querySelector(".music-card-player-control-prev-btn");
    let forwardBtn = document.querySelector(".music-card-player-control-forward-btn");
    let reverseBtn = document.querySelector(".music-card-player-control-reverse-btn");
    let mainAudio = new Audio();
    let count = 1;
    const songList = [
      {
          id: 1,
          path: "./assets/music/Olamide_-_Owo_Shayo_(prod__Pheelz).mp3",
          image: "https://images.pexels.com/photos/4407688/pexels-photo-4407688.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          artist: "Dele Alade",
          song: "The Prime"
      },
      {
          id: 2,
          path: "./assets/music/Olamide_Ft_Wizkid_Kana_9jaflaver.com_.mp3",
          image: "https://images.pexels.com/photos/1881773/pexels-photo-1881773.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          artist: "Alex Jide",
          song: "The of the guru"
      },
      {
          id: 3,
          path: "./assets/music/Olamide_-_Wo__codedwap.com.mp3",
          image: "https://images.pexels.com/photos/1918160/pexels-photo-1918160.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          artist: "Egbon Ade",
          song: "Get it done"
      }
  ]

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

    const playMedia = () => {
      mainAudio.src = songList[count].path;
      playingBanner.src = songList[count].image;
      artistName.textContent = songList[count].artist;
      songName.textContent = songList[count].song;

      mainAudio.play();
    }

    playBtn.addEventListener("click", () => {
      if (mainAudio.paused) {
        mainAudio.play();
        playOrPauseIcon.src = "./assets/images/pause.svg";
      }
      else {
        mainAudio.pause();
        playOrPauseIcon.src = "./assets/images/play.svg";
      }
    })

    mainAudio.addEventListener("timeupdate", () => {
      let position = mainAudio.currentTime / mainAudio.duration;
      sliderInput.value = position * 100;
      progressBar.style.width = sliderInput.value + "%";
    })

    sliderInput.addEventListener("mousedown", (e) => {
      let d = e.clientX - e.target.offsetLeft;
      mainAudio.currentTime = (d / e.target.offsetWidth) * mainAudio.duration;
      progressBar.style.width = sliderInput.value + "%";
    })

    mainAudio.addEventListener("timeupdate", () => {
      let currentMinute = Math.floor(mainAudio.currentTime / 60);
      let currentSecond = Math.floor(mainAudio.currentTime % 60);
      let endMinute = Math.floor(mainAudio.duration / 60);
      let endSecond = Math.floor(mainAudio.duration % 60);

      songDurationStart.textContent = `${currentMinute}:${currentSecond <= 9 ? "0" : ""}${currentSecond}`
      songDurationEnd.textContent = `${endMinute}:${endSecond}`
    })


    nextBtn.addEventListener("click", () => {
      count++;
      if (count > 2) {
        count = 0;
      }
      mainAudio.src = songList[count].path;
      artistName.textContent = songList[count].artist;
      songName.textContent = songList[count].song;

      playMedia();
    })


    prevBtn.addEventListener("click", () => {
      count--;
      if (count < 0) {
        count = 2;
      }
      mainAudio.src = songList[count].path;
      artistName.textContent = songList[count].artist;
      songName.textContent = songList[count].song;

      playMedia();
    })

    


    getUserLocation();
    playMedia();
});