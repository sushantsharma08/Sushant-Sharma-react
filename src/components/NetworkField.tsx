import { useRef, useEffect, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import * as THREE from "three";

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

// A loose, roughly-layered graph: three tiers (top / mid / bottom) with
// cross-links between them, evoking a systems or dependency diagram
// rather than a random scatter.
const NODES: [number, number, number][] = [
  [-5.5, 2.2, -6], [-3.8, 3.4, -7], [-1.6, 1.8, -5], [0.4, 3.1, -8], [2.6, 1.6, -6], [5.0, 2.6, -7],
  [-4.8, -0.4, -5], [-2.2, -1.2, -7], [0.2, 0.2, -4], [2.8, -0.8, -6.5], [5.3, -0.2, -5.5],
  [-5.6, -2.8, -7], [-2.6, -3.2, -5.5], [0.6, -2.6, -7.5], [3.4, -3.0, -6], [5.8, -2.2, -8],
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [6, 7], [7, 8], [8, 9], [9, 10],
  [11, 12], [12, 13], [13, 14], [14, 15],
  [0, 6], [1, 6], [2, 7], [2, 8], [3, 8], [4, 9], [5, 10],
  [6, 11], [7, 12], [8, 13], [9, 14], [10, 15],
];

// Only some edges carry a visible "packet" so it reads as data flow,
// not clutter.
const PULSE_EDGES = EDGES.filter((_, i) => i % 2 === 0);

const PALETTE = ["#a855f7", "#3b82f6", "#ec4899", "#dda991"];

const NodeMesh = ({ position, index }: { position: [number, number, number]; index: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const phase = index * 0.7;

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    m.position.y = position[1] + Math.sin(t * 0.6 + phase) * 0.18;
    m.position.x = position[0] + Math.cos(t * 0.4 + phase) * 0.08;
    m.rotation.x += delta * 0.15;
    m.rotation.y += delta * 0.2;
  });

  const color = PALETTE[index % PALETTE.length];
  const scale = 0.13 + (index % 3) * 0.04;

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[scale, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.65} roughness={0.3} metalness={0.4} />
    </mesh>
  );
};

const Pulse = ({
  a,
  b,
  offset,
}: {
  a: [number, number, number];
  b: [number, number, number];
  offset: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const vecA = useRef(new THREE.Vector3(...a)).current;
  const vecB = useRef(new THREE.Vector3(...b)).current;

  useFrame((state) => {
    const m = ref.current;
    const mat = materialRef.current;
    if (!m || !mat) return;
    const t = (state.clock.elapsedTime * 0.25 + offset) % 1;
    m.position.lerpVectors(vecA, vecB, t);
    // fade in near the start, fade out near the end of each loop
    mat.opacity = Math.sin(t * Math.PI) * 0.9;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial ref={materialRef} color="#ffffff" transparent opacity={0} />
    </mesh>
  );
};

const Graph = ({ scrollRef }: { scrollRef: MutableRefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const s = scrollRef.current;
    if (groupRef.current) {
      groupRef.current.rotation.y = s * Math.PI * 0.6;
      groupRef.current.position.y = s * 3;
    }
  });

  return (
    <group ref={groupRef}>
      {EDGES.map(([a, b], i) => (
        <Line key={`edge-${i}`} points={[NODES[a], NODES[b]]} color="#8a7fb8" transparent opacity={0.18} lineWidth={1} />
      ))}

      {NODES.map((pos, i) => (
        <NodeMesh key={`node-${i}`} position={pos} index={i} />
      ))}

      {PULSE_EDGES.map(([a, b], i) => (
        <Pulse key={`pulse-${i}`} a={NODES[a]} b={NODES[b]} offset={i / PULSE_EDGES.length} />
      ))}
    </group>
  );
};

/**
 * Ambient 3D background: a connected node network with data pulses
 * traveling along the edges. Reads as "systems / architecture" rather
 * than decorative shapes, fixed behind the whole page at z-index -1.
 */
const NetworkField = () => {
  const scrollRef = useScrollProgress();

  return (
    <div className="canvas-bg" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-4, -3, -3]} intensity={0.5} color="#5227FF" />
        <Sparkles count={40} scale={[14, 8, 6]} size={2} speed={0.15} color="#c9b8ff" opacity={0.35} />
        <Graph scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
};

export default NetworkField;
