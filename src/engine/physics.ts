// src/engine/physics.ts

import {
  Scene,
  Vector3,
  MeshBuilder,
  Color3,
  StandardMaterial,
} from "@babylonjs/core";

import HavokPhysics from "@babylonjs/havok";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import { PhysicsAggregate } from "@babylonjs/core/Physics/v2/physicsAggregate";
import { PhysicsShapeType } from "@babylonjs/core/Physics/v2/IPhysicsEnginePlugin";

/**
 * Initialize Havok physics engine
 */
export async function initPhysics(scene: Scene) {
  // Load Havok WASM
  const havokInstance = await HavokPhysics();

  // Create Havok plugin (V2 API)
  const havokPlugin = new HavokPlugin(true, havokInstance);

  // Enable physics with gravity
  scene.enablePhysics(new Vector3(0, -9.81, 0), havokPlugin);

  // IMPORTANT: force Babylon to rebuild materials after physics loads
  scene.meshes.forEach((m) => m.material?.markDirty());

  return havokPlugin;
}

/**
 * Create a large visible ground plane with physics
 */
export function createGround(scene: Scene) {
  const ground = MeshBuilder.CreateGround(
    "Ground",
    { width: 60, height: 60, subdivisions: 2 },
    scene
  );

  // Give the ground a visible material (dark gray)
  const groundMat = new StandardMaterial("groundMat", scene);
  groundMat.diffuseColor = new Color3(0.1, 0.1, 0.1);
  ground.material = groundMat;

  // Add physics
  new PhysicsAggregate(
    ground,
    PhysicsShapeType.BOX,
    { mass: 0 },
    scene
  );

  return ground;
}
