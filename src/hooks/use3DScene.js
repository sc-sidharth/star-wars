import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * use3DScene Hook
 * 
 * Initialize and manage a Three.js scene
 * 
 * @param {Object} options - Configuration options
 * @returns {Object} - { sceneRef, rendererRef, cameraRef }
 */
export function use3DScene(options = {}) {
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      options.fov || 75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = options.cameraZ || 5;
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      ...options.rendererOptions
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Cleanup on unmount
    return () => {
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return {
    sceneRef,
    rendererRef,
    cameraRef
  };
}

export default use3DScene;


