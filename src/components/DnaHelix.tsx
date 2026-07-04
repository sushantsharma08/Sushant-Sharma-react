/**
 * DnaHelix — Premium futuristic sci-fi ambient background for React Three Fiber.
 * Self-contained: TubeGeometry double helix, 3000+ particles, orbital rings,
 * wireframe polyhedra, neural web, data packets, scroll camera, mouse parallax,
 * Bloom / Noise / Vignette post-processing. Import as <DnaHelix />.
 */
import {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

// =============================================================================
// TYPES
// =============================================================================

interface ScrollRefs {
  progress: MutableRefObject<number>;
  velocity: MutableRefObject<number>;
}

interface MouseRefs {
  x: MutableRefObject<number>;
  y: MutableRefObject<number>;
  targetX: MutableRefObject<number>;
  targetY: MutableRefObject<number>;
}

interface ViewportInfo {
  isMobile: boolean;
  isTablet: boolean;
  width: number;
  particleCount: number;
  compositionX: number;
  cameraFov: number;
  cameraZ: number;
}

interface HelixData {
  strandA: THREE.Vector3[];
  strandB: THREE.Vector3[];
  spine: THREE.Vector3[];
  curveA: THREE.CatmullRomCurve3;
  curveB: THREE.CatmullRomCurve3;
  coreCurve: THREE.CatmullRomCurve3;
  crossLinks: [THREE.Vector3, THREE.Vector3][];
  rungs: [THREE.Vector3, THREE.Vector3][];
}

interface NeuralNode {
  position: THREE.Vector3;
  phase: number;
  pulseSpeed: number;
  radius: number;
}

interface PolyhedronSpec {
  type: "icosahedron" | "octahedron";
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  spin: [number, number, number];
  color: string;
}

interface PacketSpec {
  curve: "A" | "B" | "core";
  offset: number;
  speed: number;
  color: string;
  scale: number;
}

// =============================================================================
// CONSTANTS — helix geometry, palette, performance budgets
// =============================================================================

const NODES_PER_STRAND = 48;
const HELIX_RADIUS = 1.85;
const HELIX_HEIGHT = 14;
const HELIX_TURNS = 4.6;
const CROSS_OFFSET = 4;
const TUBE_SEGMENTS = 128;
const TUBE_RADIUS_OUTER = 0.085;
const TUBE_RADIUS_INNER = 0.045;
const TUBE_RADIAL = 12;

const COLOR_CYAN = new THREE.Color("#22d3ee");
const COLOR_VIOLET = new THREE.Color("#a855f7");
const COLOR_PINK = new THREE.Color("#ec4899");

const COLOR_STOPS = [COLOR_CYAN, COLOR_VIOLET, COLOR_PINK];

const DESKTOP_PARTICLES = 3200;
const TABLET_PARTICLES = 2200;
const MOBILE_PARTICLES = 1400;

const NEURAL_NODE_COUNT_DESKTOP = 72;
const NEURAL_NODE_COUNT_MOBILE = 40;

const PACKET_COUNT_DESKTOP = 18;
const PACKET_COUNT_MOBILE = 10;

// Seeded pseudo-random for deterministic layout across hot reloads
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

// =============================================================================
// COLOR & MATH UTILITIES
// =============================================================================

function colorAt(t: number): THREE.Color {
  const clamped = Math.max(0, Math.min(1, t));
  if (clamped < 0.5) {
    return COLOR_STOPS[0].clone().lerp(COLOR_STOPS[1], clamped / 0.5);
  }
  return COLOR_STOPS[1].clone().lerp(COLOR_STOPS[2], (clamped - 0.5) / 0.5);
}

function colorAtHex(t: number): string {
  return `#${colorAt(t).getHexString()}`;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function damp(current: number, target: number, lambda: number, dt: number): number {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

function dampVec3(
  current: THREE.Vector3,
  target: THREE.Vector3,
  lambda: number,
  dt: number,
  out: THREE.Vector3,
): THREE.Vector3 {
  const t = 1 - Math.exp(-lambda * dt);
  return out.set(
    THREE.MathUtils.lerp(current.x, target.x, t),
    THREE.MathUtils.lerp(current.y, target.y, t),
    THREE.MathUtils.lerp(current.z, target.z, t),
  );
}

// =============================================================================
// HELIX PATH BUILDER
// =============================================================================

function buildHelixData(): HelixData {
  const strandA: THREE.Vector3[] = [];
  const strandB: THREE.Vector3[] = [];
  const spine: THREE.Vector3[] = [];
  const rungs: [THREE.Vector3, THREE.Vector3][] = [];
  const crossLinks: [THREE.Vector3, THREE.Vector3][] = [];

  for (let i = 0; i < NODES_PER_STRAND; i++) {
    const t = i / (NODES_PER_STRAND - 1);
    const y = t * HELIX_HEIGHT - HELIX_HEIGHT / 2;
    const angle = t * HELIX_TURNS * Math.PI * 2;
    const wobble = Math.sin(t * Math.PI * 6) * 0.08;

    const a = new THREE.Vector3(
      Math.cos(angle) * (HELIX_RADIUS + wobble),
      y,
      Math.sin(angle) * (HELIX_RADIUS + wobble),
    );
    const b = new THREE.Vector3(
      Math.cos(angle + Math.PI) * (HELIX_RADIUS - wobble * 0.5),
      y,
      Math.sin(angle + Math.PI) * (HELIX_RADIUS - wobble * 0.5),
    );

    strandA.push(a);
    strandB.push(b);
    spine.push(new THREE.Vector3(0, y, 0));
    rungs.push([a.clone(), b.clone()]);
  }

  for (let i = 0; i < NODES_PER_STRAND - CROSS_OFFSET; i += 2) {
    crossLinks.push([strandA[i], strandB[i + CROSS_OFFSET]]);
    crossLinks.push([strandB[i], strandA[i + CROSS_OFFSET]]);
  }

  const curveA = new THREE.CatmullRomCurve3(strandA, false, "catmullrom", 0.35);
  const curveB = new THREE.CatmullRomCurve3(strandB, false, "catmullrom", 0.35);

  const corePoints: THREE.Vector3[] = [];
  for (let i = 0; i <= 64; i++) {
    const t = i / 64;
    const y = t * HELIX_HEIGHT - HELIX_HEIGHT / 2;
    const pulse = Math.sin(t * Math.PI * 8) * 0.12;
    corePoints.push(new THREE.Vector3(pulse, y, -pulse * 0.6));
  }
  const coreCurve = new THREE.CatmullRomCurve3(corePoints, false, "catmullrom", 0.5);

  return { strandA, strandB, spine, curveA, curveB, coreCurve, crossLinks, rungs };
}

const HELIX_DATA = buildHelixData();

// =============================================================================
// NEURAL NODE & POLYHEDRON LAYOUT
// =============================================================================

function buildNeuralNodes(count: number): NeuralNode[] {
  const nodes: NeuralNode[] = [];
  for (let i = 0; i < count; i++) {
    const t = rand();
    const angle = t * Math.PI * 2;
    const radius = HELIX_RADIUS * (1.6 + rand() * 2.8);
    const y = (rand() - 0.5) * HELIX_HEIGHT * 1.4;
    nodes.push({
      position: new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
      ),
      phase: rand() * Math.PI * 2,
      pulseSpeed: 0.4 + rand() * 1.2,
      radius: 0.04 + rand() * 0.06,
    });
  }
  return nodes;
}

const POLYHEDRA: PolyhedronSpec[] = [
  {
    type: "icosahedron",
    position: [3.8, 2.4, -1.2],
    scale: 0.55,
    rotation: [0.4, 0.8, 0.2],
    spin: [0.06, 0.11, 0.04],
    color: "#22d3ee",
  },
  {
    type: "octahedron",
    position: [4.6, -1.8, 0.6],
    scale: 0.42,
    rotation: [1.1, 0.3, 0.7],
    spin: [-0.08, 0.05, 0.09],
    color: "#a855f7",
  },
  {
    type: "icosahedron",
    position: [2.9, -3.2, -2.1],
    scale: 0.38,
    rotation: [0.2, 1.4, 0.5],
    spin: [0.04, -0.07, 0.06],
    color: "#ec4899",
  },
  {
    type: "octahedron",
    position: [5.1, 0.4, -2.8],
    scale: 0.48,
    rotation: [0.9, 0.6, 1.2],
    spin: [0.07, 0.03, -0.05],
    color: "#c4b5fd",
  },
  {
    type: "icosahedron",
    position: [3.2, 4.1, 0.3],
    scale: 0.32,
    rotation: [0.7, 0.1, 0.9],
    spin: [-0.05, 0.09, 0.03],
    color: "#67e8f9",
  },
  {
    type: "octahedron",
    position: [4.2, -4.0, -0.8],
    scale: 0.36,
    rotation: [0.3, 0.9, 0.4],
    spin: [0.05, -0.06, 0.08],
    color: "#f0abfc",
  },
];

function buildPacketSpecs(count: number): PacketSpec[] {
  const specs: PacketSpec[] = [];
  const curves: PacketSpec["curve"][] = ["A", "B", "core"];
  const colors = ["#ffffff", "#22d3ee", "#a855f7", "#ec4899", "#fbbf24"];
  for (let i = 0; i < count; i++) {
    specs.push({
      curve: curves[i % curves.length],
      offset: rand(),
      speed: 0.06 + rand() * 0.14,
      color: colors[i % colors.length],
      scale: 0.06 + rand() * 0.05,
    });
  }
  return specs;
}

const PACKET_SPECS_DESKTOP = buildPacketSpecs(PACKET_COUNT_DESKTOP);
const PACKET_SPECS_MOBILE = buildPacketSpecs(PACKET_COUNT_MOBILE);

// =============================================================================
// SHARED GEOMETRIES (reused across instances — fewer GPU allocations)
// =============================================================================

const sharedIcosahedronGeo = new THREE.IcosahedronGeometry(1, 0);
const sharedOctahedronGeo = new THREE.OctahedronGeometry(1, 0);
const sharedPacketGeo = new THREE.SphereGeometry(1, 8, 8);
const sharedNodeGeo = new THREE.SphereGeometry(1, 10, 10);

// =============================================================================
// HOOKS — scroll, mouse parallax, responsive viewport
// =============================================================================

function useScrollProgress(): ScrollRefs {
  const progress = useRef(0);
  const velocity = useRef(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const next = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      const dt = Math.max(1, now - lastTime.current);
      velocity.current = (next - lastScroll.current) / (dt / 1000);
      lastScroll.current = next;
      lastTime.current = now;
      progress.current = next;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { progress, velocity };
}

function useMouseParallax(): MouseRefs {
  const x = useRef(0);
  const y = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetX.current = (e.clientX / window.innerWidth) * 2 - 1;
      targetY.current = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      targetX.current = (t.clientX / window.innerWidth) * 2 - 1;
      targetY.current = -(t.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return { x, y, targetX, targetY };
}

function useViewportInfo(): ViewportInfo {
  const [info, setInfo] = useState<ViewportInfo>(() => computeViewport(window.innerWidth));

  useEffect(() => {
    const onResize = () => setInfo(computeViewport(window.innerWidth));
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return info;
}

function computeViewport(width: number): ViewportInfo {
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  return {
    isMobile,
    isTablet,
    width,
    particleCount: isMobile
      ? MOBILE_PARTICLES
      : isTablet
        ? TABLET_PARTICLES
        : DESKTOP_PARTICLES,
    compositionX: isMobile ? 0.8 : isTablet ? 2.4 : 3.8,
    cameraFov: isMobile ? 62 : isTablet ? 56 : 52,
    cameraZ: isMobile ? 11 : isTablet ? 10 : 9.5,
  };
}

// =============================================================================
// CAMERA RIG — scroll zoom / tilt / orbit + mouse parallax
// =============================================================================

function CameraRig({
  scroll,
  mouse,
  viewport,
}: {
  scroll: ScrollRefs;
  mouse: MouseRefs;
  viewport: ViewportInfo;
}) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3());
  const targetPos = useRef(new THREE.Vector3());
  const currentPos = useRef(new THREE.Vector3(0, 0, viewport.cameraZ));

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = viewport.cameraFov;
      camera.updateProjectionMatrix();
    }
    currentPos.current.set(0, 0, viewport.cameraZ);
  }, [camera, viewport.cameraFov, viewport.cameraZ]);

  useFrame((_, delta) => {
    const s = scroll.progress.current;
    const mx = damp(mouse.x.current, mouse.targetX.current, 6, delta);
    const my = damp(mouse.y.current, mouse.targetY.current, 6, delta);
    mouse.x.current = mx;
    mouse.y.current = my;

    const zoom = THREE.MathUtils.lerp(1, 0.62, smoothstep(0, 0.85, s));
    const orbit = s * Math.PI * 1.35 + mx * 0.22;
    const tilt = THREE.MathUtils.lerp(0, -0.28, smoothstep(0.1, 0.9, s)) + my * 0.12;
    const lift = Math.sin(s * Math.PI) * 0.9 + my * 0.35;
    const driftX = mx * 0.55;
    const radius = viewport.cameraZ * zoom;

    targetPos.current.set(
      Math.sin(orbit) * radius * 0.35 + driftX,
      lift,
      Math.cos(orbit) * radius,
    );

    dampVec3(currentPos.current, targetPos.current, 4.5, delta, currentPos.current);
    camera.position.copy(currentPos.current);

    lookAt.current.set(
      viewport.compositionX * 0.35 + mx * 0.4,
      my * 0.25 + tilt * 1.8,
      -2,
    );
    camera.lookAt(lookAt.current);
  });

  return null;
}

// =============================================================================
// POST-PROCESSING — Bloom, film grain noise, vignette
// =============================================================================

function PostEffects({ isMobile }: { isMobile: boolean }) {
  return (
    <EffectComposer multisampling={isMobile ? 0 : 2}>
      <Bloom
        luminanceThreshold={0.15}
        luminanceSmoothing={0.85}
        intensity={isMobile ? 0.85 : 1.35}
        mipmapBlur
        radius={0.72}
      />
      <Noise
        opacity={isMobile ? 0.028 : 0.042}
        blendFunction={BlendFunction.OVERLAY}
      />
      <Vignette eskil={false} offset={0.12} darkness={isMobile ? 0.55 : 0.72} />
    </EffectComposer>
  );
}

// =============================================================================
// AMBIENT LIGHTING
// =============================================================================

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#1a1030" />
      <hemisphereLight args={["#22d3ee", "#0a0612", 0.45]} />
      <pointLight position={[6, 5, 4]} intensity={1.4} color="#ffffff" distance={30} decay={2} />
      <pointLight position={[-4, -3, 2]} intensity={0.9} color="#22d3ee" distance={25} decay={2} />
      <pointLight position={[2, 6, -5]} intensity={0.7} color="#ec4899" distance={22} decay={2} />
      <pointLight position={[5, -4, -3]} intensity={0.55} color="#a855f7" distance={20} decay={2} />
      <spotLight
        position={[8, 2, 6]}
        angle={0.45}
        penumbra={0.8}
        intensity={0.6}
        color="#67e8f9"
        distance={35}
        castShadow={false}
      />
    </>
  );
}

