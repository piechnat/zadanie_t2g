import $ from "jquery";
import * as bootstrap from "bootstrap";
import "./styles.scss";
import body from "./body.html";
import { dateFmt } from "./utils";
import { CounterEngine } from "./CounterEngine";

$(document.body).prepend(body);

const SEC_IN_DAY = 24 * 60 * 60;
const SEC_IN_HOUR = 60 * 60;

const $formDate = $("#form-date");
const $formTime = $("#form-time");
const randomDate = new Date(new Date().getTime() + Math.floor(Math.random() * SEC_IN_DAY * 1000));

$formDate.val(dateFmt(randomDate, "RRRR-MM-DD"));
$formTime.val(dateFmt(randomDate, "GG:II"));

const $counterDivs = $("#counter > div");

function updateCounter() {
  [].slice.call(arguments).forEach((arg, n) => ($counterDivs[n].innerText = arg));
}

CounterEngine.setCountdownCallback((secondsLeft) => {
  let seconds = secondsLeft;
  const days = Math.floor(seconds / SEC_IN_DAY);
  seconds -= days * SEC_IN_DAY;
  const hours = Math.floor(seconds / SEC_IN_HOUR);
  seconds -= hours * SEC_IN_HOUR;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  if (secondsLeft < SEC_IN_DAY) {
    updateCounter(hours, minutes, seconds, "hours", "minutes", "seconds");
  } else {
    updateCounter(days, hours, minutes, "days", "hours", "minutes");
  }
});

$("#input-form").on("submit", (e) => {
  const selDateMs = new Date($formDate.val() + " " + $formTime.val()).getTime();
  CounterEngine.setCountdownValue(Math.ceil((selDateMs - new Date().getTime()) / 1000));
  return false;
});
