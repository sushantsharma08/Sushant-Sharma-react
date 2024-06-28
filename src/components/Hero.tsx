
import { Canvas } from '@react-three/fiber';
// import { OrbitControls, ScrollControls, } from '@react-three/drei';
import Exp from './Exp.tsx';

const Hero = (props: any) => {



  return (
    <Canvas shadows
      camera={{ position: [-5, 0.9, 3], fov: 35, }}
    >
      {/* <OrbitControls autoRotate /> */}
      {/* <ScrollControls pages={0}> */}
      <group>
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

        <Exp anime={props.Action}/>
      </group>

      {/* </ScrollControls> */}

    </Canvas>
  )
}

export default Hero