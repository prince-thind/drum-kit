const keypad = document.querySelector("#keypad");
const audioBar = document.querySelector("#audio");

const sounds = {};

document.addEventListener("keydown", playPressedKey);
keypad.addEventListener("click", playClicked);

init();

function init() {
  const letters = "a,s,d,f,g,h,j,k,l".split(",");
  const audioUrls = "boom,hihat,openhat,snare,tom,clap,kick,ride,tink"
    .split(",")
    .map((e) => "./assets/sounds/" + e + ".wav");

  for (let i = 0; i < letters.length; i++) {
    const keyDiv = generateDiv(keypad, letters[i]);
    const audioDiv = generateAudio(audioBar, audioUrls[i]);
    addSound(letters[i], keyDiv, audioDiv);
  }

  function addSound(letter, div, audio) {
    sounds[letter] = { div, audio };
  }

  function generateDiv(parent, letter) {
    const key = document.createElement("div");
    key.classList.toggle("key");
    key.innerText = letter;
    parent.appendChild(key);
    return key;
  }
  function generateAudio(parent, src) {
    const audioElement = document.createElement("audio");
    audioElement.setAttribute("src", src);
    parent.appendChild(audioElement);
    return audioElement;
  }
}

function playClicked(e) {
  const element = e.target;
  const pressed = element.textContent;
  const audioElement = sounds[pressed]?.audio;
  const keyElement = sounds[pressed]?.div;
  playTone(audioElement, keyElement);
}

function playPressedKey(e) {
  const element = e.target;
  const pressed = String.fromCharCode(e.keyCode).toLowerCase();
  const audioElement = sounds[pressed]?.audio;
  const keyElement = sounds[pressed]?.div;
  playTone(audioElement, keyElement);
}

function playTone(audioElement, key) {
  if (!audioElement) return;
  audioElement.currentTime = 0;
  audioElement.play();
  key.classList.add("play");
  setTimeout(() => {
    key.classList.remove("play");
  }, 100);
}
