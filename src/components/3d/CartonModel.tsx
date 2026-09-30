import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

interface CartonModelProps {
  position?: [number, number, number];
}

export const CartonModel: React.FC<CartonModelProps> = ({ position = [1.18, 0, 0] }) => {
  const frontTexture = useTexture('/assets/carton_lemon_pie.jpg');

  useMemo(() => {
    if (frontTexture) {
      frontTexture.colorSpace = THREE.SRGBColorSpace;
      // Precision crop to carton bounds in the 990x990 source image
      // minX: 296 (0.299), width: 399 (0.403), minY: 64, height: 856 (0.8646), bottom margin: 70 (0.0707)
      frontTexture.repeat.set(0.403, 0.8646);
      frontTexture.offset.set(0.299, 0.0707);
      frontTexture.wrapS = THREE.ClampToEdgeWrapping;
      frontTexture.wrapT = THREE.ClampToEdgeWrapping;
      frontTexture.generateMipmaps = true;
      frontTexture.minFilter = THREE.LinearMipmapLinearFilter;
      frontTexture.magFilter = THREE.LinearFilter;
      frontTexture.needsUpdate = true;
    }
  }, [frontTexture]);

  // Luxury back label texture
  const backTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Warm confection yellow background
      ctx.fillStyle = '#fceea7';
      ctx.fillRect(0, 0, 512, 1024);

      // Gold foil outer border
      ctx.strokeStyle = '#c58e26';
      ctx.lineWidth = 6;
      ctx.strokeRect(26, 32, 460, 960);

      // Inner thin gold frame
      ctx.lineWidth = 2;
      ctx.strokeRect(34, 40, 444, 944);

      // Typography
      ctx.fillStyle = '#6b2d08';
      ctx.textAlign = 'center';

      ctx.font = 'bold 28px "DM Serif Display", Georgia, serif';
      ctx.fillText('SWEET TOOTH', 256, 125);

      ctx.font = 'italic 30px "Pinyon Script", cursive, serif';
      ctx.fillText('Lemon Pie', 256, 175);

      ctx.font = '600 13px "Montserrat", sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('EAU DE PARFUM', 256, 218);

      // Divider line
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

      // Indulgent quote
      ctx.font = 'italic 16px "DM Serif Display", Georgia, serif';
      ctx.fillStyle = '#6b2d08';
      ctx.fillText('"Indulge your sweetest cravings."', 256, 500);
      ctx.font = '13px "Montserrat", sans-serif';
      ctx.fillText('— Sabrina Carpenter', 256, 530);

      // Barcode box at bottom
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

  const cartonWidth = 1.85;
  const cartonHeight = 3.9;
  const cartonDepth = 0.52;

  // Box materials array: [+X (right), -X (left), +Y (top), -Y (bottom), +Z (front), -Z (back)]
  const materials = useMemo(() => {
    const sideMat = new THREE.MeshStandardMaterial({
      color: '#faea98',
      roughness: 0.5,
      metalness: 0.02,
    });
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTexture,
      roughness: 0.42,
      metalness: 0.02,
    });
    const backMat = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.48,
      metalness: 0.02,
    });

    return [sideMat, sideMat, sideMat, sideMat, frontMat, backMat];
  }, [frontTexture, backTexture]);

  return (
    <group position={position}>
      {/* 3D Carton Box with exact 6-sided materials */}
      <mesh castShadow receiveShadow material={materials}>
        <boxGeometry args={[cartonWidth, cartonHeight, cartonDepth]} />
      </mesh>

      {/* Subtle gold foil edge bevel lines */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(cartonWidth, cartonHeight, cartonDepth)]} />
        <lineBasicMaterial color="#c58e26" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
};
