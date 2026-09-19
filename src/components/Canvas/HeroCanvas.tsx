import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Geometry & Objects
    // Group holding all visual elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central geometric outer ring (Monochrome Swiss minimal)
    const ringGeo = new THREE.TorusGeometry(1.8, 0.015, 32, 100);
    const lineMat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const outerRing = new THREE.Mesh(ringGeo, lineMat);
    mainGroup.add(outerRing);

    // Secondary inner wireframe geometric core
    const coreGeo = new THREE.IcosahedronGeometry(1.25, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x444444,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerCore = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(innerCore);

    // Floating particles particle cloud
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 4;
      scales[i / 3] = Math.random() * 0.03 + 0.01;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x111111,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Thin orbiting crosshair lines
    const lineGroup = new THREE.Group();
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.2, 0, 0),
      new THREE.Vector3(2.2, 0, 0),
      new THREE.Vector3(0, -2.2, 0),
      new THREE.Vector3(0, 2.2, 0),
    ]);
    const thinLineMat = new THREE.LineBasicMaterial({
      color: 0x666666,
      transparent: true,
      opacity: 0.18,
    });
    const crosshair = new THREE.LineSegments(lineGeo, thinLineMat);
    lineGroup.add(crosshair);
    mainGroup.add(lineGroup);

    // Mouse Tracking setup
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = -(y / rect.height) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse interaction
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Group rotation
      mainGroup.rotation.y = elapsedTime * 0.15 + targetX * 0.5;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1 + targetY * 0.5;

      innerCore.rotation.y = -elapsedTime * 0.2;
      innerCore.rotation.z = elapsedTime * 0.1;

      outerRing.rotation.z = elapsedTime * 0.08;

      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ringGeo.dispose();
      coreGeo.dispose();
      particleGeo.dispose();
      lineMat.dispose();
      coreMat.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] flex items-center justify-center">
      {/* Three.js Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Subtle brand overlay mark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="text-center space-y-1">
          <span className="font-display font-bold text-4xl sm:text-6xl text-[#111111]/[0.08] tracking-widest uppercase select-none">
            KINETIC
          </span>
          <p className="text-[10px] tracking-eyebrow text-[#666666]/60 uppercase font-mono select-none">
            EST. 2026 • DIGITAL ARCHITECTURE
          </p>
        </div>
      </div>
    </div>
  );
};
