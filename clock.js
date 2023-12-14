const bgColor = 'white';
const fontColor = 'black';

const body = document.querySelector('body');
body.style.background = bgColor;
body.style.color = fontColor;

setInterval(function(){
  const date = new Date();

  let hour = date.getHours();
  if (hour < 10) hour = "0" + hour;

  let minute = date.getMinutes();
  if (minute < 10) minute = "0" + minute;

  const milSec = date.getMilliseconds();

  const hourText = document.getElementById("hour");
  const minuteText = document.getElementById("minute");
  const dotColor = document.getElementById("dot");

  hourText.textContent = hour;
  minuteText.textContent = minute;

  if (milSec < 500) {
    dotColor.style.color = bgColor;
  } else {
    dotColor.style.color = fontColor;
  }
}, 500);
