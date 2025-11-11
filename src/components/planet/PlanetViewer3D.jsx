import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  Stars,
  PerspectiveCamera,
} from "@react-three/drei";
import { useApp } from "../../context/AppContext";
import LoadingScreen from "../layout/LoadingScreen";

export const getPlanetColor = (climate, terrain) => {
  if (terrain?.toLowerCase().includes("desert")) return "#e8b676";
  if (
    terrain?.toLowerCase().includes("ice") ||
    climate?.toLowerCase().includes("frozen")
  )
    return "#c0d6e4";
  if (
    terrain?.toLowerCase().includes("jungle") ||
    terrain?.toLowerCase().includes("forest")
  )
    return "#3a8c3f";
  if (
    terrain?.toLowerCase().includes("ocean") ||
    terrain?.toLowerCase().includes("water")
  )
    return "#1e5f74";
  if (
    terrain?.toLowerCase().includes("urban") ||
    terrain?.toLowerCase().includes("cityscape")
  )
    return "#707080";
  if (
    terrain?.toLowerCase().includes("volcanic") ||
    terrain?.toLowerCase().includes("lava")
  )
    return "#8b1a1a";
  if (terrain?.toLowerCase().includes("swamp")) return "#4a5840";
  return "#6b7280"; // Default gray
};

/**
 * 3D Planet Component
 * Renders a textured sphere representing a Star Wars planet
 */
export function Planet3D({ planet }) {
  // Planet colors based on climate/terrain

  const planetColor = getPlanetColor(planet.climate, planet.terrain);

  return (
    <group>
      {/* Main Planet Sphere */}
      <Sphere args={[2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={planetColor}
          roughness={0.8}
          metalness={0.2}
          emissive={planetColor}
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Atmosphere Glow */}
      <Sphere args={[2.1, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color={planetColor}
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
}

/**
 * PlanetViewer3D Component
 * Full 3D scene with planet, stars, and controls
 */
function PlanetViewer3D({ planet }) {
  if (!planet) {
    return (
      <div
        className="holo-card"
        style={{ padding: "var(--spacing-xl)", textAlign: "center" }}
      >
        <p className="holo-text">
          No planet data available for 3D visualization
        </p>
      </div>
    );
  }

  return (
    <div
      className="planet-viewer-3d holo-card"
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at center, rgba(0,0,0,0.4), rgba(0,0,0,0.9))",
        border: "2px solid var(--holo-border)",
        boxShadow: "var(--holo-glow)",
      }}
    >
      <Suspense fallback={<LoadingScreen message="Rendering planet..." />}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />

          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 3, 5]} intensity={1} />
          <pointLight position={[-5, -3, -5]} intensity={0.5} color="#00f3ff" />

          {/* Stars Background */}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />

          {/* The Planet */}
          <Planet3D planet={planet} />

          {/* Camera Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>

      {/* Controls Info Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "var(--spacing-md)",
          right: "var(--spacing-md)",
          background: "rgba(0, 0, 0, 0.7)",
          padding: "var(--spacing-sm)",
          borderRadius: "4px",
          border: "1px solid var(--holo-border)",
          fontSize: "var(--font-size-xs)",
          color: "var(--holo-primary)",
        }}
      >
        <p style={{ margin: "0 0 0.25rem 0" }}>🖱️ Drag to rotate</p>
        <p style={{ margin: 0 }}>🔍 Scroll to zoom</p>
      </div>
    </div>
  );
}

export default PlanetViewer3D;
