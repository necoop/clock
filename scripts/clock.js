let bgColor;
let fontColor;
const clockWrapper = document.getElementsByClassName("clock__wrapper")[0];
const body = document.querySelector("body");

const clockColor = document.getElementById("clock__color__picker");
const bodyColor = document.getElementById("bg__color__picker");
const fontPicker = document.querySelectorAll(".font__section input");

const settings = {
  fontColor: "#000000",
  bgColor: "#ffffff",
  font: "pentagra",
};
const settingsCookies = getCookies("settings");

if (settingsCookies !== undefined) {
  fontColor = settingsCookies.fontColor;
  clockWrapper.style.color = fontColor;
  clockColor.value = fontColor;
  settings.fontColor = fontColor;

  bgColor = settingsCookies.bgColor;
  body.style.background = bgColor;
  bodyColor.value = bgColor;
  settings.bgColor = bgColor;

  font = settingsCookies.font;
  clockWrapper.style.fontFamily = font;
  for (let i = 0; i < fontPicker.length; i++) {
    if (fontPicker[i].value === settingsCookies.font) {
      fontPicker[i].checked = true;
      settings.font = settingsCookies.font;
    }
  }
} else {
  clockWrapper.style.color = settings.fontColor;
  clockColor.value = settings.fontColor;
  body.style.background = settings.bgColor;
  bodyColor.value = settings.bgColor;
  clockWrapper.style.fontFamily = settings.font;
  for (let i = 0; i < fontPicker.length; i++) {
    if (fontPicker[i].value === settings.font) {
      fontPicker[i].checked = true;
    }
  }
  document.cookie = `settings=${JSON.stringify(settings)}; max-age=31536000`;
}

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

clockColor.addEventListener("change", function (event) {
  fontColor = event.target.value;
  clockWrapper.style.color = fontColor;
  settings.fontColor = fontColor;
  document.cookie = `settings=${JSON.stringify(settings)}; max-age=31536000`;
});

bodyColor.addEventListener("change", function (event) {
  bgColor = event.target.value;
  body.style.background = bgColor;
  settings.bgColor = bgColor;
  document.cookie = `settings=${JSON.stringify(settings)}; max-age=31536000`;
});

for (let i = 0; i < fontPicker.length; i++) {
  fontPicker[i].addEventListener("change", function (event) {
    clockWrapper.style.fontFamily = event.target.value;
    settings.font = event.target.value;
    document.cookie = `settings=${JSON.stringify(settings)}; max-age=31536000`;
  });
}

function getCookies(cookieName) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === cookieName) {
      return JSON.parse(value); // Возвращаем внутренний объект с данными
    }
  }

  // Если кука не найдена, возвращаем undefined
  return undefined;
}
function getMyCookie(cookieName, settingName) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, setting] = cookie.split('=');
    if (name === cookieName) {
      const cookieInObj = JSON.parse(setting);
      if (cookieInObj.hasOwnProperty(settingName)) {
        return cookieInObj[settingName];
      }
    }
  }
  // Вернуть что-то по умолчанию или null, если кука или ключ не найдены.
  return null;
}

console.log(getMyCookie('settings', 'fontColor'));