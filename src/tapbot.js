#!/usr/bin/env node

import { handleError } from "./utils/index.js";
import {
  selectDevice,
  client,
  getScreenResolution,
  isScreenOff,
} from "./utils/adb.js";

(async () => {
  try {
    console.log(">>>> TAPBOT Starting!!! 💰💀 @johnkoder <<<<");
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
  } catch (error) {
    handleError(error);
  }
})();
