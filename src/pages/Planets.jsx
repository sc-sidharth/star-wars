import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import LoadingScreen from "../components/layout/LoadingScreen";
import PlanetViewer3D from "../components/planet/PlanetViewer3D";
import PlanetCard from "../components/planet/PlanetCard";
import { formatNumber } from "../utils/formatters";

function PlanetDetail({ planet, onClose }) {
  return (
    <div
      className="planet-detail-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "var(--spacing-lg)",
        overflow: "auto",
      }}
    >
      <div
        className="holo-card scale-in"
        style={{
          maxWidth: "1200px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          className="holo-button"
          style={{
            position: "absolute",
            top: "var(--spacing-md)",
            right: "var(--spacing-md)",
            padding: "0.5rem 1rem",
            zIndex: 10,
          }}
          aria-label="Close planet details"
        >
          ✕ Close
        </button>

        <h2
          className="holo-accent"
          style={{
            fontSize: "var(--font-size-2xl)",
            marginBottom: "var(--spacing-lg)",
            textAlign: "center",
          }}
        >
          {planet.name}
        </h2>

        {/* 3D Viewer */}
        <PlanetViewer3D planet={planet} />

        <div
          className="holo-divider"
          style={{ margin: "var(--spacing-lg) 0" }}
        ></div>

        {/* Planet Details */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "var(--spacing-lg)",
          }}
        >
          <div>
            <h3
              className="holo-accent"
              style={{
                marginBottom: "var(--spacing-sm)",
                fontSize: "var(--font-size-lg)",
              }}
            >
              Physical Characteristics
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-xs)",
              }}
            >
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Rotation Period:</span>{" "}
                <strong>{planet.rotation_period || "Unknown"} hours</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Orbital Period:</span>{" "}
                <strong>{planet.orbital_period || "Unknown"} days</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Diameter:</span>{" "}
                <strong>{formatNumber(planet.diameter)} km</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Gravity:</span>{" "}
                <strong>{planet.gravity || "Unknown"}</strong>
              </p>
            </div>
          </div>

          <div>
            <h3
              className="holo-accent"
              style={{
                marginBottom: "var(--spacing-sm)",
                fontSize: "var(--font-size-lg)",
              }}
            >
              Environment
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-xs)",
              }}
            >
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Climate:</span>{" "}
                <strong>{planet.climate || "Unknown"}</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Terrain:</span>{" "}
                <strong>{planet.terrain || "Unknown"}</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Surface Water:</span>{" "}
                <strong>{planet.surface_water || "Unknown"}%</strong>
              </p>
              <p className="holo-text">
                <span style={{ opacity: 0.7 }}>Population:</span>{" "}
                <strong>{formatNumber(planet.population)}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Planets() {
  const { planets, loading, error } = useApp();
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div style={{ padding: "var(--spacing-xl)", textAlign: "center" }}>
        <div className="holo-card">
          <h2 className="holo-accent" style={{ color: "var(--holo-error)" }}>
            Error Loading Planets
          </h2>
          <p className="holo-text">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "var(--spacing-xl)" }}>
      <h2
        className="holo-accent"
        style={{
          fontSize: "var(--font-size-3xl)",
          marginBottom: "var(--spacing-md)",
          textAlign: "center",
        }}
      >
        Star Wars Planets
      </h2>

      <p
        className="holo-text"
        style={{
          textAlign: "center",
          marginBottom: "var(--spacing-xl)",
          opacity: 0.8,
        }}
      >
        Explore {planets.length} planets from the Star Wars universe in
        interactive 3D
      </p>

      {/* Search */}
      <div
        style={{
          marginBottom: "var(--spacing-xl)",
          maxWidth: "600px",
          margin: "0 auto var(--spacing-xl)",
        }}
      >
        <input
          type="text"
          placeholder="Search planets by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="holo-input"
          style={{ width: "100%", fontSize: "var(--font-size-md)" }}
        />
      </div>

      {/* Results Count */}
      <p
        className="holo-text"
        style={{
          textAlign: "center",
          marginBottom: "var(--spacing-lg)",
          fontSize: "var(--font-size-sm)",
        }}
      >
        {filteredPlanets.length}{" "}
        {filteredPlanets.length === 1 ? "planet" : "planets"} found
      </p>

      {/* Planets Grid */}
      {filteredPlanets.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "var(--spacing-lg)",
          }}
        >
          {filteredPlanets.map((planet) => (
            <PlanetCard
              key={planet.url}
              planet={planet}
              onClick={setSelectedPlanet}
            />
          ))}
        </div>
      ) : (
        <div
          className="holo-card"
          style={{ textAlign: "center", padding: "var(--spacing-xl)" }}
        >
          <p className="holo-text" style={{ fontSize: "var(--font-size-lg)" }}>
            No planets found matching "{searchQuery}"
          </p>
        </div>
      )}

      {/* Planet Detail Modal */}
      {selectedPlanet && (
        <PlanetDetail
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </div>
  );
}

export default Planets;