// =============================================================================
// GLOWING TUBE HELIX — outer strands + inner neural core
// =============================================================================

function GlowingTube({
  curve,
  radius,
  color,
  emissiveIntensity,
  opacity = 1,
}: {
  curve: THREE.CatmullRomCurve3;
  radius: number;
  color: string;
  emissiveIntensity: number;
  opacity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const m = meshRef.current;
    if (!m) return;
    const mat = m.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity =
      emissiveIntensity + Math.sin(state.clock.elapsedTime * 2.2) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry
        args={[curve, TUBE_SEGMENTS, radius, TUBE_RADIAL, false]}
      />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        roughness={0.15}
        metalness={0.65}
        transparent={opacity < 1}
        opacity={opacity}
        depthWrite={opacity >= 0.95}
      />
    </mesh>
  );
}

function HelixTubes() {
  return (
    <group>
      {/* Outer glow halos — cheap pre-bloom layer */}
      <GlowingTube
        curve={HELIX_DATA.curveA}
        radius={TUBE_RADIUS_OUTER * 2.2}
        color="#a855f7"
        emissiveIntensity={0.35}
        opacity={0.12}
      />
      <GlowingTube
        curve={HELIX_DATA.curveB}
        radius={TUBE_RADIUS_OUTER * 2.2}
        color="#ec4899"
        emissiveIntensity={0.35}
        opacity={0.12}
      />

      {/* Primary strand tubes */}
      <GlowingTube
        curve={HELIX_DATA.curveA}
        radius={TUBE_RADIUS_OUTER}
        color="#c084fc"
        emissiveIntensity={1.1}
      />
      <GlowingTube
        curve={HELIX_DATA.curveB}
        radius={TUBE_RADIUS_OUTER}
        color="#f472b6"
        emissiveIntensity={1.1}
      />

      {/* Inner neural core */}
      <GlowingTube
        curve={HELIX_DATA.coreCurve}
        radius={TUBE_RADIUS_INNER}
        color="#22d3ee"
        emissiveIntensity={1.6}
      />
      <GlowingTube
        curve={HELIX_DATA.coreCurve}
        radius={TUBE_RADIUS_INNER * 2.5}
        color="#22d3ee"
        emissiveIntensity={0.25}
        opacity={0.18}
      />
    </group>
  );
}

