#!/bin/bash

# This script terminates all running Firefox processes
pkill -15 firefox  # SIGTERM (clean shutdown)

# Optional: wait a moment to ensure graceful shutdown
sleep 1
