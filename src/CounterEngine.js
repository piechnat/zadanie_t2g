const self = {};

let countdownCallback = () => {},
  counterDateSec,
  counterTimeout;

self.setCountdownCallback = function (callback) {
  countdownCallback = callback;
};

self.setCountdownValue = function (seconds) {
  counterDateSec = Math.floor(new Date().getTime() / 1000) + seconds;
  clearInterval(counterTimeout);
  engine();
};

function engine() {
  const nowMs = new Date().getTime();
  const secondsLeft = counterDateSec - Math.floor(nowMs / 1000);
  if (secondsLeft >= 0) {
    countdownCallback(secondsLeft);
    counterTimeout = setTimeout(engine, 1000 - (nowMs % 1000));
  }
}

export { self as CounterEngine };
