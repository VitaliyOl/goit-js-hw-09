import { Report } from 'notiflix/build/notiflix-report-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  calendarInput: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

const DELAY = 1000;
let intervalId = null;
let chooseTime = null;
let currentTime = null;
let startBtn = refs.startBtn.disabled;

startBtn = true;

flatpickr(refs.calendarInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      Report.warning('Sorry', '"Please choose a date in the future"');
    } else {
      startBtn = false;
    }

    refs.startBtn.addEventListener('click', onStart);

    function onStart() {
      chooseTime = selectedDates[0].getTime();
      startBtn = true;
      timer.start();
    }
  },
});

const timer = {
  start() {
    intervalId = setInterval(() => {
      currentTime = Date.now();

      const deltaTime = chooseTime - currentTime;
      const timeComponents = convertMs(deltaTime);

      updateTimeContent(timeComponents);

      if (deltaTime <= 0) {
        stop();
        return;
      }
    }, DELAY);
  },
};

function stop() {
  clearInterval(intervalId);
  intervalId = null;
  startBtn = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimeContent({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
