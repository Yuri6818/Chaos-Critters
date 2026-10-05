/**
 * Chaos-Critters: Chaos Mode System
 * ---------------------------------
 * Handles global chaos effects applied to critters and the scene.
 */

import {
  Scene,
  Vector3,
  Color3,
  AbstractMesh,
  StandardMaterial,
} from "@babylonjs/core";

import { spawnMany } from "../engine/spawner";

export type ChaosMode =
  | "none"
  | "wind"
  | "fire"
  | "bounce"
  | "gravityFlip"
  | "frenzy";

let activeMode: ChaosMode = "none";

/**
 * Optional getter if UI wants to read the current mode.
 */
export function getChaosMode(): ChaosMode {
  return activeMode;
}

/**
 * Activates a chaos mode.
 */
export function setChaosMode(mode: ChaosMode, scene: Scene) {
  activeMode = mode;

  switch (mode) {
    case "wind":
      applyWind(scene);
      break;

    case "fire":
      applyFire(scene);
      break;

    case "bounce":
      applyBounce(scene);
      break;

    case "gravityFlip":
      applyGravityFlip(scene);
      break;

    case "frenzy":
      applyFrenzy(scene);
      break;

    case "none":
    default:
      resetChaos(scene);
      break;
  }
}

/**
 * Helper: returns true if mesh is a critter sphere.
 */
function isCritter(mesh: AbstractMesh): boolean {
  return mesh.name.startsWith("Critter");
}

/**
 * Wind Mode — pushes critters with a directional force.
 */
function applyWind(scene: Scene) {
  scene.meshes.forEach((mesh) => {
    if (!isCritter(mesh) || !mesh.physicsBody) return;

    mesh.physicsBody.applyImpulse(
      new Vector3(1.5, 0, 0), // softer impulse
      mesh.getAbsolutePosition()
    );
  });
}

/**
 * Fire Mode — gives critters a glowing red tint.
 * Updated to use StandardMaterial (PBR removed earlier).
 */
function applyFire(scene: Scene) {
  scene.meshes.forEach((mesh) => {
    if (!isCritter(mesh)) return;

    const mat = mesh.material;
    if (mat && mat instanceof StandardMaterial) {
      mat.diffuseColor = new Color3(1, 0.2, 0.2); // red
    }
  });
}

/**
 * Bounce Mode — critters get a vertical impulse.
 */
function applyBounce(scene: Scene) {
  scene.meshes.forEach((mesh) => {
    if (!isCritter(mesh) || !mesh.physicsBody) return;

    mesh.physicsBody.applyImpulse(
      new Vector3(0, 2.5, 0), // softer bounce
      mesh.getAbsolutePosition()
    );
  });
}

/**
 * Gravity Flip — reverses gravity for a moment.
 */
function applyGravityFlip(scene: Scene) {
  const physics = scene.getPhysicsEngine();
  if (!physics) return;

  physics.setGravity(new Vector3(0, 9.81, 0));

  setTimeout(() => {
    physics.setGravity(new Vector3(0, -9.81, 0));
  }, 1500);
}

/**
 * Frenzy Mode — spawns a burst of critters.
 */
function applyFrenzy(scene: Scene) {
  spawnMany(scene, 10, new Vector3(0, 1.2, 0), 4);
}

/**
 * Reset all chaos effects.
 */
function resetChaos(scene: Scene) {
  scene.meshes.forEach((mesh) => {
    if (!isCritter(mesh)) return;

    const mat = mesh.material;
    if (mat && mat instanceof StandardMaterial) {
      mat.diffuseColor = new Color3(0.2, 0.6, 1); // original blue
    }
  });

  const physics = scene.getPhysicsEngine();
  if (physics) {
    physics.setGravity(new Vector3(0, -9.81, 0));
  }
}
