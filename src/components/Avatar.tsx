import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Wolf3D_Body: THREE.SkinnedMesh
    Wolf3D_Outfit_Bottom: THREE.SkinnedMesh
    Wolf3D_Outfit_Footwear: THREE.SkinnedMesh
    Wolf3D_Outfit_Top: THREE.SkinnedMesh
    EyeLeft: THREE.SkinnedMesh
    EyeRight: THREE.SkinnedMesh
    Wolf3D_Head: THREE.SkinnedMesh
    Wolf3D_Teeth: THREE.SkinnedMesh
    Hips: THREE.Bone
  }
  materials: {
    Wolf3D_Body: THREE.MeshStandardMaterial
    Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial
    Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial
    Wolf3D_Outfit_Top: THREE.MeshStandardMaterial
    Wolf3D_Eye: THREE.MeshStandardMaterial
    Wolf3D_Skin: THREE.MeshStandardMaterial
    Wolf3D_Teeth: THREE.MeshStandardMaterial
  }
  // animations: GLTFAction[]
}


// type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['skinnedMesh'] | JSX.IntrinsicElements['bone']>>

export function Avatar(
  //  props: JSX.IntrinsicElements['group']
  props:any
   
   ) {
  const groupRef = useRef<THREE.Group>(null);
  console.log(props);
  

  const { nodes, materials } = useGLTF('/models/6677df58c5fe24b037b9cf72.glb') as GLTFResult;
  const { animations: typingAnimation } = useFBX("animations/Typing.fbx");
  const { animations: greetingAnimation } = useFBX("animations/StandingGreeting.fbx");

  console.log(props);

  typingAnimation[0].name = "Typing";
  greetingAnimation[0].name = "Greeting";

  const { actions: actionTyping } = useAnimations(typingAnimation, groupRef)
  const { actions: actionWaving } = useAnimations(greetingAnimation, groupRef)

  useFrame((state) => {
    if (groupRef.current) {
      // groupRef.current.rotation.y += 0.01;
      // groupRef.current.getObjectByName("Neck")?.lookAt(state.camera.position);
      const target = new THREE.Vector3(state.pointer.x, state.pointer.y, 0);
      // groupRef.current.getObjectByName("Spine2")?.lookAt(target);
      // groupRef.current.getObjectByName("Neck")?.lookAt(target);
      // groupRef.current.getObjectByName("*")?.rotateY(90)

    }
  });

  useEffect(() => {
    if (props.anime=="Typing") {
      actionTyping["Typing"]?.reset().play();

    }
    else{
    actionWaving["Greeting"]?.reset().play();

    }
    console.log(actionWaving);

  }, []);

  return (
    <group  /// <reference path="group" />
      {...props}
      dispose={null}
      ref={groupRef}
    >
      <group
        rotation-x={-Math.PI / 2}
      // rotation-z={Math.PI/2}
      >

        <primitive object={nodes.Hips} />
        <skinnedMesh castShadow geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
        <skinnedMesh castShadow geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
        <skinnedMesh castShadow geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
        <skinnedMesh castShadow geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
        <skinnedMesh castShadow name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
        <skinnedMesh castShadow name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
        <skinnedMesh castShadow name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
        <skinnedMesh castShadow name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
      </group>
    </group>
  )
}

useGLTF.preload('/model/6677df58c5fe24b037b9cf72.glb')
