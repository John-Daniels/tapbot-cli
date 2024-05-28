# Tapbot

<!-- ![Tapbot Logo](https://example.com/tapbot-logo.png) -->

### What is Tapbot

Welcome to **Tapbot**! Tapbot is a command-line tool designed to automate screen taps on Android devices using `adb` (Android Debug Bridge). One of the unique aspects of Tapbot is that you don't need to have `adb` installed on your machine - we've bundled it with the package for you!

## Why Tapbot?

When developing Tapbot, we wanted to make it as easy as possible for users to get started with Android automation without needing to deal with installing and configuring `adb`. Many developers and testers face the hurdle of setting up `adb`, which can be time-consuming and sometimes frustrating. With Tapbot, you can bypass this hurdle entirely.

By bundling the `adb` binaries for various operating systems directly into our package, we ensure a smooth and hassle-free experience. This approach guarantees that you always have the right version of `adb` at your fingertips, without the need for additional installations.

## Installation

To install and run Tapbot, you need Node.js installed on your machine. If you don't have it, download and install it from [Node.js official website](https://nodejs.org/).

You can install and run Tapbot using `npx`:

```sh
npx tapbot
```

## Usage

1. **Enable Developer Options and USB Debugging on your Android device**:

   - Go to **Settings** > **About phone**.
   - Tap **Build number** seven times to unlock developer options.
   - Go back to **Settings** > **System** > **Developer options**.
   - Enable **USB debugging**.

2. **Connect your device to your computer** via USB.

3. **Run Tapbot**:

   ```sh
   npx tapbot
   ```

4. **Select your device** from the list if you have multiple devices connected.

5. Tapbot will start automating taps on your device!

## How It Works

Tapbot detects the screen resolution of your connected Android device and taps on the screen in a specific pattern until the power button is pressed. Here's a brief overview of what happens under the hood:

1. **Detect Device**: Lists connected Android devices and allows you to select one.
2. **Screen Resolution**: Retrieves the screen resolution of the selected device.
3. **Automate Taps**: Continuously taps at the center and around the center of the screen.
4. **Stop Condition**: Stops tapping when the device's power button is pressed (screen turns off).

### Key Features

- **Bundled `adb`**: No need to install `adb` separately. Tapbot comes with the `adb` binaries for Windows, macOS, and Linux.
- **Simple to Use**: Just connect your device, run the command, and select your device from the list.
- **Cross-Platform**: Works on Windows, macOS, and Linux.

## Contributing

We welcome contributions to Tapbot! If you have an idea for a new feature or have found a bug, please open an issue or submit a pull request on our [GitHub repository](https://github.com/yourusername/tapbot).

### To contribute:

1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:
   ```sh
   git clone https://github.com/John-Daniels/tapbot.git
   ```
3. **Create a new branch** for your feature or bugfix:
   ```sh
   git checkout -b my-new-feature
   ```
4. **Make your changes** and commit them:
   ```sh
   git commit -m "Add some feature"
   ```
5. **Push to your branch**:
   ```sh
   git push origin my-new-feature
   ```
6. **Open a pull request** on GitHub.

Please ensure your code follows our coding standards and includes tests where applicable.

## License

Tapbot is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

We'd like to thank the open-source community for their invaluable contributions, and the developers of `adbkit` for providing a great library to interact with `adb`.

---

Enjoy using Tapbot, and happy automating!

If you encounter any issues, feel free to open an issue on our [GitHub repository](https://github.com/John-Daniels/tapbot).
