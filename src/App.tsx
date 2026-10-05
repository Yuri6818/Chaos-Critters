/**
 * Chaos‑Critters Main Application Component
 * -----------------------------------------
 * This component mounts the Babylon canvas, initializes the engine,
 * and renders the core UI elements. Kept intentionally small and clean.
 */

import { useEffect, useRef } from "react";
import "./index.css";
import { initChaosCrittersScene } from "./engine/babylonScene";

function App() {
  // Canvas reference for Babylon engine
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) {
      console.error("Canvas element not found: #game-canvas");
      return;
    }

    // Initialize Babylon engine + scene
    initChaosCrittersScene(canvasElement);
  }, []);

  return (
  <div className="w-screen h-screen relative overflow-hidden">

    {/* Babylon Game Canvas */}
    <canvas
      id="game-canvas"
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    />

    {/* Title (above canvas, but not blocking input) */}
    <h1 className="hairy-text absolute top-4 left-4 z-20 pointer-events-none">
      Chaos‑Critters
    </h1>

  </div>
);
}

export default App;
