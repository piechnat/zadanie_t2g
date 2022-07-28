const self = {};

let countdownCallback = () => {},
  targetDateSec,
  counterTimeout;

self.setCountdownCallback = function (callback) {
  countdownCallback = callback;
};

self.setCountdownTarget = function (seconds) {
  targetDateSec = Math.floor(new Date().getTime() / 1000) + seconds;
  clearInterval(counterTimeout);
  engine();
};

function engine() {
  const nowMs = new Date().getTime();
  const secondsLeft = targetDateSec - Math.floor(nowMs / 1000);
  if (secondsLeft >= 0) {
    countdownCallback(secondsLeft);
    counterTimeout = setTimeout(engine, 1000 - (nowMs % 1000));
  }
}

export { self as CounterEngine };
