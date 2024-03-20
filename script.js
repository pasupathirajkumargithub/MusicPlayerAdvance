import songs from "./data.js";

const music = document.getElementById("audio-source");
const seekBar = document.querySelector(".music-seek-bar");
const songName = document.querySelector(".songplayname");
const artistName = document.querySelector(".songplayartist");
const coverImg = document.querySelector(".coverImg");
const currentMusicTime = document.querySelector(".starttime");
const musicDuration = document.querySelector(".endtime");
const playBtn = document.querySelector(".playbtn");
const pauseBtn = document.querySelector(".pausebtn");
const backwardBtn = document.querySelector(".backwardbtn");
const forwardBtn = document.querySelector(".forwardbtn");
const repeatoneBtn = document.querySelector(".repeatonebtn");
const suffuleBtn = document.querySelector(".shuffulbtn");
const musicVolume = document.querySelector(".volume-seek-bar");
const queue = [...document.querySelectorAll(".singlesong")];
const songDuration = [...document.querySelectorAll(".songduration")];
const playbackBtn = document.querySelector(".playback");
const ModalArtistName = document.querySelector(".modal-artist-name");
const modalImg = document.querySelector(".modalimage");
const closeModal = document.querySelector(".closemodal");
const ModalWindow = document.querySelector(".modalwin");
const overwiew = document.querySelector(".overview");
const followers = document.querySelector(".count1");
const MonthlyListenner = document.querySelector(".count2");

let repeatsong = false;
let suffluesong = false;
let currentMusic = 0;
let playbackSpeed = 1;

playBtn.addEventListener("click", () => {
  music.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", () => {
  music.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

const setMusic = (i) => {
  currentMusic = i;
  seekBar.value = 0;
  let song = songs[i];
  music.src = song.path;
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  coverImg.src = song.cover;

  coverImg.addEventListener("click", () => {
    ModalWindow.classList.remove("hide");
    overwiew.classList.remove("hide");
    modalImg.src = song.cover;
    ModalArtistName.innerHTML = song.artist;
  });

  setTimeout(() => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formteTime(music.duration);
  }, 300);
  currentMusicTime.innerHTML = "00 : 00";
  queue.forEach((item) => {
    item.children[2].classList.remove("active");
  });

  queue[i].children[2].classList.add("active");
};

const formteTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) min = `0` + min;

  let sec = Math.floor(time % 60);
  if (sec < 10) sec = `0` + sec;

  return `${min} : ${sec}`;
};

seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value;
});

setMusic(currentMusic);

forwardBtn.addEventListener("click", () => {
  if (suffluesong) {
    currentMusic = Math.floor(Math.random() * songs.length);
  } else {
    currentMusic >= songs.length - 1 ? (currentMusic = 0) : currentMusic++;
  }
  setMusic(currentMusic);
  playBtn.click();
});

backwardBtn.addEventListener("click", () => {
  if (suffluesong) {
    currentMusic = Math.floor(Math.random() * songs.length) + 1;
  } else {
    currentMusic <= 0 ? (currentMusic = songs.length - 1) : currentMusic--;
  }

  setMusic(currentMusic);
  playBtn.click();
});

repeatoneBtn.addEventListener("click", () => {
  repeatoneBtn.classList.toggle("active");
  repeatsong = repeatsong ? false : true;
});
suffuleBtn.addEventListener("click", () => {
  suffuleBtn.classList.toggle("active");
  suffluesong = suffluesong ? false : true;
});

musicVolume.addEventListener("change", () => {
  music.volume = musicVolume.value;
});

setInterval(() => {
  seekBar.value = music.currentTime;
  currentMusicTime.innerHTML = formteTime(music.currentTime);
  musicDuration.innerHTML =
    `-` + formteTime(music.duration - music.currentTime);
  music.playbackRate = playbackSpeed;

  if (Math.floor(music.duration) === Math.floor(seekBar.value)) {
    if (repeatsong) {
      setMusic(currentMusic);
      playBtn.click();
    } else {
      forwardBtn.click();
    }
  }
}, 510);

playbackBtn.addEventListener("change", (e) => {
  playbackSpeed = e.target.value;
});

queue.forEach((item, i) => {
  let audio = new Audio();
  audio.src = songs[i].path;
  setTimeout(() => {
    songDuration[i].innerHTML = formteTime(audio.duration);
  }, 500);

  item.addEventListener("click", () => {
    setMusic(i);
    playBtn.click();
  });
});

closeModal.addEventListener("click", () => {
  ModalWindow.classList.add("hide");
  overwiew.classList.add("hide");
});

ModalWindow.addEventListener("click", () => {
  closeModal.click();
});

let playing = false;
document.addEventListener("keyup", function (e) {
  if (e.key === " ") {
    playing ? pauseBtn.click() : playBtn.click();
    playing = !playing;
  }
  e.key === "Escape" && closeModal.click();
});

let random = () => {
  return Math.floor(Math.random() * 99999) + 11111;
};
function updatefollower() {
  followers.innerHTML = random();
  MonthlyListenner.innerHTML = random();
}
updatefollower();

setInterval(() => {
  updatefollower();
}, 1000 * 30);
