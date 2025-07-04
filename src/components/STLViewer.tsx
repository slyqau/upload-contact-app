import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { STLLoader } from "three-stdlib";
import * as THREE from "three"; // <-- LE SEUL QUI MARCHE PARTOUT

type STLViewerProps = {
  url: string;
  color?: string;
};

const Model = ({ url, color = "#ff8000" }: STLViewerProps) => {
  const ref = useRef<THREE.Mesh>(null); // <-- C'EST ÇA LA CLEF
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(url, (geom) => setGeometry(geom as THREE.BufferGeometry));
  }, [url]);

  if (!geometry) return null;

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default function STLViewer({ url, color }: STLViewerProps) {
  return (
    <Canvas style={{ width: "100%", height: 400 }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      <Model url={url} color={color} />
    </Canvas>
  );
}
