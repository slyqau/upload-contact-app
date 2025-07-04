// src/components/STLViewer.tsx

import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { STLLoader } from "three-stdlib";
import { BufferGeometry, MeshStandardMaterial } from "three";
import type { Mesh } from "three";

type STLViewerProps = {
  url: string;
  color?: string;
};

const Model = ({ url, color = "#ff8000" }: STLViewerProps) => {
  const ref = useRef<Mesh>(null);
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null);

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(url, (geom) => setGeometry(geom as BufferGeometry));
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
