import { useMemo } from 'react'
import * as THREE from 'three'

function NeonLine({ position, rotation = [0, 0, 0], length = 1 }: { position: [number, number, number]; rotation?: [number, number, number]; length?: number }) {
  return <mesh position={position} rotation={rotation}>
    <boxGeometry args={[length, 0.025, 0.035]} />
    <meshStandardMaterial color="#43baff" emissive="#078cff" emissiveIntensity={4.5} toneMapped={false}/>
  </mesh>
}

function GlassPanel({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return <mesh position={position} castShadow>
    <boxGeometry args={size}/>
    <meshPhysicalMaterial color="#80cfff" metalness={0.12} roughness={0.08} transmission={0.42} thickness={0.18} transparent opacity={0.34} ior={1.45}/>
  </mesh>
}

export function Residence() {
  const groundMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111b2a', roughness: 0.3, metalness: 0.45 }), [])
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#17263a', roughness: 0.38, metalness: 0.28 }), [])
  const concreteMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#596575', roughness: 0.82 }), [])

  return <group>
    {/* Reflective site plinth and approach */}
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} material={groundMat}>
      <planeGeometry args={[100, 100]}/>
    </mesh>
    <mesh position={[0, -0.02, 0]} receiveShadow>
      <boxGeometry args={[22, 0.24, 17]}/>
      <meshStandardMaterial color="#101a29" roughness={0.28} metalness={0.52}/>
    </mesh>
    <mesh position={[0, 0.12, 0]} receiveShadow>
      <boxGeometry args={[15.8, 0.18, 11.2]}/>
      <meshStandardMaterial color="#222f40" roughness={0.3} metalness={0.38}/>
    </mesh>

    {/* Lower floor — open plan volume */}
    <mesh position={[0, 1.65, 0]} material={wallMat}>
      <boxGeometry args={[15.2, 0.22, 10.5]}/>
    </mesh>
    <mesh position={[0, 0.38, -5.05]} material={concreteMat}>
      <boxGeometry args={[15.4, 0.75, 0.38]}/>
    </mesh>
    <mesh position={[-7.45, 1.8, 0]} material={concreteMat}>
      <boxGeometry args={[0.38, 3.3, 10.3]}/>
    </mesh>
    <mesh position={[7.45, 1.8, 0]} material={concreteMat}>
      <boxGeometry args={[0.38, 3.3, 10.3]}/>
    </mesh>
    <GlassPanel position={[0, 1.85, 5.05]} size={[14.8, 3.25, 0.09]}/>
    <GlassPanel position={[-7.25, 1.85, 0]} size={[0.08, 3.2, 9.9]}/>
    <GlassPanel position={[7.25, 1.85, 0]} size={[0.08, 3.2, 9.9]}/>
    <NeonLine position={[0, 3.48, 0]} length={15.2}/>
    <NeonLine position={[0, 0.5, 5.13]} length={14.7}/>
    <NeonLine position={[-7.32, 1.85, 0]} rotation={[0, Math.PI / 2, 0]} length={9.8}/>
    <NeonLine position={[7.32, 1.85, 0]} rotation={[0, Math.PI / 2, 0]} length={9.8}/>

    {/* Upper storey, deliberately set back to create a double-height void */}
    <mesh position={[0.4, 5.25, -0.8]} material={wallMat}>
      <boxGeometry args={[11.6, 0.2, 7.8]}/>
    </mesh>
    <mesh position={[0.4, 7.2, -0.8]} material={concreteMat}>
      <boxGeometry args={[11.9, 0.22, 8.05]}/>
    </mesh>
    <mesh position={[-5.35, 6.2, -0.8]} material={concreteMat}>
      <boxGeometry args={[0.22, 2, 7.9]}/>
    </mesh>
    <mesh position={[6.15, 6.2, -0.8]} material={concreteMat}>
      <boxGeometry args={[0.22, 2, 7.9]}/>
    </mesh>
    <GlassPanel position={[0.4, 6.2, 3.08]} size={[11.35, 1.9, 0.07]}/>
    <NeonLine position={[0.4, 7.32, 3.13]} length={11.5}/>
    <NeonLine position={[0.4, 5.25, 3.13]} length={11.5}/>

    {/* Structural columns and roof fins */}
    {[-6.9, -3.5, 0, 3.5, 6.9].map((x) => <group key={x}>
      <mesh position={[x, 1.8, -4.8]} material={concreteMat}><boxGeometry args={[0.18, 3.45, 0.18]}/></mesh>
      <mesh position={[x, 3.65, -4.8]}><boxGeometry args={[0.26, 0.06, 0.26]}/><meshStandardMaterial color="#9db7ca" metalness={0.8} roughness={0.2}/></mesh>
    </group>)}
    {Array.from({ length: 9 }, (_, i) => <mesh key={i} position={[-6.8 + i * 1.7, 7.48, -0.8]} material={wallMat}><boxGeometry args={[0.12, 0.3, 8.3]}/></mesh>)}

    {/* Floating stair sculpture */}
    <group position={[-4.9, 0.2, 0.2]}>
      {Array.from({ length: 12 }, (_, i) => <mesh key={i} position={[i * 0.34, i * 0.27, 0]} castShadow>
        <boxGeometry args={[0.62, 0.12, 1.55]}/>
        <meshStandardMaterial color="#8b9aab" metalness={0.72} roughness={0.24}/>
      </mesh>)}
      <NeonLine position={[1.8, 1.55, 0.78]} rotation={[0, 0, -0.67]} length={4.2}/>
    </group>

    {/* Interior furniture silhouettes */}
    <group position={[1.9, 0.72, 1.2]}>
      <mesh castShadow><boxGeometry args={[3.2, 0.68, 1.1]}/><meshStandardMaterial color="#26384b" roughness={0.8}/></mesh>
      <mesh position={[0, 0.43, -0.35]}><boxGeometry args={[3.2, 0.72, 0.24]}/><meshStandardMaterial color="#34495c" roughness={0.8}/></mesh>
    </group>
    <mesh position={[1.8, 0.42, -0.5]}><cylinderGeometry args={[0.85, 0.85, 0.12, 48]}/><meshStandardMaterial color="#a1a9b4" metalness={0.6} roughness={0.25}/></mesh>
    <group position={[3.5, 0.15, -3.2]}>
      <mesh position={[0, 0.85, 0]}><boxGeometry args={[3.4, 0.12, 1.25]}/><meshStandardMaterial color="#192b40" metalness={0.55} roughness={0.3}/></mesh>
      <mesh position={[0, 1.45, -0.48]}><boxGeometry args={[1.25, 0.78, 0.08]}/><meshStandardMaterial color="#050a13" emissive="#0b3157" emissiveIntensity={0.7}/></mesh>
      <NeonLine position={[0, 1.05, 0.64]} length={3.2}/>
    </group>

    {/* Exterior reflecting pool */}
    <mesh position={[0, 0.1, 8.8]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[18, 4.2]}/>
      <meshPhysicalMaterial color="#071a2d" metalness={0.72} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08}/>
    </mesh>
    {[-8, -5, 5, 8].map((x) => <group key={x} position={[x, 0, 6.5]}>
      <mesh position={[0, 0.45, 0]}><cylinderGeometry args={[0.08, 0.12, 0.9, 8]}/><meshStandardMaterial color="#24394a" roughness={0.8}/></mesh>
      <mesh position={[0, 0.95, 0]}><sphereGeometry args={[0.28, 12, 8]}/><meshStandardMaterial color="#1b4b48" roughness={0.9}/></mesh>
      <pointLight position={[0, 0.35, 0]} color="#087dff" intensity={1.2} distance={3}/>
    </group>)}
  </group>
}