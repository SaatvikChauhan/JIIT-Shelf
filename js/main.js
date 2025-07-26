// material dropdown
window.toggleSection = function (button) {
  const content = button.nextElementSibling;
  const chevron = button.querySelector('.chevron-icon');
  content.classList.toggle('show');
  chevron.classList.toggle('rotate');
};

// tools dropdown
const toolsButton = document.querySelector("#tools-primary");
const toolsSecondary = document.querySelector(".tools-secondary");
let toolsOpen = false;

toolsButton.addEventListener("click", () => {
  toolsOpen = !toolsOpen;
  toolsSecondary.classList.toggle("tools-secondary-display", toolsOpen);
});

document.addEventListener("click", (e) => {
  if (!toolsButton.contains(e.target) && !toolsSecondary.contains(e.target)) {
    toolsSecondary.classList.remove("tools-secondary-display");
    toolsOpen = false;
  }
});

// theme toggle
function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === "light") {
    root.style.setProperty('--background', 'hsla(0, 0%, 98%, 1)');
    root.style.setProperty('--foreground', 'hsla(240, 10%, 4%, 1)');
    root.style.setProperty('--accent', 'rgba(99, 102, 241, 1)');
    root.style.setProperty('--border', 'hsla(0, 0%, 0%, 0.08)');
    root.style.setProperty('--background-2', '#f5f5f7');
    root.style.setProperty('--background-2-new', 'hsla(240, 10%, 4%, 0.05)');
    root.style.setProperty('--background-3', 'rgba(0,0,0,0.03)');
    root.style.setProperty('--border-2', 'rgba(0,0,0,0.08)');
    root.style.setProperty('--border-3', 'rgba(0,0,0,0.15)');
    root.style.setProperty('--hover', 'rgba(0,0,0,0.05)');

  } else {
    root.style.setProperty('--background', 'hsla(240, 10%, 4%, 1)');
    root.style.setProperty('--foreground', 'hsla(0, 0%, 98%, 1)');
    root.style.setProperty('--accent', 'rgba(99, 102, 241, 1)');
    root.style.setProperty('--border', 'hsla(0, 0%, 98%, 0.2)');
    root.style.setProperty('--background-2', '#1a1b1f');
    root.style.setProperty('--background-2-new', '#1a1b1f');
    root.style.setProperty('--background-3', 'rgba(255,255,255,0.03)');
    root.style.setProperty('--border-2', 'rgba(255,255,255,0.08)');
    root.style.setProperty('--border-3', 'rgba(255,255,255,0.15)');
    root.style.setProperty('--hover', 'rgba(255,255,255,0.05)');
  }

  localStorage.setItem("theme", theme);
}
const themeToggle = document.querySelector("#theme-toggle");
const icon = document.querySelector("#theme-toggle-icon");
const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

icon.setAttribute("data-lucide", savedTheme === "dark" ? "sun-medium" : "moon");
lucide.createIcons();

themeToggle.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);

  const newIcon = document.createElement("i");
  newIcon.setAttribute("data-lucide", newTheme === "dark" ? "sun-medium" : "moon");
  newIcon.setAttribute("id", "theme-toggle-icon");

  themeToggle.innerHTML = "";
  themeToggle.append(newIcon);
  lucide.createIcons();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`/service-worker.js?cache-bust=${Date.now()}`) // <-- bust the SW cache
      .then((reg) =>
        console.log("✅ Service Worker registered with scope:", reg.scope)
      )
      .catch((err) =>
        console.error("❌ Service Worker registration failed:", err)
      );
  });
}