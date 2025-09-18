// src/components/AnimatedBackground.jsx
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function AnimatedBackground({ className = "" }) {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const options = {
    fullScreen: { enable: false },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: true
      }
    },
    particles: {
      number: { value: 40 },
      color: { value: ["#7c3aed", "#06b6d4", "#f472b6"] },
      shape: { type: "circle" },
      opacity: { value: 0.15 },
      size: { value: { min: 2, max: 6 } },
      move: { enable: true, speed: 1.5, outMode: "out" },
      links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.06, width: 1 }
    }
  };

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Particles id="tsparticles" init={particlesInit} options={options} />
    </div>
  );
}
