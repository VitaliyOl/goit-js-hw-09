const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
const DELAY = 1000;
let timerId = null;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStart);
refs.stopBtn.addEventListener('click', onStop);

function onStart() {
  refs.stopBtn.disabled = false;
  refs.startBtn.disabled = true;

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
}

function onStop() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;

  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
