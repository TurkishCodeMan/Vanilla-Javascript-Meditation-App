
const video = document.querySelector(".video-container video");
const play = document.querySelector(".play")//Play ;
const sounds = document.querySelector(".weather-container button");
const song = document.querySelector(".song")
const timeDisplay = document.querySelector(".time-display")
const outline = document.querySelector(".moving-outline circle");

//Select Type
const rainButton = document.querySelector(".song-rain");
const beachButton = document.querySelector(".song-beach");


//Time Buttons
const timers = document.querySelectorAll(".timers")

let timer = 120;
let total = outline.getTotalLength();
outline.style.strokeDasharray = total;
outline.style.strokeDashoffset = total;

const app = () => {
    video.currentTime = 2;
    song.currentTime = 3
    play.addEventListener("click", () => {
        checkPlaying(song);
    })
    console.log(timers)
    timers.forEach(element => {

        element.addEventListener('click', function () {
            song.currentTime = 3;
            video.currentTime = 2;
            song.pause();
            video.pause();

            timer = this.getAttribute('data-time')
            timeDisplay.textContent = `${(Math.floor(timer / 60))}:${Math.floor(timer % 60)}`;
        })
    });


    beachButton.addEventListener('click', () => {
        song.src = "./sounds/sahil.mp3";
        video.src = "./videos/beach.mp4"
    })

    rainButton.addEventListener('click', () => {
        song.src = "./sounds/akarsu.mp3";
        video.src = "./videos/rain.mp4"

        video.currentTime = 2;
        song.currentTime = 3

    })
}
app();


//Progress And Second & Mınutes
video.ontimeupdate = () => {
    let currentTime = video.currentTime;
    let elapsed = timer - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;

    let progress = total - (currentTime / timer) * total;
    outline.style.strokeDashoffset = progress;

    if (Math.floor(currentTime) >= Math.floor(video.duration)) {
        video.currentTime = 0;

        if (video.paused) {
            video.play();
            console.log("Buradaaa")
        }
    }
    if (currentTime > timer) {

        song.pause();
        video.pause();
        song.currentTime = 0;
        play.src = './pause.svg'
    }

}




//Check Play
const checkPlaying = () => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = "./play.svg"
    } else {
        song.pause();
        video.pause();
        play.src = "./pause.svg"
    }
}

