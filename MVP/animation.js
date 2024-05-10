const animationTarget = document.getElementById('animation');

const talkFiles = [
  '/animation-files/talking/talk_0.png',
  '/animation-files/talking/talk_1.png',
  '/animation-files/talking/talk_2.png'
];

const smileFiles = [

];

// https://stackoverflow.com/a/60280239/2710227
const preloadImage = src => 
  new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = resolve
    image.onerror = reject
    image.src = src
  })


// Preload an image
talkFiles.forEach(file => preloadImage('./' + file));

let stopAnimation = true;
let talkStep = 0;

const animateSpeech = () => {
  if (!stopAnimation) {
    if (talkStep < talkFiles.length - 1) {
      talkStep += 1;
    } else {
      talkStep = 0;
    }

    animationTarget.src = './' + talkFiles[talkStep];

    setTimeout(() => {
      animateSpeech();
    }, 250);
  }
}

// stopAnimation = false;

// setTimeout(() => {
//   stopAnimation = true;
// }, 3000);

// animateSpeech();