// =============================================================================
// SPINE VERTEBRAE & RUNG NODES along the helix
// =============================================================================

function SpineColumn() {
  return (
    <group>
      {HELIX_DATA.spine.map((p, i) => {
        const t = i / (HELIX_DATA.spine.length - 1);
        const c = colorAt(t).getStyle();
        return (
          <mesh key={`spine-${i}`} position={p}>
            <cylinderGeometry args={[0.18, 0.22, 0.1, 16]} />
            <meshStandardMaterial
              color="#3b2d55"
              emissive={c}
              emissiveIntensity={0.25}
              roughness={0.45}
              metalness={0.55}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function HelixNodes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child: THREE.Object3D, i: number) => {
      const pulse = 0.85 + Math.sin(t * 2.5 + i * 0.4) * 0.15;
      child.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={groupRef}>
      {HELIX_DATA.strandA.map((p, i) => {
        const t = i / (HELIX_DATA.strandA.length - 1);
        const hex = colorAtHex(t);
        return (
          <mesh key={`na-${i}`} position={p}>
            <sphereGeometry args={[0.11, 12, 12]} />
            <meshStandardMaterial
              color={hex}
              emissive={hex}
              emissiveIntensity={1.3}
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>
        );
      })}
      {HELIX_DATA.strandB.map((p, i) => {
        const t = i / (HELIX_DATA.strandB.length - 1);
        const hex = colorAtHex(t);
        return (
          <mesh key={`nb-${i}`} position={p}>
            <sphereGeometry args={[0.11, 12, 12]} />
            <meshStandardMaterial
              color={hex}
              emissive={hex}
              emissiveIntensity={1.3}
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// =============================================================================
// DATA PACKETS — luminous spheres traveling along tube curves
// =============================================================================

function DataPacket({
  spec,
  curves,
}: {
  spec: PacketSpec;
  curves: { A: THREE.CatmullRomCurve3; B: THREE.CatmullRomCurve3; core: THREE.CatmullRomCurve3 };
}) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const temp = useRef(new THREE.Vector3());

  useFrame((state) => {
    const mesh = ref.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;

    const curve = curves[spec.curve];
    const t = (state.clock.elapsedTime * spec.speed + spec.offset) % 1;
    curve.getPointAt(t, temp.current);
    mesh.position.copy(temp.current);

    const fade = Math.sin(t * Math.PI);
    mat.opacity = fade * 0.95;
    mesh.scale.setScalar(spec.scale * (0.7 + fade * 0.5));
  });

  return (
    <mesh ref={ref} geometry={sharedPacketGeo}>
      <meshBasicMaterial
        ref={matRef}
        color={spec.color}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function DataPacketField({ isMobile }: { isMobile: boolean }) {
  const curves = useMemo(
    () => ({
      A: HELIX_DATA.curveA,
      B: HELIX_DATA.curveB,
      core: HELIX_DATA.coreCurve,
    }),
    [],
  );
  const specs = isMobile ? PACKET_SPECS_MOBILE : PACKET_SPECS_DESKTOP;

  return (
    <group>
      {specs.map((spec, i) => (
        <DataPacket key={`pkt-${i}`} spec={spec} curves={curves} />
      ))}
    </group>
  );
}

// =============================================================================
// PARTICLE FIELD — 3000+ GPU points with subtle drift animation
// =============================================================================

function ParticleField({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = rand() * Math.PI * 2;
      const radius = HELIX_RADIUS * (0.8 + rand() * 4.5);
      const y = (rand() - 0.5) * HELIX_HEIGHT * 2.2;

      positions[i3] = Math.cos(theta) * radius + viewportBiasX();
      positions[i3 + 1] = y;
      positions[i3 + 2] = Math.sin(theta) * radius;

      velocities[i3] = (rand() - 0.5) * 0.015;
      velocities[i3 + 1] = (rand() - 0.5) * 0.008;
      velocities[i3 + 2] = (rand() - 0.5) * 0.015;

      phases[i] = rand() * Math.PI * 2;
    }
    return { positions, velocities, phases };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const attr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = phases[i];
      arr[i3] += velocities[i3] + Math.sin(t * 0.4 + phase) * 0.002;
      arr[i3 + 1] += velocities[i3 + 1] + Math.cos(t * 0.35 + phase) * 0.0015;
      arr[i3 + 2] += velocities[i3 + 2] + Math.sin(t * 0.5 + phase * 1.3) * 0.002;

      if (arr[i3 + 1] > HELIX_HEIGHT * 1.2) arr[i3 + 1] = -HELIX_HEIGHT * 1.2;
      if (arr[i3 + 1] < -HELIX_HEIGHT * 1.2) arr[i3 + 1] = HELIX_HEIGHT * 1.2;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        color="#c4b5fd"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function viewportBiasX(): number {
  return 1.5 + rand() * 2.5;
}

// =============================================================================
// NEURAL CONNECTION WEB — nodes + line segments
// =============================================================================

function NeuralWeb({ nodeCount }: { nodeCount: number }) {
  const nodes = useMemo(() => buildNeuralNodes(nodeCount), [nodeCount]);
  const linesRef = useRef<THREE.LineSegments>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);

  const lineGeometry = useMemo(() => {
    const maxConnections = nodeCount * 4;
    const positions = new Float32Array(maxConnections * 2 * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [nodeCount]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const lineSeg = linesRef.current;
    if (!lineSeg) return;

    const attr = lineSeg.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    let ptr = 0;
    const maxDist = 2.8;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distSq = nodes[i].position.distanceToSquared(nodes[j].position);
        if (distSq < maxDistSq && (i + j) % 3 === 0) {
          const a = nodes[i].position;
          const b = nodes[j].position;
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + i * 0.3 + j * 0.2);
          if (pulse < 0.35) continue;

          arr[ptr++] = a.x;
          arr[ptr++] = a.y;
          arr[ptr++] = a.z;
          arr[ptr++] = b.x;
          arr[ptr++] = b.y;
          arr[ptr++] = b.z;
        }
      }
    }

    lineSeg.geometry.setDrawRange(0, ptr / 3);
    attr.needsUpdate = true;

    if (nodesGroupRef.current) {
      nodesGroupRef.current.children.forEach((child: THREE.Object3D, i: number) => {
        const n = nodes[i];
        if (!n) return;
        const s = 0.6 + Math.sin(t * n.pulseSpeed + n.phase) * 0.4;
        child.scale.setScalar(n.radius * s);
      });
    }
  });

  return (
    <group>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <group ref={nodesGroupRef}>
        {nodes.map((n, i) => (
          <mesh key={`nn-${i}`} position={n.position} geometry={sharedNodeGeo}>
            <meshBasicMaterial
              color="#22d3ee"
              transparent
              opacity={0.75}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// =============================================================================
// HELIX RUNG & CROSS-LINK LINES (lattice structure)
// =============================================================================

function HelixLattice() {
  const rungGeo = useMemo(() => {
    const verts: number[] = [];
    HELIX_DATA.rungs.forEach(([a, b]) => {
      verts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  const crossGeo = useMemo(() => {
    const verts: number[] = [];
    HELIX_DATA.crossLinks.forEach(([a, b]) => {
      verts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  return (
    <group>
      <lineSegments geometry={rungGeo}>
        <lineBasicMaterial color="#cabfe6" transparent opacity={0.28} depthWrite={false} />
      </lineSegments>
      <lineSegments geometry={crossGeo}>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

// =============================================================================
// THREE ORBITAL RINGS — tilted toruses at different radii / speeds
// =============================================================================

function OrbitalRing({
  radius,
  tube,
  tilt,
  speed,
  color,
  opacity,
}: {
  radius: number;
  tube: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * speed;
      ref.current.rotation.x += delta * speed * 0.35;
    }
  });

  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, tube, 8, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

function OrbitalRings() {
  return (
    <group>
      <OrbitalRing
        radius={HELIX_RADIUS * 2.4}
        tube={0.014}
        tilt={[Math.PI / 2.4, 0.25, 0.1]}
        speed={0.09}
        color="#c9b8ff"
        opacity={0.35}
      />
      <OrbitalRing
        radius={HELIX_RADIUS * 3.1}
        tube={0.01}
        tilt={[Math.PI / 3.2, -0.4, 0.55]}
        speed={-0.06}
        color="#67e8f9"
        opacity={0.28}
      />
      <OrbitalRing
        radius={HELIX_RADIUS * 3.8}
        tube={0.008}
        tilt={[Math.PI / 2.8, 0.6, -0.3]}
        speed={0.045}
        color="#f0abfc"
        opacity={0.22}
      />
    </group>
  );
}

// =============================================================================
// FLOATING WIREFRAME POLYHEDRA — icosahedrons & octahedrons
// =============================================================================

function WireframePolyhedron({ spec }: { spec: PolyhedronSpec }) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = spec.type === "icosahedron" ? sharedIcosahedronGeo : sharedOctahedronGeo;

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x += delta * spec.spin[0];
    m.rotation.y += delta * spec.spin[1];
    m.rotation.z += delta * spec.spin[2];
    const bob = Math.sin(state.clock.elapsedTime * 0.8 + spec.position[0]) * 0.12;
    m.position.y = spec.position[1] + bob;
  });

  return (
    <mesh
      ref={ref}
      position={spec.position}
      rotation={spec.rotation}
      scale={spec.scale}
      geometry={geo}
    >
      <meshBasicMaterial
        color={spec.color}
        wireframe
        transparent
        opacity={0.42}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function FloatingPolyhedra() {
  return (
    <group>
      {POLYHEDRA.map((spec, i) => (
        <WireframePolyhedron key={`poly-${i}`} spec={spec} />
      ))}
    </group>
  );
}

// =============================================================================
// DEEP SPACE FOG & BACKGROUND GRADIENT PLANE
// =============================================================================

function Atmosphere() {
  return (
    <>
      <fog attach="fog" args={["#08040f", 12, 38]} />
      <mesh position={[4, 0, -14]} scale={[30, 22, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#0c0618" transparent opacity={0.85} depthWrite={false} />
      </mesh>
    </>
  );
}

// =============================================================================
// MAIN SCENE COMPOSITION
// =============================================================================

function HelixScene({
  scroll,
  mouse,
  viewport,
}: {
  scroll: ScrollRefs;
  mouse: MouseRefs;
  viewport: ViewportInfo;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const neuralCount = viewport.isMobile
    ? NEURAL_NODE_COUNT_MOBILE
    : NEURAL_NODE_COUNT_DESKTOP;

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const s = scroll.progress.current;
    const mx = mouse.x.current;

    g.rotation.y = state.clock.elapsedTime * 0.12 + s * Math.PI * 0.9 + mx * 0.08;
    g.position.y = Math.sin(s * Math.PI) * 0.45;
  });

  return (
    <>
      <CameraRig scroll={scroll} mouse={mouse} viewport={viewport} />
      <SceneLights />
      <Atmosphere />

      <group ref={groupRef} position={[viewport.compositionX, 0, -6.5]}>
        <HelixTubes />
        <SpineColumn />
        <HelixNodes />
        <HelixLattice />
        <OrbitalRings />
        <DataPacketField isMobile={viewport.isMobile} />
        <NeuralWeb nodeCount={neuralCount} />
        <FloatingPolyhedra />
      </group>

      <ParticleField count={viewport.particleCount} />
      <PostEffects isMobile={viewport.isMobile} />
    </>
  );
}

// =============================================================================
// ROOT EXPORT — fixed full-viewport canvas behind page content
// =============================================================================

const DnaHelix = () => {
  const scroll = useScrollProgress();
  const mouse = useMouseParallax();
  const viewport = useViewportInfo();

  const dpr = useMemo(
    () => (viewport.isMobile ? ([1, 1.25] as [number, number]) : ([1, 1.5] as [number, number])),
    [viewport.isMobile],
  );

  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor(0x050208, 0);
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.05;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, []);

  return (
    <div className="canvas-bg" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{
          position: [0, 0, viewport.cameraZ],
          fov: viewport.cameraFov,
          near: 0.1,
          far: 80,
        }}
        gl={{
          alpha: true,
          antialias: !viewport.isMobile,
          powerPreference: "high-performance",
          stencil: false,
        }}
        onCreated={onCreated}
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <HelixScene scroll={scroll} mouse={mouse} viewport={viewport} />
      </Canvas>
    </div>
  );
};

export default DnaHelix;
