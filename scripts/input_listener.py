import os
import subprocess
from evdev import InputDevice, categorize, ecodes

DEVICE_PATH = "/dev/input/event8"  # Set your actual input path

# Absolute path to the shell script
SCRIPT_PATH = os.path.abspath("./kill_firefox.sh")

def kill_firefox_clean():
    try:
        subprocess.run(["pkill", "-f", "firefox"], check=True)
        print("Sent SIGTERM to all Firefox processes.")
    except subprocess.CalledProcessError as e:
        print("Failed to kill Firefox:", e)

def listen_for_home():
    device = InputDevice(DEVICE_PATH)
    print(f"Listening on {device.name} for KEY_HOMEPAGE...")

    for event in device.read_loop():
        if event.type == ecodes.EV_KEY:
            key_event = categorize(event)
            if key_event.scancode == ecodes.KEY_HOMEPAGE and key_event.keystate == key_event.key_down:
                print("Home button pressed!")
                kill_firefox_clean()

if __name__ == "__main__":
    listen_for_home()

