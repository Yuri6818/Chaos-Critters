/**
 * Chaos-Critters: Basic Critter Entity
 * ------------------------------------
 * First critter type: a simple physics-enabled sphere.
 */

import {
  Scene,
  MeshBuilder,
  Vector3,
  Color3,
  StandardMaterial,
} from "@babylonjs/core";

import { PhysicsAggregate } from "@babylonjs/core/Physics/v2/physicsAggregate";
import { PhysicsShapeType } from "@babylonjs/core/Physics/v2/IPhysicsEnginePlugin";

/**
 * Spawns a simple critter into the scene.
 * @param scene - The Babylon scene.
 * @param position - Optional spawn position.
 */
export function spawnCritter(scene: Scene, position = new Vector3(0, 1.2, 0)) {
  // Create a sphere mesh
  const critter = MeshBuilder.CreateSphere(
    "Critter",
    { diameter: 0.6, segments: 16 },
    scene
  );

  critter.position = position.clone();

  // Stable, visible material (PBR was causing shader warnings)
  const mat = new StandardMaterial("CritterMat", scene);
  mat.diffuseColor = new Color3(0.2, 0.6, 1); // bright blue
  mat.specularColor = new Color3(0.1, 0.1, 0.1); // soft highlight
  critter.material = mat;

  // Add physics (Havok V2)
  new PhysicsAggregate(
    critter,
    PhysicsShapeType.SPHERE,
    {
      mass: 1,
      restitution: 0.4, // bounce
      friction: 0.8,    // prevents sliding forever
    },
    scene
  );

  return critter;
}

/**
 * Future behavior hook.
 * We leave this empty so ESLint doesn't complain.
 */
export function updateCritter(): void {
  // Behavior will be added later
}
