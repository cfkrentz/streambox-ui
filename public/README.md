# StreamBoxUI

**StreamBoxUI** is a fullscreen, minimalist kiosk app designed for Raspberry Pi (tested on Raspberry Pi 5 with Linux Lite). It auto-launches on boot and displays the current time and a set of streaming shortcuts — all navigable with an air mouse (MX3).

---

## 🎯 Features

- ⏱ Live time and date display
- 🔗 Custom streaming links (configurable)
- 🖱 Air mouse–friendly navigation with hover feedback
- 🚀 Auto-launches on boot in kiosk mode
- 🧼 Designed to replace AppleTV, Roku, FireStick, and generally Smart TV UI bloat.

---

## 🧰 Tech Stack

- HTML, CSS, Vanilla JS
- Hosted locally on Raspberry Pi
- Autostart via `systemd` or shell script
- Works with Firefox in kiosk mode

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/streambox-ui.git
cd streambox-ui

# Optional: set up to auto-launch on boot
# (instructions coming soon)
