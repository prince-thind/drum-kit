const keypad = document.querySelector("#keypad");
const audioBar = document.querySelector("#audio");

const letters = "a,s,d,f,g,h,j,k,l".split(",");
const audioUrls = "boom,hihat,openhat,snare,tom,clap,kick,ride,tink"
  .split(",")
  .map((e) => "./assests/sounds/" + e + ".wav");

const audioDivs = [];
const keyDivs = [];

window.addEventListener("keydown", main);

for (let i = 0; i < letters.length; i++) {
  generateDiv(keypad, letters[i]);
  generateAudio(audioBar, letters[i], i);
}

function generateDiv(parent, letter) {
  const key = document.createElement("div");
  key.classList.toggle("key");
  key.setAttribute("data-key", letter);
  key.innerText = letter;
  keyDivs.push(key);
  key.addEventListener("transitionend", removetransition);
  parent.appendChild(key);
}
function generateAudio(parent, letter, id) {
  const file = document.createElement("audio");
  file.setAttribute("data-key", letter);
  file.setAttribute("src", audioUrls[id]);
  audioDivs.push(file);
  parent.appendChild(file);
}

function main(e) {
  const keypressed = String.fromCharCode(e.keyCode).toLowerCase();

  let file = audioDivs.find((tag) => {
    return tag.attributes["data-key"].value == keypressed;
  });
  let key = keyDivs.find((tag) => {
    return tag.attributes["data-key"].value == keypressed;
  });
  if (!file) return;
  playTone(file, key);
}

function playTone(file, key) {
  file.currentTime = 0;
  file.play();
  key.classList.add("play");
}
function removetransition(e) {
  if (e.propertyName == "transform") {
    e.target.classList.remove("play");
  }
}
