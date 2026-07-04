import { useEffect, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Sphere, TorusKnot } from "@react-three/drei";

/**
 * Tracks page scroll progress (0 → 1) in a ref so the R3F render loop
 * can read it every frame without forcing a React re-render on scroll.
 */
function useScrollProgress(): MutableRefObject<number> {
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progress.current = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

const Shapes = ({ scrollRef }: { scrollRef: MutableRefObject<number> }) => {
  const groupRef = useRef<any>(null);
  const knotRef = useRef<any>(null);
  const icoRef = useRef<any>(null);
  const sphereRef = useRef<any>(null);

  useFrame((_, delta) => {
    const s = scrollRef.current;

    // Whole cluster slowly turns and drifts as you scroll down the page
    if (groupRef.current) {
      groupRef.current.rotation.y = s * Math.PI * 1.5;
      groupRef.current.position.y = s * 5;
    }

    // Each shape also spins gently on its own, all the time
    if (knotRef.current) knotRef.current.rotation.x += delta * 0.15;
    if (icoRef.current) icoRef.current.rotation.y -= delta * 0.12;
    if (sphereRef.current) sphereRef.current.rotation.z += delta * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={1.1} floatIntensity={1.6}>
        <TorusKnot ref={knotRef} args={[1, 0.32, 128, 32]} position={[3.4, 1, -4]} scale={0.7}>
          <MeshDistortMaterial color="#a855f7" distort={0.35} speed={2} roughness={0.2} metalness={0.6} />
        </TorusKnot>
      </Float>

      <Float speed={1} rotationIntensity={0.8} floatIntensity={2}>
        <Icosahedron ref={icoRef} args={[1.1, 0]} position={[-3.8, -1.5, -5]}>
          <MeshDistortMaterial color="#3b82f6" distort={0.25} speed={1.5} roughness={0.3} metalness={0.4} />
        </Icosahedron>
      </Float>

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1}>
        <Sphere ref={sphereRef} args={[0.8, 64, 64]} position={[0, 3.6, -6]}>
          <MeshDistortMaterial color="#ec4899" distort={0.4} speed={2.5} roughness={0.15} metalness={0.5} />
        </Sphere>
      </Float>

      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.2}>
        <Icosahedron args={[0.5, 1]} position={[4.6, -3, -3]}>
          <MeshDistortMaterial color="#dda991" distort={0.3} speed={1.8} roughness={0.25} metalness={0.5} />
        </Icosahedron>
      </Float>
    </group>
  );
};

/**
 * Ambient 3D background layer, fixed behind the whole page.
 * Sits at z-index -1 so any section with its own background paints
 * over it, and it shows through in the transparent gaps between them.
 */
const FloatingShapes = () => {
  const scrollRef = useScrollProgress();

  return (
    <div className="canvas-bg" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#5227FF" />
        <Shapes scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
