#!/usr/bin/env node

import adbkit from "adbkit";
import os from "os";
import path from "path";
import readlineSync from "readline-sync";
import fs from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = adbkit.createClient({ bin: getAdbPath() });
console.log(">>>> TAPBOT Starting!!! 💰💀 @johnkoder <<<<");

// We don't need people to have adb installed on their machine!
// So we brought adb to them
function getAdbPath() {
  const platform = os.platform();
  let adbPath = "";

  if (platform === "win32") {
    adbPath = path.join(__dirname, "../adb", "win", "adb.exe");
  } else if (platform === "darwin") {
    adbPath = path.join(__dirname, "../adb", "mac", "adb");
  } else if (platform === "linux") {
    adbPath = path.join(__dirname, "../adb", "linux", "adb");
  } else {
    console.error(`Unsupported platform: ${platform}`);
    process.exit(1);
  }

  if (!fs.existsSync(adbPath)) {
    console.error(`adb binary not found at ${adbPath}`);
    process.exit(1);
  }

  if (platform !== "win32") {
    fs.chmodSync(adbPath, "755");
  }

  return adbPath;
}

// List connected devices and prompt the user to select one
async function selectDevice() {
  try {
    const devices = await client.listDevices();
    if (devices.length === 0) {
      console.log("No devices connected.");
      process.exit(1);
    } else if (devices.length === 1) {
      console.log(`Only one device connected: ${devices[0].id}`);
      return devices[0].id;
    } else {
      console.log("Connected devices:");
      devices.forEach((device, index) => {
        console.log(`${index}: ${device.id}`);
      });
      const deviceNumber = readlineSync.question("Select a device by number: ");
      return devices[parseInt(deviceNumber, 10)].id;
    }
  } catch (err) {
    console.error("Error listing devices:", err);
    process.exit(1);
  }
}

// Get screen resolution
async function getScreenResolution(deviceId) {
  try {
    const output = await client.shell(deviceId, "wm size");
    const resolution = (await adbkit.util.readAll(output))
      .toString()
      .match(/[0-9]+x[0-9]+/)[0];
    const [screenWidth, screenHeight] = resolution.split("x").map(Number);
    return { screenWidth, screenHeight };
  } catch (err) {
    console.error("Error getting screen resolution:", err);
    process.exit(1);
  }
}

// Check if the power button has been pressed
async function isScreenOff(deviceId) {
  try {
    const output = await client.shell(deviceId, "dumpsys power");
    const result = (await adbkit.util.readAll(output)).toString();
    return result.includes("mWakefulness=Asleep");
  } catch (err) {
    console.error("Error checking screen status:", err);
    process.exit(1);
  }
}

// Main
(async () => {
  const deviceId = await selectDevice();
  console.log("Selected device:", deviceId);

  const { screenWidth, screenHeight } = await getScreenResolution(deviceId);
  const centerX = Math.floor(screenWidth / 2);
  const centerY = Math.floor(screenHeight / 2);

  let tapCount = 0;

  while (true) {
    if (await isScreenOff(deviceId)) {
      console.log("Power button pressed. Stopping taps.");
      break;
    }

    await client.shell(deviceId, `input tap ${centerX} ${centerY}`);
    await client.shell(deviceId, `input tap ${centerX + 60} ${centerY + 60}`);
    await client.shell(deviceId, `input tap ${centerX - 60} ${centerY - 60}`);
    tapCount += 1;
  }

  console.log(`Total number of taps: ${tapCount * 3}`);
})();
