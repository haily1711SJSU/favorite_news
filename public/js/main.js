const darkBtn = document.querySelector("#darkBtn");
const lightBtn = document.querySelector("#lightBtn");
const root = document.querySelector(":root");
const lightDarkModeBtn = document.querySelector(".settings");

// runs the current theme every time a new page is rendered
const defaultTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    darkTheme(root);
  } else {
    lightTheme(root);
  }
};
defaultTheme();

// toggle dark and light mode menu
lightDarkModeBtn.addEventListener("click", () => {
  const lightDarkMenu = document.querySelector(".settings-menu");
  if (localStorage.getItem("toggleLightDarkMenu") === "true") {
    lightDarkMenu.style.display = "none";
    localStorage.setItem("toggleLightDarkMenu", "false");
  } else {
    lightDarkMenu.style.display = "block";
    localStorage.setItem("toggleLightDarkMenu", "true");
  }
});

// change the theme from local storage to dark upon click
darkBtn.addEventListener("click", () => {
  darkTheme(root);
  localStorage.setItem("theme", "dark");
});

// change the theme from local storage to light upon click
lightBtn.addEventListener("click", () => {
  lightTheme(root);
  localStorage.setItem("theme", "light");
});

// change the css theme to dark
function darkTheme(root) {
  root.style.setProperty("--text-color", "white");
  root.style.setProperty("--bg-color", "rgb(50, 50, 50)");
  root.style.setProperty("--article-color", "rgb(29, 28, 28)");
  root.style.setProperty("--navbar-color", "rgb(29, 28, 28)");
  root.style.setProperty("--hover-color", "rgb(65, 63, 63)");
}

// change the css theme to light
function lightTheme(root) {
  root.style.setProperty("--text-color", "black");
  root.style.setProperty("--bg-color", "rgb(243, 243, 243)");
  root.style.setProperty("--article-color", "white");
  root.style.setProperty("--navbar-color", "white");
  root.style.setProperty("--hover-color", "rgb(206, 200, 200)");
}
