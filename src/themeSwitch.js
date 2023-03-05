export default function themeSwitcher() {
  const root = document.querySelector(":root");
  if (main.dataset.theme === "light") {
    root.style.setProperty("--background-btn", "rgb(234, 234, 234)");
    root.style.setProperty("--color-white", "black");
    root.style.setProperty("--options-container-color", "rgb(237, 237, 237)");
    root.style.setProperty("--dark-btn-hover", "rgb(217, 235, 231)");
    root.style.setProperty("--color-black", "white");
    main.dataset.theme = "dark";
  } else {
    root.style.setProperty("--background-btn", "rgb(25, 28, 27)");
    root.style.setProperty("--color-white", "white");
    root.style.setProperty("--options-container-color", "rgb(40, 41, 41)");
    root.style.setProperty("--dark-btn-hover", "rgb(44, 49, 48)");
    root.style.setProperty("--color-black", "black");
    main.dataset.theme = "light";
  }
}
