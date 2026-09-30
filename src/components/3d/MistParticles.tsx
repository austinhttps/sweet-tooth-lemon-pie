import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MistParticlesProps {
  isSpraying: boolean;
  sprayOrigin: [number, number, number];
}

// Procedural ultra-soft Gaussian aerosol cloud sprite with golden-citrus luminance
const createAerosolCloudTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const center = 64;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, 64);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
    gradient.addColorStop(0.2, 'rgba(254, 240, 138, 0.85)');
    gradient.addColorStop(0.45, 'rgba(250, 204, 21, 0.55)');
    gradient.addColorStop(0.7, 'rgba(234, 179, 8, 0.25)');
    gradient.addColorStop(1, 'rgba(202, 138, 4, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

// Procedural glistening micro-droplet sprite with bright diamond sparkle
const createMicroDropletTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const center = 32;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(0.25, 'rgba(255, 253, 204, 0.95)');
    gradient.addColorStop(0.55, 'rgba(245, 158, 11, 0.65)');
    gradient.addColorStop(0.8, 'rgba(217, 119, 6, 0.2)');
    gradient.addColorStop(1, 'rgba(180, 83, 9, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

export const MistParticles: React.FC<MistParticlesProps> = ({ isSpraying, sprayOrigin }) => {
  const vaporPointsRef = useRef<THREE.Points>(null);
  const dropletPointsRef = useRef<THREE.Points>(null);

  const VAPOR_COUNT = 800;
  const DROPLET_COUNT = 1200;

  const vaporTexture = useMemo(() => createAerosolCloudTexture(), []);
  const dropletTexture = useMemo(() => createMicroDropletTexture(), []);

  // Vapor State arrays
  const [vapPos, vapVel, vapLife, vapMaxLife] = useMemo(() => {
    const pos = new Float32Array(VAPOR_COUNT * 3);
    const vel = new Float32Array(VAPOR_COUNT * 3);
    const life = new Float32Array(VAPOR_COUNT);
    const maxLife = new Float32Array(VAPOR_COUNT);
    for (let i = 0; i < VAPOR_COUNT; i++) {
      pos[i * 3] = sprayOrigin[0];
      pos[i * 3 + 1] = -100;
      pos[i * 3 + 2] = sprayOrigin[2];
      life[i] = 0;
      maxLife[i] = 1.0;
    }
    return [pos, vel, life, maxLife];
  }, [sprayOrigin]);

  // Droplet State arrays
  const [dropPos, dropVel, dropLife, dropMaxLife] = useMemo(() => {
    const pos = new Float32Array(DROPLET_COUNT * 3);
    const vel = new Float32Array(DROPLET_COUNT * 3);
    const life = new Float32Array(DROPLET_COUNT);
    const maxLife = new Float32Array(DROPLET_COUNT);
    for (let i = 0; i < DROPLET_COUNT; i++) {
      pos[i * 3] = sprayOrigin[0];
      pos[i * 3 + 1] = -100;
      pos[i * 3 + 2] = sprayOrigin[2];
      life[i] = 0;
      maxLife[i] = 1.0;
    }
    return [pos, vel, life, maxLife];
  }, [sprayOrigin]);

  const vaporCursor = useRef(0);
  const dropletCursor = useRef(0);

  // Spawn new particles continuously while isSpraying is active
  useFrame((_, delta) => {
    let vaporNeedsUpdate = false;
    let dropletNeedsUpdate = false;

    if (isSpraying) {
      // Spawn batch of vapor puffs per frame
      const vaporSpawnCount = 18;
      for (let s = 0; s < vaporSpawnCount; s++) {
        const idx = vaporCursor.current;
        vaporCursor.current = (vaporCursor.current + 1) % VAPOR_COUNT;

        // Nozzle exit point
        vapPos[idx * 3] = sprayOrigin[0] + (Math.random() - 0.5) * 0.04;
        vapPos[idx * 3 + 1] = sprayOrigin[1] + (Math.random() - 0.5) * 0.04;
        vapPos[idx * 3 + 2] = sprayOrigin[2] + 0.02 + Math.random() * 0.03;

        // Conical spray cone: forward (+Z), upward (+Y), and broad fan spread (+-X)
        const spreadAngleX = (Math.random() - 0.5) * 0.75;
        const spreadAngleY = (Math.random() - 0.2) * 0.65;
        const speed = 2.8 + Math.random() * 3.6;

        vapVel[idx * 3] = spreadAngleX * speed;
        vapVel[idx * 3 + 1] = spreadAngleY * speed + 0.6; // gentle upward plume
        vapVel[idx * 3 + 2] = (1.0 - Math.abs(spreadAngleX) * 0.4) * speed;

        const dur = 1.1 + Math.random() * 0.6;
        vapLife[idx] = dur;
        vapMaxLife[idx] = dur;
      }
      vaporNeedsUpdate = true;

      // Spawn batch of fine micro-droplets per frame
      const dropletSpawnCount = 30;
      for (let s = 0; s < dropletSpawnCount; s++) {
        const idx = dropletCursor.current;
        dropletCursor.current = (dropletCursor.current + 1) % DROPLET_COUNT;

        dropPos[idx * 3] = sprayOrigin[0] + (Math.random() - 0.5) * 0.03;
        dropPos[idx * 3 + 1] = sprayOrigin[1] + (Math.random() - 0.5) * 0.03;
        dropPos[idx * 3 + 2] = sprayOrigin[2] + 0.02 + Math.random() * 0.02;

        const spreadAngleX = (Math.random() - 0.5) * 0.55;
        const spreadAngleY = (Math.random() - 0.25) * 0.45;
        const speed = 4.0 + Math.random() * 4.5;

        dropVel[idx * 3] = spreadAngleX * speed;
        dropVel[idx * 3 + 1] = spreadAngleY * speed + 0.4;
        dropVel[idx * 3 + 2] = (1.0 - Math.abs(spreadAngleX) * 0.3) * speed;

        const dur = 0.85 + Math.random() * 0.45;
        dropLife[idx] = dur;
        dropMaxLife[idx] = dur;
      }
      dropletNeedsUpdate = true;
    }

    // Update Vapor Particles Physics
    if (vaporPointsRef.current) {
      const posAttr = vaporPointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < VAPOR_COUNT; i++) {
        if (vapLife[i] > 0) {
          vaporNeedsUpdate = true;
          vapLife[i] -= delta;

          // Drag and atmospheric billow deceleration
          vapPos[i * 3] += vapVel[i * 3] * delta;
          vapPos[i * 3 + 1] += vapVel[i * 3 + 1] * delta;
          vapPos[i * 3 + 2] += vapVel[i * 3 + 2] * delta;

          vapVel[i * 3] *= 0.92;
          vapVel[i * 3 + 1] = (vapVel[i * 3 + 1] * 0.93) + 0.012; // buoyant warm convection
          vapVel[i * 3 + 2] *= 0.90;
        } else {
          vapPos[i * 3 + 1] = -100;
        }
      }
      if (vaporNeedsUpdate) {
        posAttr.needsUpdate = true;
      }
    }

    // Update Droplet Particles Physics
    if (dropletPointsRef.current) {
      const posAttr = dropletPointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < DROPLET_COUNT; i++) {
        if (dropLife[i] > 0) {
          dropletNeedsUpdate = true;
          dropLife[i] -= delta;

          dropPos[i * 3] += dropVel[i * 3] * delta;
          dropPos[i * 3 + 1] += dropVel[i * 3 + 1] * delta;
          dropPos[i * 3 + 2] += dropVel[i * 3 + 2] * delta;

          dropVel[i * 3] *= 0.94;
          dropVel[i * 3 + 1] = (dropVel[i * 3 + 1] * 0.94) - 0.005; // tiny gravitational settling
          dropVel[i * 3 + 2] *= 0.92;
        } else {
          dropPos[i * 3 + 1] = -100;
        }
      }
      if (dropletNeedsUpdate) {
        posAttr.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {/* 1. Soft Expanding Volumetric Vapor Fog Billows */}
      <points ref={vaporPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[vapPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.92}
          map={vaporTexture}
          color="#ffffff"
          transparent
          opacity={0.88}
          blending={THREE.NormalBlending}
          depthWrite={false}
          sizeAttenuation={true}
        />
      </points>

      {/* 2. Crisp Glistening Micro-Aerosol Droplets */}
      <points ref={dropletPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dropPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.42}
          map={dropletTexture}
          color="#ffffff"
          transparent
          opacity={0.96}
          blending={THREE.NormalBlending}
          depthWrite={false}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
};
