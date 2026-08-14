console.log("Welcome to Spotify");

//Initialize the variable

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');  
let masterPlay = document.getElementById('masterPlay'); 
let myProgressBar = document.getElementById('MyProgressBar'); 
let gif = document.getElementById('gif'); 
let currentTimeEl = document.getElementById('currentTime');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"closer",filePath:"songs/1.mp3",coverPath:"covers/1.png"},
    {songName:"Saiyaara",filePath:"songs/2.mp3",coverPath:"covers/2.png"},
    {songName:"Tum Ho Toh",filePath:"songs/3.mp3",coverPath:"covers/3.png"},
    {songName:"Inaam",filePath:"songs/4.mp3",coverPath:"covers/4.png"},
    {songName:"Sahiba",filePath:"songs/5.mp3",coverPath:"covers/5.png"},
    {songName:"SUBEME LA RADIO",filePath:"songs/6.mp3",coverPath:"covers/6.png"},
    {songName:"Bailando",filePath:"songs/7.mp3",coverPath:"covers/7.png"},
    {songName:"Y QUE FUE",filePath:"songs/8.mp3",coverPath:"covers/8.png"},
]

songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
//audioElement.play()

//Handle play/pause click

let playIcon = document.getElementById('playIcon');
let pauseIcon = document.getElementById('pauseIcon');
masterPlay.addEventListener('click', () => {

    let playIcon = document.getElementById('playIcon');
    let pauseIcon = document.getElementById('pauseIcon');

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline-block';
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'inline-block';
        gif.style.opacity = 0;

    }

});
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress; 

    //update timer text
    let currentSeconds = Math.floor(audioElement.currentTime);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = currentSeconds % 60;
    currentTimeEl.innerText = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
});

myProgressBar.addEventListener('change' ,()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

document.getElementsByClassName('songitemcontainer')[0].addEventListener('click', function(e) {
    let target = e.target;
    let songItem = null;

    while (target && target !== this) {
        if (target.classList && target.classList.contains('songItem')) {
            songItem = target;
            break;
        }
        target = target.parentElement;
    }

    if (!songItem) return;

    songIndex = songItems.indexOf(songItem);
    playSongAtIndex();
});

const playSongAtIndex = () => {
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline-block';
    gif.style.opacity = 1;

    document.querySelector('.songinfo').innerHTML =
        `<img src="dancing.gif" width="42px" alt="" id="gif">${songs[songIndex].songName}`;

    makeAllPlays();
    let currentIcon = songItems[songIndex].getElementsByClassName('songItemPlay')[0];
    currentIcon.classList.remove('fa-play-circle');
    currentIcon.classList.add('fa-pause-circle');
}

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSongAtIndex();
});

audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSongAtIndex();
});


document.getElementById('prev').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSongAtIndex();
});
