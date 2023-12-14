let bgColor = 'white';
let fontColor = 'black';
const clockWrapper = document.getElementsByClassName('clock__wrapper')[0];
const body = document.querySelector('body');

body.style.background = bgColor;
body.style.color = fontColor;

const clockColor = document.getElementById('clock__color__picker');
const bodyColor = document.getElementById('bg__color__picker');
const fontPicker = document.querySelectorAll('.font__section input');

setInterval(function () {
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

clockColor.addEventListener('change', function (event) {
  fontColor = event.target.value;
  clockWrapper.style.color = fontColor;
})

bodyColor.addEventListener('change', function (event) {
  bgColor = event.target.value;
  body.style.background = bgColor;
})

for(let i = 0; i < fontPicker.length; i++){
  fontPicker[i].addEventListener('change', function(event){
    clockWrapper.style.fontFamily = event.target.value;
  })
}