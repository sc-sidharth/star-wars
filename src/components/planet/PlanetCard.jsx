import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Planet3D } from "./PlanetViewer3D";
import { formatNumber } from "../../utils/formatters";

function PlanetCard({ planet, onClick }) {
  return (
    <div
      className="holo-card fade-in-glow"
      onClick={() => onClick(planet)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(planet);
        }
      }}
      aria-label={`View details for ${planet.name}`}
      style={{
        cursor: "pointer",
        transition: "var(--holo-transition)",
        overflow: "hidden",
      }}
    >
      {/* 3D Planet Preview */}
      <div
        style={{
          width: "100%",
          height: "200px",
          borderRadius: "8px",
          marginBottom: "var(--spacing-md)",
          overflow: "hidden",
          border: "1px solid var(--holo-border)",
          position: "relative",
          background:
            "radial-gradient(circle at center, rgba(10, 10, 30, 0.8), rgba(0, 0, 0, 0.95))",
        }}
      >
        {/* Planet Name Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)",
            padding: "var(--spacing-sm)",
            fontSize: "var(--font-size-md)",
            color: "var(--holo-primary)",
            fontWeight: "bold",
            textShadow: "0 0 10px var(--holo-primary)",
            pointerEvents: "none",
          }}
        >
          {planet.name}
        </div>
      </div>

      {/* Planet Information */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-xs)",
        }}
      >
        <p className="holo-text" style={{ fontSize: "var(--font-size-sm)" }}>
          <strong className="holo-accent">Climate:</strong>{" "}
          {planet.climate || "Unknown"}
        </p>
        <p className="holo-text" style={{ fontSize: "var(--font-size-sm)" }}>
          <strong className="holo-accent">Terrain:</strong>{" "}
          {planet.terrain || "Unknown"}
        </p>
        <p className="holo-text" style={{ fontSize: "var(--font-size-sm)" }}>
          <strong className="holo-accent">Population:</strong>{" "}
          {formatNumber(planet.population)}
        </p>
      </div>

      {/* Call to Action */}
      <div
        style={{
          marginTop: "var(--spacing-md)",
          paddingTop: "var(--spacing-sm)",
          borderTop: "1px solid var(--holo-border)",
          fontSize: "var(--font-size-sm)",
          color: "var(--holo-accent)",
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.3s ease",
          }}
        >
          Click to view in 3D →
        </span>
      </div>
    </div>
  );
}

export default PlanetCard;
