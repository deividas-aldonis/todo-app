const themeSwitchBtn = document.querySelector(".theme-switch-btn");
const headerBackgroundImage = document.querySelector(
  ".header-background-image"
);
console.log(headerBackgroundImage);
themeSwitchBtn.addEventListener("click", (e) => {
  const target = e.currentTarget;
  const currentTheme = target.dataset.currentTheme;

  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    target.setAttribute("data-current-theme", "dark");
    headerBackgroundImage.style.backgroundImage =
      'url("./images/bg-mobile-dark.jpg")';
  } else {
    document.documentElement.removeAttribute("data-theme");
    target.setAttribute("data-current-theme", "light");
    headerBackgroundImage.style.backgroundImage =
      'url("./images/bg-mobile-light.jpg")';
  }
});
