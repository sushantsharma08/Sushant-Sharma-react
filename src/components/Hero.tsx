
import { Canvas } from '@react-three/fiber';
import { ScrollControls, } from '@react-three/drei';
import { Avatar } from './Avatar.tsx';
const Hero = () => {
  return (
    <Canvas shadows
      camera={{ position: [-1, 1, 5], fov: 30, }}
    >
      {/* <OrbitControls autoRotate /> */}
      <ScrollControls pages={0}>
        <ambientLight intensity={1} />
        <directionalLight
          position={[-5, 5, 5]}
          color={"white"}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[0, 0, 0]}
          color={"rgb(181, 144, 255)"}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <group
          position={[0,-1.2,-1]}
        >

          <Avatar scale={1.2}/>

          {/* <mesh scale={[0.8, 0.5, 0.8]}
            position={[0, 0.2, -0.05]}
          >
            <boxGeometry />
            <meshStandardMaterial color="white" />
          </mesh> */}

          <mesh
            scale={5}
            rotation={[-0.5 * Math.PI, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry
            />
            <meshStandardMaterial color="grey" />
            <shadowMaterial transparent opacity={0.2} />
          </mesh>

        </group>

      </ScrollControls>

    </Canvas>
  )
}

export default Hero