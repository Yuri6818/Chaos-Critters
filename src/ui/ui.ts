/**
 * Chaos-Critters UI System
 * ------------------------
 * Responsive UI for desktop, laptop, tablet, and mobile.
 */

import { Scene } from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  Button,
  Control,
  StackPanel,
  TextBlock,
} from "@babylonjs/gui";

import { spawnOne, spawnMany } from "../engine/spawner";
import { setChaosMode } from "../systems/chaosModes";

/**
 * Initializes the Chaos-Critters UI.
 */
export function initUI(scene: Scene) {
  // Fullscreen UI layer (always on top of canvas)
  const ui = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

  // Root panel (bottom-left)
  const panel = new StackPanel();
  panel.width = "240px";
  panel.isVertical = true;
  panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
  panel.paddingBottom = "20px";
  panel.paddingLeft = "20px";
  ui.addControl(panel);

  // --- Title ---
  const title = new TextBlock();
  title.text = "Chaos Controls";
  title.color = "white";
  title.fontSize = 22;
  title.height = "40px";
  title.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel.addControl(title);

  // Utility to create buttons cleanly
  function makeButton(label: string, onClick: () => void) {
    const btn = Button.CreateSimpleButton(label, label);
    btn.width = "200px";
    btn.height = "50px";
    btn.color = "white";
    btn.background = "#3a3a3a";
    btn.cornerRadius = 8;
    btn.fontSize = "18px";

    // Ensure GUI receives pointer events
    btn.isPointerBlocker = true;

    btn.onPointerUpObservable.add(onClick);
    panel.addControl(btn);
    return btn;
  }

  // --- Spawn Buttons ---
  makeButton("Spawn Critter", () => {
    spawnOne(scene);
  });

  makeButton("Spawn Cluster", () => {
    spawnMany(scene, 5);
  });

  // --- Divider ---
  const divider = new TextBlock();
  divider.text = "Chaos Modes";
  divider.color = "white";
  divider.fontSize = 22;
  divider.height = "40px";
  divider.paddingTop = "10px";
  divider.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel.addControl(divider);

  // --- Chaos Mode Buttons ---
  makeButton("Wind Mode", () => {
    setChaosMode("wind", scene);
  });

  makeButton("Fire Mode", () => {
    setChaosMode("fire", scene);
  });

  makeButton("Bounce Mode", () => {
    setChaosMode("bounce", scene);
  });

  makeButton("Gravity Flip", () => {
    setChaosMode("gravityFlip", scene);
  });

  makeButton("Frenzy Mode", () => {
    setChaosMode("frenzy", scene);
  });

  makeButton("Reset Chaos", () => {
    setChaosMode("none", scene);
  });

  return ui;
}
