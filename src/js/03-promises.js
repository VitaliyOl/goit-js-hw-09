import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  timeout: 5000,
};

const refs = {
  form: document.querySelector('.form'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const timeDelay = delay;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, timeDelay);
  });
}

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const { delay, amount, step } = e.currentTarget.elements;
  let firstDelay = Number(delay.value);
  let amountPosition = Number(amount.value);
  let delayStep = Number(step.value);

  for (let amount = 1; amount <= amountPosition; amount += 1) {
    createPromise(amount, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          options
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          options
        );
      });

    firstDelay += delayStep;
  }
}
