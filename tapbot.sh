#!/bin/bash
echo ">>>> TAPBOT Starting!!! 💰💀 @johnkoder <<<<"
# Check if adb is installed and in PATH
if ! command -v adb &> /dev/null
then
    echo "adb could not be found. Please ensure it is installed and added to your PATH."
    exit 1
fi

# List connected devices and prompt the user to select one
devices=($(adb devices | grep -w 'device' | cut -f1))
if [ ${#devices[@]} -eq 0 ]; then
    echo "No devices connected."
    exit 1
elif [ ${#devices[@]} -eq 1 ]; then
    selected_device=${devices[0]}
    echo "Only one device connected: $selected_device"
else
    echo "Connected devices:"
    for i in "${!devices[@]}"; do
        echo "$i: ${devices[$i]}"
    done
    read -p "Select a device by number: " device_number
    selected_device=${devices[$device_number]}
fi

echo "Selected device: $selected_device"

# Get the screen resolution
resolution=$(adb -s $selected_device shell wm size | grep -oE '[0-9]+x[0-9]+')
screen_width=$(echo $resolution | cut -d'x' -f1)
screen_height=$(echo $resolution | cut -d'x' -f2)

# Calculate the center of the screen
center_x=$((screen_width / 2))
center_y=$((screen_height / 2))

# Function to check if the power button has been pressed
is_screen_off() {
    adb -s $selected_device shell dumpsys power | grep -q 'mWakefulness=Asleep'
    return $?
}

# Variable to keep track of the number of taps
tap_count=0

# Infinite loop to perform the tap action
while true; do
    if is_screen_off; then
        echo "Power button pressed. Stopping taps."
        break
    fi
    adb -s $selected_device shell input tap $center_x $center_y
    adb -s $selected_device shell input tap $((center_x + 60)) $((center_y + 60))
    adb -s $selected_device shell input tap $((center_x - 60)) $((center_y - 60))
    adb -s $selected_device shell input tap $((center_x + 90)) $((center_y + 90))
    tap_count=$((tap_count + 1))
    # sleep 0.03
done

# Display the number of taps when the script stops
echo "Total number of taps: $((tap_count * 3))"
