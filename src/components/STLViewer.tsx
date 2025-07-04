// src/components/STLViewer.tsx
import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three-stdlib";
import { Mesh, BufferGeometry } from "three";

type STLViewerProps = {
  url: string;
};

function Model({ url }: STLViewerProps) {
  const ref = useRef<Mesh>(null);

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(url, (geometry) => {
      if (ref.current) {
        ref.current.geometry = geometry as BufferGeometry;
      }
    });
  }, [url]);

  return (
    <mesh ref={ref}>
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function STLViewer({ url }: STLViewerProps) {
  return (
    <Canvas camera={{ position: [0, 0, 80], fov: 45 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Model url={url} />
      <OrbitControls />
    </Canvas>
  );
}
