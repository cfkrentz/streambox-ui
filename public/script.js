// ===== Live Clock =====
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  document.getElementById('time').textContent = timeStr;
}

setInterval(updateTime, 1000);
updateTime(); // initial call

// ===== Elements =====
const linksContainer = document.getElementById("links");
const dashboard = document.querySelector(".dashboard");
const appViewer = document.getElementById("appViewer");
const exitButton = document.getElementById("exitAppBtn");

// ===== Load App Tiles =====
fetch("apps.json")
  .then(response => response.json())
  .then(apps => {
    apps.forEach(app => {
      const tile = document.createElement("div");
      tile.className = "link-tile";

      tile.onclick = () => {
        if (app.url === "#add") {
          openAddAppModal(); // IMPLEMENT LATER
        } else {
          dashboard.style.display = "none";
          window.electronAPI.launchApp(`firefox --kiosk "${app.url}"`);
        }
      };

      const img = document.createElement("img");
      img.src = app.icon;
      img.alt = app.label;

      const label = document.createElement("div");
      label.className = "link-label";
      label.textContent = app.label;

      tile.appendChild(img);
      tile.appendChild(label);
      linksContainer.appendChild(tile);
    });
  })
  .catch(err => console.error("Error loading app list:", err));

// ===== Show/hide "X" button on mouse move =====
let mouseTimer;
window.addEventListener("mousemove", () => {
  if (appViewer.style.display === "block") {
    exitButton.style.display = "block";
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
      exitButton.style.display = "none";
    }, 3000);
  }
});

// ===== Exit button brings back dashboard =====
exitButton.addEventListener("click", () => {
  window.electronAPI.killApp();
});

window.electronAPI.onAppClosed(() => {
  dashboard.style.display = "flex";
  exitButton.style.display = "none";
});