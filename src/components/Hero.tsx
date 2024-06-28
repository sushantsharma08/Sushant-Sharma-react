
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ScrollControls, } from '@react-three/drei';
import { Avatar } from './Avatar.tsx';
import { Chair } from './Chair.tsx'
import { Table } from './Table.tsx';
const Hero = (props: any) => {
  return (
    <Canvas shadows
      camera={{ position: [-5, 0.8, 2], fov: 35, }}
    >
      {/* <OrbitControls autoRotate /> */}
      <ScrollControls pages={0}>
        <ambientLight intensity={1} />
        <directionalLight
          position={[-5, 5, 5]}
          color={"pink"}
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

        {/* {props.Animation == "Typing" ? */}
          <group
            position={[2, -1.5, -1]}
          >

            <Avatar scale={1.2}
              anime={`${props.Action}`}
            />
            <mesh scale={[1, 1.5, 1.1]}
              position={[0, 0, 0]}
            >
              <Chair />
              <Table scale={0.075} position={[0.1, -0.03, 0.7]} />
            </mesh>
            <mesh
              scale={3}
              rotation={[-0.5 * Math.PI, 0, 0]}
              position={[0, 0, 0]}
              receiveShadow
            >
              <planeGeometry
              />
              <meshStandardMaterial color="rgb(100, 100, 100)" />
              {/* <shadowMaterial transparent opacity={0.8} /> */}
            </mesh>
            <mesh
              scale={3}
              // rotation={[-0.5 * Math.PI, 0, 0]}
              position={[0, 1.5, -1.5]}
              receiveShadow
            >
              <planeGeometry
              />
              <meshStandardMaterial color="rgb(205, 131, 94)" />
              {/* <shadowMaterial transparent opacity={0.8} /> */}
            </mesh>
            <mesh
              scale={3}
              rotation={[0, -0.5 * Math.PI, 0]}
              position={[1.5, 1.5, 0]}
              receiveShadow
            >
              <planeGeometry
              />
              <meshStandardMaterial color="rgb(200, 200, 200)" />
              {/* <shadowMaterial transparent opacity={0.8} /> */}
            </mesh>


          </group>
          
        {/* } */}

      </ScrollControls>

    </Canvas>
  )
}

export default Hero