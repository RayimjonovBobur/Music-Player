const container = document.getElementById("container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const start = document.getElementById("start");
const end = document.getElementById("end");
const progresCont = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// all snongs
const songs = [
  "Буйно голова (Gio Pika)",
  "Колыбельная (Jah Khalib)",
  "Комета (Jony)",
  "Ты мой кайф (Ty moy kayf)",
  "Bad Boy (feat. Luana Kiara)",
  "Jackpot (Mr Lambo)",
  "Memories(Xcho)",
  "Дай мне огня(Xcho)",
];

let indexSong = 6;

loadSong(songs[indexSong]);

// show song info about
function loadSong(song) {
  title.textContent = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play Songs
function playSong() {
  container.classList.add("play");
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  audio.play();
}

// Pause Songs
function pauseSong() {
  container.classList.remove("play");
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  audio.pause();
}

// next Songs
function nextSong() {
  indexSong++;
  if (indexSong > songs.length - 1) {
    indexSong = 0;
  }
  loadSong(songs[indexSong]);
  playSong();
}

function prevSong() {
  indexSong--;
  if (indexSong < 0) {
    indexSong > songs.length - 1;
  }
  loadSong(songs[indexSong]);
  playSong();
}

// setProgress
function setProgress(e) {
  // duration
  const { currentTime, duration } = e.srcElement;
  const currentTimeMusic = currentTime;
  const durationMusic = duration;
  const progressPreesent = (currentTimeMusic / durationMusic) * 100;
  progress.style.width = `${progressPreesent}%`;

  // end
  let minutes = Math.floor(durationMusic / 60);
  let seconds = Math.floor(durationMusic % 60);
  end.textContent = `${minutes}:${(seconds =
    seconds < 10 ? "0" + seconds : seconds)}`;

  // start
  let currentMinutes = Math.floor(currentTimeMusic / 60);
  let currentSeconds = Math.floor(currentTimeMusic % 60);
  start.textContent = `${currentMinutes}:${(currentSeconds =
    currentSeconds < 10 ? "0" + currentSeconds : currentSeconds)}`;
}

function setProgressTime(e) {
  const width = this.clientWidth;
  const clientX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clientX / width) * duration;
}

// events
playBtn.addEventListener("click", () => {
  const isPlaying = container.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", setProgress);
progresCont.addEventListener("click", setProgressTime);
audio.addEventListener("ended", nextSong);
