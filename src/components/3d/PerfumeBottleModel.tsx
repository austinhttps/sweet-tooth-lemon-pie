import React, { useRef, useMemo } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { MistParticles } from './MistParticles';

interface PerfumeBottleModelProps {
  position?: [number, number, number];
  isUnwrapped: boolean;
  onUnwrap: () => void;
  onRewrap: () => void;
  isSpraying: boolean;
  onSpritz: () => void;
}

// Procedural beveled chocolate segment geometry for realistic 3D chocolate bar look
const createBeveledSquareGeometry = (width: number, height: number) => {
  const shape = new THREE.Shape();
  const w = width - 0.08;
  const h = height - 0.08;
  shape.moveTo(-w / 2, -h / 2);
  shape.lineTo(w / 2, -h / 2);
  shape.lineTo(w / 2, h / 2);
  shape.lineTo(-w / 2, h / 2);
  shape.closePath();

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.02,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.035,
    bevelThickness: 0.035,
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  return geom;
};

export const PerfumeBottleModel: React.FC<PerfumeBottleModelProps> = ({
  position = [0, 0, 0],
  isUnwrapped,
  onUnwrap,
  onRewrap,
  isSpraying,
  onSpritz,
}) => {
  const bottleGroupRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Group>(null);
  const wrapperRef = useRef<THREE.Group>(null);
  const actuatorRef = useRef<THREE.Group>(null);

  // Exact real-world 75ml proportions: 3 columns x 4 rows
  const BOTTLE_WIDTH = 1.85;
  const TOTAL_HEIGHT = 3.9;
  const BOTTLE_DEPTH = 0.52;

  const CAP_HEIGHT = TOTAL_HEIGHT / 4; // 0.975 (top 1 row)
  const BASE_HEIGHT = (TOTAL_HEIGHT * 3) / 4; // 2.925 (bottom 3 rows)

  // Load official wrapper packaging texture
  const wrapperTexture = useTexture('/assets/carton_lemon_pie.jpg');

  useMemo(() => {
    if (wrapperTexture) {
      wrapperTexture.colorSpace = THREE.SRGBColorSpace;
      // Crop to the wrapper portion of the packaging artwork (torn silver foil down to bottom)
      wrapperTexture.repeat.set(0.403, 0.692);
      wrapperTexture.offset.set(0.299, 0.0707);
      wrapperTexture.wrapS = THREE.ClampToEdgeWrapping;
      wrapperTexture.wrapT = THREE.ClampToEdgeWrapping;
      wrapperTexture.generateMipmaps = true;
      wrapperTexture.minFilter = THREE.LinearMipmapLinearFilter;
      wrapperTexture.magFilter = THREE.LinearFilter;
      wrapperTexture.needsUpdate = true;
    }
  }, [wrapperTexture]);

  // Luxury back label texture for wrapper reverse side
  const wrapperBackTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#fceea7';
      ctx.fillRect(0, 0, 512, 1024);

      ctx.strokeStyle = '#c58e26';
      ctx.lineWidth = 6;
      ctx.strokeRect(26, 32, 460, 960);
      ctx.lineWidth = 2;
      ctx.strokeRect(34, 40, 444, 944);

      ctx.fillStyle = '#6b2d08';
      ctx.textAlign = 'center';
      ctx.font = 'bold 28px "DM Serif Display", Georgia, serif';
      ctx.fillText('SWEET TOOTH', 256, 125);
      ctx.font = 'italic 30px "Pinyon Script", cursive, serif';
      ctx.fillText('Lemon Pie', 256, 175);
      ctx.font = '600 13px "Montserrat", sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('EAU DE PARFUM', 256, 218);

      ctx.strokeStyle = '#c58e26';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 250);
      ctx.lineTo(432, 250);
      ctx.stroke();

      ctx.font = 'bold 12px "Montserrat", sans-serif';
      ctx.fillStyle = '#854d0e';
      ctx.fillText('OLFACTORY NOTES', 256, 295);
      ctx.font = '13px "Montserrat", sans-serif';
      ctx.fillStyle = '#572b07';
      ctx.fillText('Meyer Lemon Zest • Marshmallow Crème', 256, 325);
      ctx.fillText('Whipped Meringue • Golden Graham Crust', 256, 355);
      ctx.fillText('Warm Vanilla Bean • Candied Ginger', 256, 385);

      ctx.font = 'italic 16px "DM Serif Display", Georgia, serif';
      ctx.fillStyle = '#6b2d08';
      ctx.fillText('"Indulge your sweetest cravings."', 256, 500);
      ctx.font = '13px "Montserrat", sans-serif';
      ctx.fillText('— Sabrina Carpenter', 256, 530);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(156, 780, 200, 95);
      ctx.strokeStyle = '#1c1917';
      ctx.lineWidth = 2;
      for (let i = 168; i < 345; i += 6) {
        ctx.beginPath();
        ctx.moveTo(i, 790);
        ctx.lineTo(i, 855);
        ctx.stroke();
      }

      ctx.font = '600 12px "Montserrat", sans-serif';
      ctx.fillStyle = '#1c1917';
      ctx.fillText('75 mL / 2.5 FL. OZ.', 256, 915);
    }
    const canvasTex = new THREE.CanvasTexture(canvas);
    canvasTex.colorSpace = THREE.SRGBColorSpace;
    return canvasTex;
  }, []);

  // Beveled chocolate segment geometry
  const segmentGeometry = useMemo(() => {
    return createBeveledSquareGeometry(0.56, 0.92);
  }, []);

  // Soft satin pastel lemon yellow material (authentic gourmand finish)
  const chocolateMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#f6e693', // Pastel Meyer lemon yellow
      roughness: 0.42,  // Matte-satin finish
      metalness: 0.02,
    });
  }, []);

  // Polished gold metallic material for atomizer collar & nozzle
  const goldMetallicMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#d4982a',
      roughness: 0.16,
      metalness: 0.94,
    });
  }, []);

  // Dark inner cap socket material
  const innerSocketMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#422006',
      roughness: 0.6,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
  }, []);

  // Wrapper 6-sided materials: [+X, -X, +Y, -Y, +Z, -Z]
  const wrapperMaterials = useMemo(() => {
    const sideMat = new THREE.MeshStandardMaterial({
      color: '#faea98',
      roughness: 0.5,
      metalness: 0.02,
    });
    const frontMat = new THREE.MeshStandardMaterial({
      map: wrapperTexture,
      roughness: 0.42,
      metalness: 0.02,
    });
    const backMat = new THREE.MeshStandardMaterial({
      map: wrapperBackTexture,
      roughness: 0.48,
      metalness: 0.02,
    });

    return [sideMat, sideMat, sideMat, sideMat, frontMat, backMat];
  }, [wrapperTexture, wrapperBackTexture]);

  // Square segment coordinates (3 columns)
  const colXs = [-0.58, 0, 0.58];
  // Base rows coordinates (3 rows)
  const baseRowYs = [-0.975, 0, 0.975];

  // Frame animations: smooth wrapper drop/slide & cap detachment & nozzle depression
  useFrame((_, delta) => {
    // 1. Detachable Cap animation (closed: y = 1.4625, detached: y = 2.85, x = 0.55, rotZ = -0.28)
    if (capRef.current) {
      const targetCapY = isUnwrapped ? 2.85 : 1.4625;
      const targetCapX = isUnwrapped ? 0.55 : 0.0;
      const targetCapRotZ = isUnwrapped ? -0.28 : 0.0;
      const targetCapRotX = isUnwrapped ? 0.16 : 0.0;

      capRef.current.position.y = THREE.MathUtils.lerp(capRef.current.position.y, targetCapY, delta * 5);
      capRef.current.position.x = THREE.MathUtils.lerp(capRef.current.position.x, targetCapX, delta * 5);
      capRef.current.rotation.z = THREE.MathUtils.lerp(capRef.current.rotation.z, targetCapRotZ, delta * 5);
      capRef.current.rotation.x = THREE.MathUtils.lerp(capRef.current.rotation.x, targetCapRotX, delta * 5);
    }

    // 2. Wrapper Sleeve animation (wrapped: y = -0.4875, unwrapped: drops down to y = -5.5 and scales away)
    if (wrapperRef.current) {
      const targetWrapperY = isUnwrapped ? -5.5 : -0.4875;
      const targetWrapperScale = isUnwrapped ? 0.001 : 1.0;
      const targetWrapperRotX = isUnwrapped ? 0.4 : 0.0;

      wrapperRef.current.position.y = THREE.MathUtils.lerp(wrapperRef.current.position.y, targetWrapperY, delta * 4.5);
      wrapperRef.current.rotation.x = THREE.MathUtils.lerp(wrapperRef.current.rotation.x, targetWrapperRotX, delta * 4.5);
      wrapperRef.current.scale.setScalar(
        THREE.MathUtils.lerp(wrapperRef.current.scale.x, targetWrapperScale, delta * 4.5)
      );
    }

    // 3. Actuator dip animation when spraying
    if (actuatorRef.current) {
      const targetY = isSpraying ? 0.28 : 0.38;
      actuatorRef.current.position.y = THREE.MathUtils.lerp(actuatorRef.current.position.y, targetY, delta * 18);
    }
  });

  // Bottle Base Click (Sprays if unwrapped, unwrap if wrapped)
  const handleBottleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!isUnwrapped) {
      onUnwrap();
    } else {
      onSpritz();
    }
  };

  // Cap Click (Rewraps / puts cap and wrapper back on if unwrapped, unwrap if wrapped)
  const handleCapClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (isUnwrapped) {
      onRewrap();
    } else {
      onUnwrap();
    }
  };

  return (
    <group ref={bottleGroupRef} position={position}>
      {/* ========================================================= */}
      {/* 1. BOTTLE BASE (Bottom 3 Rows: 9 Chocolate Segments)      */}
      {/* ========================================================= */}
      <group
        position={[0, -0.4875, 0]}
        onClick={handleBottleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Main base solid bar core */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[BOTTLE_WIDTH, BASE_HEIGHT, BOTTLE_DEPTH]} />
          <primitive object={chocolateMaterial} attach="material" />
        </mesh>

        {/* Front Chocolate Segments (3 cols x 3 rows) */}
        {colXs.map((x, cIdx) =>
          baseRowYs.map((y, rIdx) => (
            <mesh
              key={`base-front-${cIdx}-${rIdx}`}
              position={[x, y, BOTTLE_DEPTH / 2 + 0.015]}
              geometry={segmentGeometry}
              castShadow
            >
              <primitive object={chocolateMaterial} attach="material" />
            </mesh>
          ))
        )}

        {/* Back Chocolate Segments (3 cols x 3 rows) */}
        {colXs.map((x, cIdx) =>
          baseRowYs.map((y, rIdx) => (
            <mesh
              key={`base-back-${cIdx}-${rIdx}`}
              position={[x, y, -BOTTLE_DEPTH / 2 - 0.015]}
              rotation={[0, Math.PI, 0]}
              geometry={segmentGeometry}
              castShadow
            >
              <primitive object={chocolateMaterial} attach="material" />
            </mesh>
          ))
        )}

        {/* ========================================================= */}
        {/* PROMINENT GOLD ATOMIZER & SPRAYER ASSEMBLY                */}
        {/* ========================================================= */}
        <group position={[0, BASE_HEIGHT / 2, 0]}>
          {/* Tier 1: Gold Base Collar Ring */}
          <mesh position={[0, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.30, 0.12, 32]} />
            <primitive object={goldMetallicMaterial} attach="material" />
          </mesh>

          {/* Tier 2: Gold Atomizer Neck Cylinder (Taller, pops out more) */}
          <mesh position={[0, 0.19, 0]} castShadow>
            <cylinderGeometry args={[0.20, 0.20, 0.16, 32]} />
            <primitive object={goldMetallicMaterial} attach="material" />
          </mesh>

          {/* Tier 3: Gold Spray Pump Actuator Head & Nozzle */}
          <group ref={actuatorRef} position={[0, 0.38, 0]}>
            {/* Actuator Head */}
            <mesh castShadow position={[0, 0, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.24, 32]} />
              <primitive object={goldMetallicMaterial} attach="material" />
            </mesh>

            {/* Sprayer Nozzle Hole */}
            <mesh position={[0, 0.03, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.03, 16]} />
              <meshBasicMaterial color="#1c1917" />
            </mesh>

            {/* Delicate gold bezel around spray hole */}
            <mesh position={[0, 0.03, 0.155]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.02, 0.038, 16]} />
              <meshStandardMaterial color="#fef08a" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>

          {/* Fragrance Liquid Dip Tube */}
          <mesh position={[0, -BASE_HEIGHT / 2, 0]}>
            <cylinderGeometry args={[0.016, 0.016, BASE_HEIGHT - 0.2, 16]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 2. REMOVABLE TOP CAP (With Socket Hole in the Bottom)     */}
      {/* ========================================================= */}
      <group
        ref={capRef}
        position={[0, 1.4625, 0]}
        onClick={handleCapClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Cap Main Shell Body */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[BOTTLE_WIDTH, CAP_HEIGHT, BOTTLE_DEPTH]} />
          <primitive object={chocolateMaterial} attach="material" />
        </mesh>

        {/* Cap Front Chocolate Segments (3 cols x 1 row) */}
        {colXs.map((x, cIdx) => (
          <mesh
            key={`cap-front-${cIdx}`}
            position={[x, 0, BOTTLE_DEPTH / 2 + 0.015]}
            geometry={segmentGeometry}
            castShadow
          >
            <primitive object={chocolateMaterial} attach="material" />
          </mesh>
        ))}

        {/* Cap Back Chocolate Segments (3 cols x 1 row) */}
        {colXs.map((x, cIdx) => (
          <mesh
            key={`cap-back-${cIdx}`}
            position={[x, 0, -BOTTLE_DEPTH / 2 - 0.015]}
            rotation={[0, Math.PI, 0]}
            geometry={segmentGeometry}
            castShadow
          >
            <primitive object={chocolateMaterial} attach="material" />
          </mesh>
        ))}

        {/* ========================================================= */}
        {/* MOLDED SOCKET HOLE IN THE BOTTOM OF THE CAP               */}
        {/* ========================================================= */}
        <group position={[0, -CAP_HEIGHT / 2, 0]}>
          {/* Socket Opening Ring on the bottom face */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.002, 0]}>
            <ringGeometry args={[0.22, 0.32, 32]} />
            <meshStandardMaterial color="#854d0e" roughness={0.4} metalness={0.6} />
          </mesh>

          {/* Hollow Inner Socket Cavity Cylinder */}
          <mesh position={[0, 0.26, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.52, 32, 1, true]} />
            <primitive object={innerSocketMaterial} attach="material" />
          </mesh>

          {/* Socket Ceiling / Top Stop */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.52, 0]}>
            <circleGeometry args={[0.22, 32]} />
            <primitive object={innerSocketMaterial} attach="material" />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 3. WRAPPER SLEEVE (Encloses the lower 3 rows on load)     */}
      {/* ========================================================= */}
      <group
        ref={wrapperRef}
        position={[0, -0.4875, 0]}
        onClick={handleBottleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Full wrap box sleeve enclosing the base completely */}
        <mesh castShadow receiveShadow material={wrapperMaterials} position={[0, 0, 0]}>
          <boxGeometry args={[BOTTLE_WIDTH + 0.12, BASE_HEIGHT + 0.02, BOTTLE_DEPTH + 0.18]} />
        </mesh>

        {/* Torn silver foil border effect at top rim of wrapper */}
        <mesh position={[0, (BASE_HEIGHT + 0.02) / 2 - 0.02, 0]}>
          <boxGeometry args={[BOTTLE_WIDTH + 0.13, 0.14, BOTTLE_DEPTH + 0.19]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.92}
            roughness={0.2}
          />
        </mesh>

        {/* Gold foil edge outline on wrapper */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(BOTTLE_WIDTH + 0.12, BASE_HEIGHT + 0.02, BOTTLE_DEPTH + 0.18)]} />
          <lineBasicMaterial color="#c58e26" transparent opacity={0.35} />
        </lineSegments>
      </group>

      {/* Fragrance Mist Particles emitted from the gold nozzle */}
      <MistParticles
        isSpraying={isSpraying && isUnwrapped}
        sprayOrigin={[0, 1.38, 0.18]}
      />
    </group>
  );
};
