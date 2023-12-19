let bgColor;
let fontColor;
const clockWrapper = document.getElementsByClassName("clock__wrapper")[0];
const body = document.querySelector("body");

const clockColor = document.getElementById("clock__color__picker");
const bodyColor = document.getElementById("bg__color__picker");
const fontPicker = document.querySelectorAll(".font__section input");
const settingBtn = document.getElementsByClassName('settings_ico')[0];
const settingsPanel = document.getElementsByClassName('settings__wrapper')[0];
const settingsSection = document.getElementsByClassName('settings__section')[0];
const overlay = document.getElementsByClassName('overlay')[0];

const settings = {
  fontColor: "#000000",
  bgColor: "#ffffff",
  font: "pentagra",
};
const settingsCookies = getCookies("settings");

settingsPanel.style.bottom = -settingsSection.offsetHeight + 'px';

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
settingBtn.addEventListener('click', function(){
  settingsPanel.style.bottom = 0;
});
overlay.addEventListener('click',function(){
  settingsPanel.style.bottom = -settingsSection.offsetHeight + 'px';
})

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

/**
 * Получает значение из указанной куки по заданному параметру.
 * @param {string} cookieName - Имя куки, из которой нужно получить значение.
 * @param {string} param - Параметр, значение которого нужно извлечь из куки.
 * @returns {any} - Значение параметра из куки. Если кука или параметр не найдены, возвращает null.
 */
function getMyCookie(cookieName, param) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, setting] = cookie.split('=');
    if (name === cookieName) {
      const cookieInObj = JSON.parse(setting);
      if (cookieInObj.hasOwnProperty(param)) {
        return cookieInObj[param];
      }
    }
  }
  // Вернуть что-то по умолчанию или null, если кука или ключ не найдены.
  return null;
}