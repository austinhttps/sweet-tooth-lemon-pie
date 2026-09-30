import React, { useRef, useState, useMemo } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';
import type { FlavorConfig } from '../../types';
import confetti from 'canvas-confetti';

interface LemonPieModelProps {
  flavor: FlavorConfig;
  mousePos: { x: number; y: number };
  onPieClick?: () => void;
  isBitten?: boolean;
}

export const LemonPieModel: React.FC<LemonPieModelProps> = ({
  flavor,
  mousePos,
  onPieClick,
  isBitten = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const pieRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clickScale, setClickScale] = useState(1);

  // Pie base crust points for LatheGeometry (fluted pie tin & pastry crust)
  const crustGeo = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0, -0.05));
    points.push(new THREE.Vector2(2.1, -0.05));
    points.push(new THREE.Vector2(2.4, 0.08));
    points.push(new THREE.Vector2(2.7, 0.45));
    points.push(new THREE.Vector2(2.85, 0.7));
    points.push(new THREE.Vector2(3.0, 0.78));
    points.push(new THREE.Vector2(2.9, 0.7));
    points.push(new THREE.Vector2(2.6, 0.35));
    points.push(new THREE.Vector2(2.3, 0.05));
    points.push(new THREE.Vector2(0, 0.05));
    return new THREE.LatheGeometry(points, 48);
  }, []);

  // Fluted crust crimps around the edge
  const crimpPositions = useMemo(() => {
    const crimps: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
    const count = 32;
    const radius = 2.9;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      crimps.push({
        pos: [Math.cos(angle) * radius, 0.72, Math.sin(angle) * radius],
        rot: [0, -angle, 0.2],
      });
    }
    return crimps;
  }, []);

  // Meringue swirls/peaks arrangement
  const meringuePeaks = useMemo(() => {
    const peaks: { pos: [number, number, number]; scale: number; rotY: number; height: number }[] = [];
    
    // Outer ring peaks
    const outerCount = 12;
    const outerRadius = 1.9;
    for (let i = 0; i < outerCount; i++) {
      const angle = (i / outerCount) * Math.PI * 2 + 0.1;
      peaks.push({
        pos: [Math.cos(angle) * outerRadius, 0.72, Math.sin(angle) * outerRadius],
        scale: 0.52 + (i % 2) * 0.06,
        rotY: angle + 0.3,
        height: 0.55,
      });
    }

    // Mid ring peaks
    const midCount = 8;
    const midRadius = 1.15;
    for (let i = 0; i < midCount; i++) {
      const angle = (i / midCount) * Math.PI * 2 + 0.4;
      peaks.push({
        pos: [Math.cos(angle) * midRadius, 0.92, Math.sin(angle) * midRadius],
        scale: 0.58 + (i % 3) * 0.05,
        rotY: angle,
        height: 0.65,
      });
    }

    // Inner ring peaks
    const innerCount = 5;
    const innerRadius = 0.55;
    for (let i = 0; i < innerCount; i++) {
      const angle = (i / innerCount) * Math.PI * 2 + 0.7;
      peaks.push({
        pos: [Math.cos(angle) * innerRadius, 1.12, Math.sin(angle) * innerRadius],
        scale: 0.54,
        rotY: angle,
        height: 0.7,
      });
    }

    // Center grand crown peak
    peaks.push({
      pos: [0, 1.32, 0],
      scale: 0.72,
      rotY: 0,
      height: 0.8,
    });

    return peaks;
  }, []);

  // Sugar crystals / sprinkles
  const sprinkles = useMemo(() => {
    const items: { pos: [number, number, number]; rot: [number, number, number]; color: string }[] = [];
    const colors = ['#fef08a', '#fbcfe8', '#ffffff', '#fed7aa', '#fde047'];
    for (let i = 0; i < 40; i++) {
      const r = Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const y = 0.85 + Math.cos(r * 0.7) * 0.55;
      items.push({
        pos: [Math.cos(theta) * r, y, Math.sin(theta) * r],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        color: colors[i % colors.length],
      });
    }
    return items;
  }, []);

  // Frame animation: float, wobble, mouse leaning
  useFrame((state, delta) => {
    if (!pieRef.current || !groupRef.current) return;

    // Smooth hover / click scale recovery
    const targetScale = (hovered ? 1.05 : 1.0) * clickScale;
    pieRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);

    // Mouse tilt / parallax with forward default tilt (0.3 rad) for beauty angle
    const defaultPitch = 0.35;
    const targetRotX = defaultPitch + mousePos.y * 0.22 + (hovered ? -0.05 : 0);
    const targetRotY = mousePos.x * 0.35 + state.clock.elapsedTime * 0.1;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);

    // Reset click scale gradually
    if (clickScale !== 1) {
      setClickScale((prev) => THREE.MathUtils.lerp(prev, 1, delta * 6));
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setClickScale(0.93);
    
    // Trigger festive sugar sprinkle confetti in screen coords
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { x: 0.5, y: 0.55 },
      colors: [flavor.curdColor, flavor.meringueColor, flavor.toastColor, '#ffffff', '#ffd700'],
      ticks: 220,
      gravity: 0.9,
      scalar: 1.1,
      shapes: ['circle', 'square'],
    });

    if (onPieClick) onPieClick();
  };

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      <Float speed={2.0} rotationIntensity={0.12} floatIntensity={0.3}>
        <group
          ref={pieRef}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Outer Ceramic Scalloped Serving Plate */}
          <mesh position={[0, -0.22, 0]} receiveShadow>
            <cylinderGeometry args={[3.4, 2.7, 0.18, 48]} />
            <meshPhysicalMaterial
              color="#ffffff"
              roughness={0.06}
              metalness={0.02}
              clearcoat={1}
              clearcoatRoughness={0.04}
              reflectivity={0.95}
            />
          </mesh>

          {/* Gold plate rim ring laying flat on the plate */}
          <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.35, 0.04, 16, 64]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.85} roughness={0.18} />
          </mesh>

          {/* Buttery Baked Fluted Pie Crust */}
          <mesh geometry={crustGeo} position={[0, -0.05, 0]} castShadow receiveShadow>
            <meshStandardMaterial
              color={flavor.crustColor}
              roughness={0.7}
              metalness={0.05}
              bumpScale={0.06}
            />
          </mesh>

          {/* Crust Crimps / Fluting around edge */}
          {crimpPositions.map((crimp, idx) => (
            <mesh key={idx} position={crimp.pos} rotation={crimp.rot as [number, number, number]} castShadow>
              <sphereGeometry args={[0.11, 12, 12]} />
              <meshStandardMaterial color={flavor.crustColor} roughness={0.65} />
            </mesh>
          ))}

          {/* Glossy Luscious Lemon Curd Filling */}
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[2.65, 2.3, 0.48, 48]} />
            <meshPhysicalMaterial
              color={flavor.curdColor}
              emissive={flavor.curdColor}
              emissiveIntensity={0.18}
              roughness={0.1}
              metalness={0.02}
              transmission={0.45}
              thickness={1.3}
              ior={1.46}
              clearcoat={1.0}
              clearcoatRoughness={0.06}
            />
          </mesh>

          {/* Meringue Peaks / Swirls */}
          <group position={[0, 0.05, 0]}>
            {meringuePeaks.map((peak, idx) => (
              <group key={idx} position={peak.pos} rotation={[0, peak.rotY, 0]} scale={peak.scale}>
                {/* Base pillowy dome */}
                <mesh castShadow receiveShadow>
                  <sphereGeometry args={[0.55, 18, 18]} />
                  <meshPhysicalMaterial
                    color={flavor.meringueColor}
                    roughness={0.3}
                    clearcoat={0.7}
                    clearcoatRoughness={0.15}
                    sheen={1}
                    sheenColor={new THREE.Color('#fff9eb')}
                  />
                </mesh>

                {/* Swirling pointy peak cone */}
                <mesh position={[0, 0.28, 0]} castShadow>
                  <coneGeometry args={[0.34, peak.height, 16]} />
                  <meshPhysicalMaterial
                    color={flavor.meringueColor}
                    roughness={0.28}
                    clearcoat={0.6}
                  />
                </mesh>

                {/* Torched Golden-Brown Caramel Kiss Tip */}
                <mesh position={[0, 0.2 + peak.height * 0.55, 0]} scale={[0.12, 0.16, 0.12]}>
                  <coneGeometry args={[0.9, 1.4, 12]} />
                  <meshStandardMaterial
                    color={flavor.toastColor}
                    roughness={0.4}
                    metalness={0.1}
                  />
                </mesh>
              </group>
            ))}
          </group>

          {/* Candied Lemon Wheel Garnish (Tilted atop meringue crown) */}
          <group position={[0.25, 2.05, 0.2]} rotation={[0.4, 0.35, -0.35]} scale={0.65}>
            {/* Outer Lemon Rind */}
            <mesh castShadow>
              <torusGeometry args={[0.85, 0.08, 16, 32]} />
              <meshStandardMaterial color="#facc15" roughness={0.35} />
            </mesh>
            {/* White Pith Ring */}
            <mesh>
              <torusGeometry args={[0.79, 0.035, 16, 32]} />
              <meshStandardMaterial color="#fef9c3" roughness={0.6} />
            </mesh>
            {/* Translucent Juicy Lemon Pulp Segments */}
            {Array.from({ length: 8 }).map((_, i) => {
              const segAngle = (i / 8) * Math.PI * 2;
              return (
                <mesh
                  key={i}
                  position={[Math.cos(segAngle + 0.39) * 0.42, Math.sin(segAngle + 0.39) * 0.42, 0]}
                  rotation={[0, 0, segAngle + 0.39]}
                  castShadow
                >
                  <boxGeometry args={[0.34, 0.22, 0.04]} />
                  <meshPhysicalMaterial
                    color="#fde047"
                    transmission={0.7}
                    roughness={0.08}
                    ior={1.42}
                    thickness={0.3}
                    clearcoat={1}
                  />
                </mesh>
              );
            })}
            {/* Center Core */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
              <meshStandardMaterial color="#fef08a" roughness={0.5} />
            </mesh>
          </group>

          {/* Glazed Maraschino Cherry with Glossy Sheen & Curved Stem */}
          <group position={[-0.45, 1.95, -0.25]} scale={0.36}>
            <mesh castShadow>
              <sphereGeometry args={[0.55, 24, 24]} />
              <meshPhysicalMaterial
                color="#dc2626"
                roughness={0.06}
                clearcoat={1.0}
                clearcoatRoughness={0.04}
                reflectivity={0.95}
                emissive="#7f1d1d"
                emissiveIntensity={0.2}
              />
            </mesh>
            {/* Cherry Stem */}
            <mesh position={[0.08, 0.42, 0.04]} rotation={[0.2, 0, -0.25]}>
              <cylinderGeometry args={[0.02, 0.02, 0.5, 12]} />
              <meshStandardMaterial color="#4d7c0f" roughness={0.5} />
            </mesh>
          </group>

          {/* Fresh Mint Sprig Garnish */}
          <group position={[0.42, 1.88, -0.18]} rotation={[0.3, 0.7, -0.2]} scale={0.34}>
            <mesh castShadow>
              <sphereGeometry args={[0.48, 16, 16]} />
              <meshStandardMaterial color="#22c55e" roughness={0.4} />
            </mesh>
          </group>

          {/* Sugar Crystal Sprinkles */}
          {sprinkles.map((sp, idx) => (
            <mesh key={idx} position={sp.pos} rotation={sp.rot as [number, number, number]} scale={0.04}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color={sp.color}
                roughness={0.15}
                metalness={0.2}
                emissive={sp.color}
                emissiveIntensity={0.25}
              />
            </mesh>
          ))}

          {/* Interactive Aura Ring / Halo underneath */}
          <mesh position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[3.1, 3.6, 64]} />
            <meshBasicMaterial
              color={flavor.curdColor}
              transparent
              opacity={hovered ? 0.35 : 0.18}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Decorative bite indicator spark if bitten */}
          {isBitten && (
            <mesh position={[1.4, 1.0, 1.4]} scale={0.2}>
              <sphereGeometry args={[0.5, 12, 12]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
            </mesh>
          )}
        </group>
      </Float>
    </group>
  );
};
