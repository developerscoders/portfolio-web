import { lazy, Suspense, useMemo } from 'react'
import * as THREE from 'three'

const Interior = lazy(() => import('./Interior').then(module => ({ default: module.Interior })))

function Neon({ position, rotation = [0, 0, 0], size = [1, 0.025, 0.035] }: {
  position: [number, number, number]; rotation?: [number, number, number]; size?: [number, number, number]
}) {
  return <mesh position={position} rotation={rotation}>
    <boxGeometry args={size}/>
    <meshStandardMaterial color="#6acfff" emissive="#078cff" emissiveIntensity={2.1} toneMapped={false}/>
  </mesh>
}

function Glass({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return <mesh position={position}>
    <boxGeometry args={size}/>
    <meshPhysicalMaterial color="#9bdcff" metalness={0.12} roughness={0.2} transmission={0.12} thickness={0.08} transparent opacity={0.17} ior={1.46} envMapIntensity={0.8}/>
  </mesh>
}

function Frame({ position, size, color = '#657b90' }: { position: [number, number, number]; size: [number, number, number]; color?: string }) {
  return <mesh position={position}>
    <boxGeometry args={size}/>
    <meshStandardMaterial color={color} metalness={0.68} roughness={0.32}/>
  </mesh>
}

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, 1.15, 0]}><cylinderGeometry args={[0.12, 0.2, 2.3, 8]}/><meshStandardMaterial color="#3d4b4d" roughness={0.95}/></mesh>
    <mesh position={[0, 2.45, 0]}><sphereGeometry args={[0.95, 12, 10]}/><meshStandardMaterial color="#173e39" roughness={0.95}/></mesh>
    <mesh position={[-0.42, 2.15, 0.15]}><sphereGeometry args={[0.62, 10, 8]}/><meshStandardMaterial color="#205448" roughness={0.95}/></mesh>
    <mesh position={[0.42, 2.2, -0.12]}><sphereGeometry args={[0.68, 10, 8]}/><meshStandardMaterial color="#28634f" roughness={0.95}/></mesh>
  </group>
}

function Pool() {
  return <group position={[0, 0, 9.2]}>
    <mesh position={[0, -0.06, 0]}><boxGeometry args={[18, 0.32, 4.4]}/><meshStandardMaterial color="#263c50" metalness={0.5} roughness={0.34}/></mesh>
    <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[17.5, 4.0]}/><meshStandardMaterial color="#062b49" metalness={0.36} roughness={0.2}/></mesh>
    {[-8.8, 8.8].map(x => <Neon key={x} position={[x, 0.16, 0]} size={[0.04, 0.035, 4.1]}/>)}
    <Neon position={[0, 0.16, -2]} size={[17.5, 0.035, 0.035]}/>
    <Neon position={[0, 0.16, 2]} size={[17.5, 0.035, 0.035]}/>
  </group>
}

