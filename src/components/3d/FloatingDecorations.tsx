import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

interface FloatingDecorationsProps {
  mousePos: { x: number; y: number };
}

// 3D Candy Heart Geometry Generator
const createHeartShape = () => {
  const shape = new THREE.Shape();
  const x = 0, y = 0;
  shape.moveTo(x + 0.25, y + 0.25);
  shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
  shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
  shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
  shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
  shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
  shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
  return shape;
};

// 4-pointed Sparkle Star Geometry Generator
const createSparkleGeometry = () => {
  const shape = new THREE.Shape();
  const points = 4;
  const outerR = 0.45;
  const innerR = 0.11;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i / (points * 2)) * Math.PI * 2;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(px, py);
    else shape.lineTo(px, py);
  }
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.1,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  });
};

export const FloatingDecorations: React.FC<FloatingDecorationsProps> = ({ mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);

  const heartGeo = useMemo(() => {
    const shape = createHeartShape();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
  }, []);

  const sparkleGeo = useMemo(() => createSparkleGeometry(), []);

  // Floating Lemon Slices data (positioned in background framing the pie)
  const lemonSlices = useMemo(() => {
    return [
      { pos: [-5.2, 2.6, -3.5], rot: [0.4, 0.5, 0.2], scale: 0.7, speed: 1.8 },
      { pos: [5.2, 2.2, -3.8], rot: [-0.3, 0.8, 0.5], scale: 0.75, speed: 1.5 },
      { pos: [-4.8, -2.0, -3.2], rot: [0.6, -0.4, 0.3], scale: 0.65, speed: 2.1 },
      { pos: [4.9, -2.2, -3.5], rot: [-0.5, 0.3, -0.4], scale: 0.68, speed: 1.9 },
      { pos: [-2.8, 4.0, -5.0], rot: [0.2, 0.9, -0.5], scale: 0.6, speed: 2.3 },
      { pos: [3.0, 3.8, -4.8], rot: [0.7, -0.6, 0.2], scale: 0.62, speed: 1.6 },
    ];
  }, []);

  // Floating Candy Hearts data (Sweet Short n' Sweet themed colors)
  const candyHearts = useMemo(() => {
    return [
      { pos: [-4.5, 0.6, -2.5], color: '#fbcfe8', scale: 0.65, speed: 2.0 }, // Pink
      { pos: [4.6, -0.5, -2.2], color: '#fef08a', scale: 0.7, speed: 1.7 }, // Yellow
      { pos: [-3.4, 2.8, -3.8], color: '#bae6fd', scale: 0.6, speed: 2.4 }, // Sky blue
      { pos: [3.6, 2.8, -3.5], color: '#fed7aa', scale: 0.62, speed: 1.9 }, // Peach
      { pos: [-4.6, -1.6, -3.8], color: '#e9d5ff', scale: 0.58, speed: 2.0 }, // Lavender
      { pos: [4.2, -2.6, -4.0], color: '#fbcfe8', scale: 0.62, speed: 2.1 },
    ];
  }, []);

  // Floating Sparkles / Diamond Stars
  const sparkleStars = useMemo(() => {
    return [
      { pos: [-3.8, 2.2, -2.2], color: '#fbbf24', scale: 0.55, speed: 3.0 },
      { pos: [4.0, 2.6, -2.5], color: '#f59e0b', scale: 0.65, speed: 2.6 },
      { pos: [-3.2, -1.8, -2.0], color: '#f472b6', scale: 0.5, speed: 3.2 },
      { pos: [3.4, -2.2, -2.2], color: '#38bdf8', scale: 0.52, speed: 2.8 },
      { pos: [0.0, 4.0, -4.0], color: '#fef08a', scale: 0.65, speed: 3.1 },
      { pos: [-1.5, -3.5, -3.0], color: '#fbbf24', scale: 0.5, speed: 2.5 },
      { pos: [5.2, 0.4, -3.0], color: '#fed7aa', scale: 0.55, speed: 2.9 },
      { pos: [-5.2, -0.2, -3.2], color: '#fbcfe8', scale: 0.6, speed: 3.3 },
    ];
  }, []);

  // Floating Whipped Cream / Marshmallow dollops
  const creamDollops = useMemo(() => {
    return [
      { pos: [-3.5, 1.4, -3.8], scale: 0.38, speed: 1.6 },
      { pos: [3.8, 1.0, -3.6], scale: 0.42, speed: 1.8 },
      { pos: [-2.2, -2.8, -3.2], scale: 0.35, speed: 2.0 },
      { pos: [2.6, -2.9, -3.5], scale: 0.36, speed: 1.7 },
    ];
  }, []);

  // Mouse tilt / parallax animation
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetX = mousePos.x * 0.35;
    const targetY = mousePos.y * 0.25;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 2);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 2);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mousePos.x * 0.1, delta * 2);
  });

  return (
    <group ref={groupRef}>
      {/* 3D Floating Lemon Slices */}
      {lemonSlices.map((slice, i) => (
        <Float
          key={`lemon-${i}`}
          position={slice.pos as [number, number, number]}
          rotation={slice.rot as [number, number, number]}
          speed={slice.speed}
          rotationIntensity={1.0}
          floatIntensity={1.2}
        >
          <group scale={slice.scale}>
            {/* Outer Rind */}
            <mesh castShadow>
              <torusGeometry args={[0.9, 0.08, 16, 32]} />
              <meshStandardMaterial color="#facc15" roughness={0.3} metalness={0.1} />
            </mesh>
            {/* Inner Pith */}
            <mesh>
              <torusGeometry args={[0.83, 0.035, 16, 32]} />
              <meshStandardMaterial color="#fef9c3" roughness={0.6} />
            </mesh>
            {/* Pulp Segments */}
            {Array.from({ length: 8 }).map((_, j) => {
              const segAngle = (j / 8) * Math.PI * 2;
              return (
                <mesh
                  key={j}
                  position={[Math.cos(segAngle + 0.39) * 0.44, Math.sin(segAngle + 0.39) * 0.44, 0]}
                  rotation={[0, 0, segAngle + 0.39]}
                >
                  <boxGeometry args={[0.36, 0.24, 0.04]} />
                  <meshPhysicalMaterial
                    color="#fde047"
                    transmission={0.7}
                    roughness={0.1}
                    ior={1.42}
                    thickness={0.3}
                    clearcoat={0.9}
                  />
                </mesh>
              );
            })}
            {/* Core */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
              <meshStandardMaterial color="#fef08a" roughness={0.5} />
            </mesh>
          </group>
        </Float>
      ))}

      {/* 3D Floating Candy Hearts */}
      {candyHearts.map((heart, i) => (
        <Float
          key={`heart-${i}`}
          position={heart.pos as [number, number, number]}
          speed={heart.speed}
          rotationIntensity={1.2}
          floatIntensity={1.4}
        >
          <group scale={heart.scale} rotation={[0, Math.sin(i) * 0.5, -0.2]}>
            <mesh geometry={heartGeo} castShadow receiveShadow position={[-0.25, -0.45, 0]}>
              <meshPhysicalMaterial
                color={heart.color}
                roughness={0.35}
                metalness={0.05}
                clearcoat={0.4}
                clearcoatRoughness={0.2}
                sheen={0.8}
                sheenColor={new THREE.Color('#ffffff')}
              />
            </mesh>
          </group>
        </Float>
      ))}

      {/* 3D Floating Retro Sparkle Stars */}
      {sparkleStars.map((sparkle, i) => (
        <Float
          key={`sparkle-${i}`}
          position={sparkle.pos as [number, number, number]}
          speed={sparkle.speed}
          rotationIntensity={1.8}
          floatIntensity={1.2}
        >
          <group scale={sparkle.scale}>
            <mesh geometry={sparkleGeo} castShadow>
              <meshPhysicalMaterial
                color={sparkle.color}
                emissive={sparkle.color}
                emissiveIntensity={0.35}
                roughness={0.1}
                metalness={0.7}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
              />
            </mesh>
          </group>
        </Float>
      ))}

      {/* 3D Floating Whipped Cream / Marshmallows */}
      {creamDollops.map((dollop, i) => (
        <Float
          key={`dollop-${i}`}
          position={dollop.pos as [number, number, number]}
          speed={dollop.speed}
          rotationIntensity={0.8}
          floatIntensity={1.0}
        >
          <group scale={dollop.scale}>
            <mesh castShadow>
              <sphereGeometry args={[0.6, 18, 18]} />
              <meshPhysicalMaterial
                color="#fffdf7"
                roughness={0.4}
                clearcoat={0.4}
                sheen={0.8}
                sheenColor={new THREE.Color('#fef3c7')}
              />
            </mesh>
            <mesh position={[0, 0.35, 0]} scale={[0.45, 0.65, 0.45]}>
              <coneGeometry args={[0.45, 0.7, 16]} />
              <meshPhysicalMaterial color="#fffdf7" roughness={0.4} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
};
