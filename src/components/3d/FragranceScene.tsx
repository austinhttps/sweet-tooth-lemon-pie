import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { PerfumeBottleModel } from './PerfumeBottleModel';

interface FragranceSceneProps {
  isUnwrapped: boolean;
  onUnwrap: () => void;
  onRewrap: () => void;
  isSpraying: boolean;
  onSpritz: () => void;
  mousePos: { x: number; y: number };
}

// Single centered bottle with organic floating & subtle mouse tilt
const FloatingBottle: React.FC<{
  isUnwrapped: boolean;
  onUnwrap: () => void;
  onRewrap: () => void;
  isSpraying: boolean;
  onSpritz: () => void;
  mousePos: { x: number; y: number };
}> = ({ isUnwrapped, onUnwrap, onRewrap, isSpraying, onSpritz, mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetRotX = mousePos.y * 0.1;
    const targetRotY = mousePos.x * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      <Float speed={1.4} rotationIntensity={0.06} floatIntensity={0.18}>
        {/* ONE Central 75ml Bottle with its own removable wrapper sleeve & cap */}
        <PerfumeBottleModel
          position={[0, 0, 0]}
          isUnwrapped={isUnwrapped}
          onUnwrap={onUnwrap}
          onRewrap={onRewrap}
          isSpraying={isSpraying}
          onSpritz={onSpritz}
        />

        {/* Ambient Golden Fragrance Sparkles */}
        <Sparkles
          count={24}
          scale={6}
          size={1.6}
          speed={0.3}
          opacity={0.35}
          color="#fde047"
        />
      </Float>
    </group>
  );
};

export const FragranceScene: React.FC<FragranceSceneProps> = ({
  isUnwrapped,
  onUnwrap,
  onRewrap,
  isSpraying,
  onSpritz,
  mousePos,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Studio HDRI Environment for realistic metallic gold and satin reflections */}
          <Environment preset="studio" environmentIntensity={0.45} />

          {/* 360 Studio Lighting Setup for all-around illumination */}
          <ambientLight intensity={0.8} color="#fffdf0" />

          {/* Key Front Light */}
          <directionalLight
            position={[3, 5, 5]}
            intensity={1.1}
            color="#fffef7"
          />

          {/* Left Fill Light */}
          <directionalLight
            position={[-4, 2, 4]}
            intensity={0.7}
            color="#fef3c7"
          />

          {/* Top Back Rim Light */}
          <directionalLight
            position={[0, 4, -5]}
            intensity={0.9}
            color="#fef9c3"
          />

          {/* Bottom Fill Light for when viewing from underneath in 360 */}
          <directionalLight
            position={[0, -4, 2]}
            intensity={0.4}
            color="#fde68a"
          />

          {/* The Single Centered Floating Model */}
          <FloatingBottle
            isUnwrapped={isUnwrapped}
            onUnwrap={onUnwrap}
            onRewrap={onRewrap}
            isSpraying={isSpraying}
            onSpritz={onSpritz}
            mousePos={mousePos}
          />

          {/* True 360 Degree OrbitControls without floor/ground boundaries */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2.5}
            maxDistance={10.0}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            dampingFactor={0.06}
            rotateSpeed={0.65}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
