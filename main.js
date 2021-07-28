const keypad = document.querySelector('#keypad');
const audioBar = document.querySelector('#audio');

const letters = 'a,s,d,f,g,h,j,k,l'.split(',');
const audioUrls = 'boom,hihat,openhat,snare,tom,clap,kick,ride,tink'
  .split(',')
  .map((e) => './assests/sounds/' + e + '.wav');

const audioDivs = [];
const keyDivs = [];

init();

window.addEventListener('keydown', main);

function main(e) {
  let keypressed = null;
  let keyDiv = null;

  if (letters.includes(e.target.textContent)) {
    keyDiv = e.target;
    keypressed = e.target.textContent;
  } else {
    keypressed = String.fromCharCode(e.keyCode).toLowerCase();
    keyDiv = keyDivs.find((div) => {
      return div.getAttribute('data-key')== keypressed;
    });
  }
  const file = audioDivs.find((div) => {
    return div.getAttribute('data-key')== keypressed;
  });

  if (!file) return;
  
  playTone(file, keyDiv);
}

function init() {
  for (let i = 0; i < letters.length; i++) {
    generateDiv(keypad, letters[i]);
    generateAudio(audioBar, letters[i], i);
  }

  function generateDiv(parent, letter) {
    const key = document.createElement('div');
    key.classList.toggle('key');
    key.setAttribute('data-key', letter);
    key.innerText = letter;
    key.addEventListener('click', main);
    keyDivs.push(key);
    parent.appendChild(key);
  }
  function generateAudio(parent, letter, id) {
    const file = document.createElement('audio');
    file.setAttribute('data-key', letter);
    file.setAttribute('src', audioUrls[id]);
    audioDivs.push(file);
    parent.appendChild(file);
  }
}

function playTone(file, key) {
  file.currentTime = 0;
  file.play();
  key.classList.add('play');
  setTimeout(() => {
    key.classList.remove('play');
  }, 100);
}
