const weatherData = {
    '☀️': {audio: 'assets/sounds/summer.mp3', photo: 'assets/summer-bg.jpg'},
    '❄️': {audio: 'assets/sounds/winter.mp3', photo: 'assets/winter-bg.jpg'},
    '🌧': {audio: 'assets/sounds/rain.mp3', photo: 'assets/rainy-bg.jpg'}
};

document.querySelectorAll(".but").forEach(function (weather){
    weather.addEventListener("click", function () {
        document.body.style.backgroundImage = `url('${weatherData[this.innerHTML].photo}')`;
        var audio = new Audio(weatherData[this.innerHTML].audio);
        audio.play();
    })
})
