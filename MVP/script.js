const playBtn = document.getElementById('play');
const textArea = document.getElementById('text');

// state
let playing = false;
let voices;

playBtn.addEventListener('click', () => {
  const text = textArea.value;

  if (!text) { alert('No text!'); return; }
  if (playing) return;

  webTts(text);
});

const webTts = (text) => {
  playing = true;

  say(text);

  playing = false;
}

// https://mdn.github.io/web-speech-api/speak-easy-synthesis/
// note speech will not work until user interacts with the page like clicking on allow notifications
// the interaction is the clicking of the page itself, the allow notification button is for setting the notifications
const say = (msg) => {
  let speech = ""; // append to 300 chars

  if (msg.length > 300) {
    msg.split(' ').forEach(msgChunk => {
      if ((speech.length + 1 + msgChunk.length) < 300) {
        speech += msgChunk + ' ';
      }
    });
  } else {
    speech = msg;
  }

  stopAnimation = false;

  const utterance = new SpeechSynthesisUtterance(speech);
  utterance.voice = voices[4]; // can dump voices to pick
  speechSynthesis.speak(utterance);
  animateSpeech();
  setTimeout(() => {
    stopAnimation = true;
  }, 10000);
  // speechSynthesis.cancel(); // this means it iwll not say it all
}

// get voices on load
window.speechSynthesis.onvoiceschanged = function() {
  const synth = window.speechSynthesis;
  voices = synth.getVoices();
}
