import { useRef } from 'react'
import { Chair } from './Chair'
import { Avatar } from './Avatar';
import { Table } from './Table';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'

const Exp = (props: any) => {
    const canvasRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (canvasRef.current) {
            canvasRef.current.rotation.y = state.pointer.y*0.3;
            canvasRef.current.rotation.x = state.pointer.x*0.3;

        }
    });

    return (

        <group
            ref={canvasRef}
            position={[1, -1.5, -1]}
        >

            <Avatar scale={1.2}
                anime={`${props.anime}`}
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
    )
}

export default Exp