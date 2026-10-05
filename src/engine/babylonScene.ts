/**
 * Chaos-Critters Babylon Scene Bootstrap
 * --------------------------------------
 * Initializes the Babylon engine, scene, camera, lighting, physics,
 * spawns initial critters, sets up input controls, and loads the UI.
 */

import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  Color4,
} from "@babylonjs/core";

import { initPhysics, createGround } from "./physics";
import { spawnOne, spawnMany } from "./spawner";
import { initInput } from "./input";
import { initUI } from "../ui/ui";

/**
 * Initializes the Babylon engine and scene for Chaos-Critters.
 * @param canvas - The HTML canvas element used for rendering.
 * @returns An object containing the engine, scene, and camera.
 */
export async function initChaosCrittersScene(canvas: HTMLCanvasElement) {
  // Create Babylon engine
  const engine = new Engine(canvas, true);

  // Create scene
  const scene = new Scene(engine);

  // Neon-friendly dark background
  scene.clearColor = new Color4(0.05, 0.05, 0.05, 1);

  // Camera setup (pulled back and higher so you see the whole platform)
  const camera = new ArcRotateCamera(
    "MainCamera",
    Math.PI / 2,
    Math.PI / 2.5,
    14,
    new Vector3(0, 3, 0),
    scene
  );

  camera.attachControl(canvas, true);

  // Basic lighting
  const light = new HemisphericLight("MainLight", new Vector3(0, 1, 0), scene);
  light.intensity = 1.2;

  // Initialize physics (Havok V2)
  await initPhysics(scene);

  // Create ground plane with physics
  createGround(scene);

  // Spawn initial critters
  spawnOne(scene, new Vector3(0, 1, 0)); // One in the center
  spawnMany(scene, 5, new Vector3(0, 1, 0), 3); // A small cluster

  // Input system (desktop, laptop, tablet, mobile)
  initInput(scene);

  // UI system (responsive across all devices)
  initUI(scene);

  // Resize handling
  window.addEventListener("resize", () => {
    engine.resize();
  });

  // Render loop
  engine.runRenderLoop(() => {
    scene.render();
  });

  return { engine, scene, camera };
}
