/**
 * Chaos-Critters Input System
 * ---------------------------
 * Handles keyboard, mouse, and touch input across all devices.
 */

import { Scene, Vector3 } from "@babylonjs/core";
import { spawnOne } from "./spawner";

/**
 * Initializes input controls for Chaos-Critters.
 * Works on desktop, laptop, tablet, and mobile.
 */
export function initInput(scene: Scene) {
  // --- Keyboard Controls (Desktop / Laptop) ---
  window.addEventListener("keydown", (ev) => {
    const key = ev.key.toLowerCase();

    if (key === "c") {
      // Spawn one critter at center
      spawnOne(scene, new Vector3(0, 1.2, 0));
    }

    if (key === "r") {
      // Spawn random critters
      for (let i = 0; i < 3; i++) {
        const pos = new Vector3(
          (Math.random() - 0.5) * 5,
          1.2,
          (Math.random() - 0.5) * 5
        );
        spawnOne(scene, pos);
      }
    }
  });

  // --- Pointer / Touch Controls (Mobile / Tablet / Desktop) ---
  scene.onPointerObservable.add(() => {
    const pick = scene.pick(scene.pointerX, scene.pointerY);

    if (pick?.hit && pick.pickedPoint) {
      const spawnPos = pick.pickedPoint.clone();
      spawnPos.y = 1.2; // Lift above ground
      spawnOne(scene, spawnPos);
    }
  });
}
