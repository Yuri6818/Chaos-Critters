/**
 * Chaos-Critters: Spawner System
 * ------------------------------
 * Handles spawning critters into the world in a clean, scalable way.
 */

import { Scene, Vector3 } from "@babylonjs/core";
import { spawnCritter } from "./critter";

/**
 * Spawns a single critter at a given position.
 * Default height is 1.2 so critters never clip into the ground.
 */
export function spawnOne(scene: Scene, position = new Vector3(0, 1.2, 0)) {
  return spawnCritter(scene, position);
}

/**
 * Spawns multiple critters in a cluster.
 * Uses non-mutating vector math so center is never modified.
 */
export function spawnMany(
  scene: Scene,
  count: number,
  center = new Vector3(0, 1.2, 0),
  spread = 1.5
) {
  const critters = [];

  for (let i = 0; i < count; i++) {
    const offset = new Vector3(
      (Math.random() - 0.5) * spread,
      0,
      (Math.random() - 0.5) * spread
    );

    // Use addInPlaceToRef or clone+add to avoid mutating center
    const pos = center.clone().add(offset);

    critters.push(spawnCritter(scene, pos));
  }

  return critters;
}

/**
 * Spawns critters at random positions within a defined area.
 */
export function spawnRandom(
  scene: Scene,
  count: number,
  areaSize = 5
) {
  const critters = [];

  for (let i = 0; i < count; i++) {
    const pos = new Vector3(
      (Math.random() - 0.5) * areaSize,
      1.2,
      (Math.random() - 0.5) * areaSize
    );

    critters.push(spawnCritter(scene, pos));
  }

  return critters;
}
