import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Sparkles } from '@react-three/drei';
import { LemonPieModel } from './LemonPieModel';
import { FloatingDecorations } from './FloatingDecorations';
import type { FlavorConfig } from '../../types';

interface SceneProps {
  flavor: FlavorConfig;
  mousePos: { x: number; y: number };
  onPieClick?: () => void;
  isBitten?: boolean;
}

export const Scene: React.FC<SceneProps> = ({
  flavor,
  mousePos,
  onPieClick,
  isBitten = false,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 3.8, 8.2], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Ambient light for soft pastel baseline */}
          <ambientLight intensity={0.95} />

          {/* Key Warm Sun / Bakery Light */}
          <directionalLight
            position={[5, 10, 6]}
            intensity={2.0 * flavor.lightIntensity}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
            color="#fffdf5"
          />

          {/* Soft Pastel Blue Rim Light (Short n' Sweet sky blue contrast) */}
          <directionalLight
            position={[-7, 4, -4]}
            intensity={1.2}
            color="#bae6fd"
          />

          {/* Warm Honey / Blush Backlight */}
          <pointLight
            position={[0, -2, -3]}
            intensity={1.5}
            color="#fed7aa"
          />

          {/* Flavor-specific Accent Highlight Light */}
          <pointLight
            position={[0, 4, 3]}
            intensity={1.0}
            color={flavor.curdColor}
          />

          {/* 3D Floating Decor & Central Lemon Pie */}
          <FloatingDecorations mousePos={mousePos} />
          
          <LemonPieModel
            flavor={flavor}
            mousePos={mousePos}
            onPieClick={onPieClick}
            isBitten={isBitten}
          />

          {/* Golden Sugar Sparkles in 3D Space */}
          <Sparkles
            count={70}
            scale={11}
            size={3.4}
            speed={0.7}
            opacity={0.65}
            color="#fbbf24"
          />
          <Sparkles
            count={45}
            scale={9}
            size={2.6}
            speed={0.9}
            opacity={0.45}
            color="#fbcfe8"
          />

          {/* Contact Shadows on ground */}
          <ContactShadows
            position={[0, -2.0, 0]}
            opacity={0.4}
            scale={12}
            blur={2.4}
            far={4}
            color="#78350f"
          />

          {/* Controlled OrbitControls with smooth damping */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={4.5}
            maxDistance={11.0}
            minPolarAngle={Math.PI / 5.5} // Upper hemisphere view
            maxPolarAngle={Math.PI / 2 - 0.05} // Never look under the plate!
            dampingFactor={0.06}
            rotateSpeed={0.6}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
