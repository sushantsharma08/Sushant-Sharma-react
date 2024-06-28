
import * as THREE from 'three'
// import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Mesh011: THREE.Mesh
    Mesh011_1: THREE.Mesh
  }
  materials: {
    ['cloth_002.001']: THREE.MeshStandardMaterial
    ['wood_oak_002_light.001']: THREE.MeshStandardMaterial
  }
  // animations: GLTFAction[]
}

// type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function Chair(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/chair.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.306, -0.036]} scale={0.001}>
        <mesh geometry={nodes.Mesh011.geometry} material={materials['cloth_002.001']} />
        <mesh geometry={nodes.Mesh011_1.geometry} material={materials['wood_oak_002_light.001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/chair.glb')