export function Residence() {
  const floor = useMemo(() => new THREE.MeshStandardMaterial({ color: '#17283a', roughness: 0.36, metalness: 0.2 }), [])
  const concrete = useMemo(() => new THREE.MeshStandardMaterial({ color: '#536477', roughness: 0.82, metalness: 0.06 }), [])
  const dark = useMemo(() => new THREE.MeshStandardMaterial({ color: '#101c2a', roughness: 0.42, metalness: 0.28 }), [])
  return <group>
    <mesh position={[0, -0.18, 0]}><planeGeometry args={[100, 100]}/><meshStandardMaterial color="#07111d" roughness={0.82}/></mesh>
    <mesh position={[0, -0.02, 0]}><boxGeometry args={[24, 0.28, 19]}/><meshStandardMaterial color="#0d1928" roughness={0.4} metalness={0.3}/></mesh>
    <mesh position={[0, 0.12, 0]}><boxGeometry args={[16.4, 0.18, 11.7]}/><primitive object={floor}/></mesh>
    {Array.from({ length: 8 }, (_, i) => <mesh key={i} position={[0, 0.02, 6.5 + i * 0.75]}><boxGeometry args={[4.2, 0.08, 0.42]}/><meshStandardMaterial color={i % 2 ? '#1b3045' : '#243a4e'} metalness={0.3}/></mesh>)}
    <mesh position={[0, 0.28, 0]} material={floor}><boxGeometry args={[15.8, 0.16, 11.3]}/></mesh>
    <mesh position={[0, 0.5, -5.42]} material={concrete}><boxGeometry args={[15.8, 0.82, 0.36]}/></mesh>
    <mesh position={[-7.7, 1.95, 0]} material={concrete}><boxGeometry args={[0.34, 3.05, 11.1]}/></mesh>
    <mesh position={[7.7, 1.95, 0]} material={concrete}><boxGeometry args={[0.34, 3.05, 11.1]}/></mesh>
    <Glass position={[0, 1.95, 5.43]} size={[15.2, 2.95, 0.08]}/>
    <Glass position={[-7.53, 1.95, 0]} size={[0.07, 2.9, 10.8]}/>
    <Glass position={[7.53, 1.95, 0]} size={[0.07, 2.9, 10.8]}/>
    {Array.from({ length: 9 }, (_, i) => <Frame key={i} position={[-7.25 + i * 1.81, 1.95, 5.48]} size={[0.055, 2.95, 0.11]}/>)}
    {[-6.9, -3.45, 0, 3.45, 6.9].map(x => <group key={x}>
      <Frame position={[x, 1.95, -5.1]} size={[0.2, 3.1, 0.2]}/>
      <Frame position={[x, 3.52, -5.1]} size={[0.28, 0.07, 0.28]} color="#9db4c5"/>
    </group>)}
    <mesh position={[0, 3.55, 0]} material={dark}><boxGeometry args={[16.1, 0.18, 11.65]}/></mesh>
    <Neon position={[0, 3.45, 0]} size={[15.8, 0.025, 0.035]}/>
    <Neon position={[0, 0.72, 5.5]} size={[14.9, 0.025, 0.035]}/>
    <Neon position={[-7.58, 1.95, 0]} rotation={[0, Math.PI / 2, 0]} size={[10.6, 0.025, 0.035]}/>
    <Neon position={[7.58, 1.95, 0]} rotation={[0, Math.PI / 2, 0]} size={[10.6, 0.025, 0.035]}/>
    <mesh position={[0.5, 5.05, -0.85]} material={floor}><boxGeometry args={[11.6, 0.2, 8.1]}/></mesh>
    <mesh position={[0.5, 7.18, -0.85]} material={dark}><boxGeometry args={[12.15, 0.24, 8.5]}/></mesh>
    <mesh position={[-5.25, 6.05, -0.85]} material={concrete}><boxGeometry args={[0.22, 2.05, 8.2]}/></mesh>
    <mesh position={[6.25, 6.05, -0.85]} material={concrete}><boxGeometry args={[0.22, 2.05, 8.2]}/></mesh>
    <Glass position={[0.5, 6.05, 3.2]} size={[11.45, 1.95, 0.075]}/>
    {Array.from({ length: 8 }, (_, i) => <Frame key={i} position={[-4.65 + i * 1.47, 6.05, 3.22]} size={[0.045, 1.92, 0.09]}/>)}
    <Neon position={[0.5, 7.28, 3.25]} size={[11.5, 0.025, 0.035]}/>
    <Neon position={[0.5, 5.02, 3.25]} size={[11.5, 0.025, 0.035]}/>
    {Array.from({ length: 11 }, (_, i) => <Frame key={i} position={[-5.1 + i * 1.02, 7.43, -0.85]} size={[0.12, 0.32, 8.55]} color="#26394d"/>)}
    <group position={[-5.8, 0.36, -0.1]}>
      {Array.from({ length: 13 }, (_, i) => <group key={i}>
        <mesh position={[i * 0.32, i * 0.285, 0]}><boxGeometry args={[0.68, 0.14, 1.65]}/><meshStandardMaterial color="#8396a8" metalness={0.56} roughness={0.3}/></mesh>
        <Neon position={[i * 0.32, i * 0.285 - 0.075, 0.83]} size={[0.58, 0.018, 0.025]}/>
      </group>)}
      <Glass position={[1.9, 1.95, 0.76]} size={[4.4, 0.95, 0.045]}/>
      <Frame position={[1.9, 2.43, 0.76]} size={[4.45, 0.045, 0.07]} color="#a4bacb"/>
    </group>
    <Frame position={[-7.53, 1.95, 4.3]} size={[0.12, 3.0, 1.6]} color="#98724f"/>
    <Frame position={[7.53, 1.95, -4.15]} size={[0.12, 3.0, 1.7]} color="#98724f"/>
    <Frame position={[0, 3.64, -5.15]} size={[15.6, 0.1, 0.3]} color="#8e765d"/>
    <mesh position={[0, 0.04, 7.25]}><boxGeometry args={[19, 0.16, 4.2]}/><meshStandardMaterial color="#243649" roughness={0.4} metalness={0.22}/></mesh>
    <Pool/>
    {[-9.2, -6.8, 6.8, 9.2].map((x, i) => <Tree key={x} position={[x, 0, 4.4 + (i % 2) * 1.4]} scale={i % 2 ? 0.85 : 1.1}/>)}
    {[-7, -4, 4, 7].map(x => <group key={x} position={[x, 0, 11.9]}>
      <mesh position={[0, 0.22, 0]}><boxGeometry args={[1.7, 0.45, 0.8]}/><meshStandardMaterial color="#172b3b" roughness={0.9}/></mesh>
    </group>)}
    <Suspense fallback={null}><Interior/></Suspense>
  </group>
}