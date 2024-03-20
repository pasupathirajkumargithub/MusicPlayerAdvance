const allsongs = document.querySelector(".allsongs");
import songs from "./data.js";

const markUp = `${songs.map((song) => {
  return `
  <div class="singlesong">
  
<div class="listimg"><i class="fa-solid fa-bars-staggered"></i></div>
<div class="songimg">
  <img src=${song.cover} alt="" />
</div>
<div class="songname active">${song.name}</div>
<div class="songduration"></div>
<div class="songartist">${song.artist}</div>
<div class="songyear">${song.year}</div>
</div>`;
})}`;

const musicElement = markUp.replaceAll(",", "");

allsongs.innerHTML = "";

allsongs.insertAdjacentHTML("afterbegin", musicElement);
