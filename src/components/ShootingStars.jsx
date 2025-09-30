"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ShootingStars({
  color = "#aa8558", // base star color
  count = 800, // how many possible stars
  size = 3,
  speed = 0.012,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );
    camera.position.z = 500;

    // Buffer geometry for many points
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const life = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      life[i] = -1; // inactive initially
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("life", new THREE.BufferAttribute(life, 1));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // Resize handler
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    onResize();

    // Track mouse
    const mouse = new THREE.Vector2(0, 0);
    const spawnStar = (x, y) => {
      for (let i = 0; i < count; i++) {
        if (life[i] < 0) {
          positions[i * 3] = x - window.innerWidth / 2;
          positions[i * 3 + 1] = -(y - window.innerHeight / 2);
          positions[i * 3 + 2] = 0;
          life[i] = 1; // activate
          break;
        }
      }
    };

    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      spawnStar(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", handleMove);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // update stars
      for (let i = 0; i < count; i++) {
        if (life[i] > 0) {
          positions[i * 3] += 10 * speed; // X velocity
          positions[i * 3 + 1] += -8 * speed; // Y velocity (upwards)
          life[i] -= 0.01;
          if (life[i] <= 0) {
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;
          }
        }
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMove);
      renderer.dispose();
    };
  }, [color, count, size, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full z-0 pointer-events-none ${className}`}
    />
  );
}
