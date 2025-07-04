'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';
import { Mesh, BufferGeometry } from 'three';


<<<<<<< HEAD

=======
>>>>>>> ca4ea62e1f6eaf8379774eadeb98b0d8c548357e

function Model({ url }: { url: string }) {
const ref = useRef<Mesh>(null);
const [geometry, setGeometry] = useState<BufferGeometry | null>(null);
<<<<<<< HEAD

=======
>>>>>>> ca4ea62e1f6eaf8379774eadeb98b0d8c548357e

  useEffect(() => {
    // Charger le STL côté client
    const loader = new STLLoader();
    loader.load(url, setGeometry);
    return () => setGeometry(null);
  }, [url]);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });

  if (!geometry) return null;

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial color="#b98247" />
    </mesh>
  );
}

export default function STLViewer({ url }: { url: string }) {
  return (
    <Canvas camera={{ position: [2, 2, 2] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Model url={url} />
      <OrbitControls />
    </Canvas>
  );
}
