import { useMemo } from 'react'
import * as THREE from 'three'

function Box({ position, size, color, roughness = 0.55, metalness = 0 }: {
  position: [number, number, number]; size: [number, number, number]; color: string
  roughness?: number; metalness?: number
}) {
  return <mesh position={position} castShadow receiveShadow>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
  </mesh>
}

function Plant({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, 0.22, 0]} castShadow>
      <cylinderGeometry args={[0.22, 0.16, 0.42, 20]} />
      <meshStandardMaterial color="#172b39" roughness={0.72} />
    </mesh>
    <mesh position={[0, 0.44, 0]}>
      <cylinderGeometry args={[0.18, 0.18, 0.035, 20]} />
      <meshStandardMaterial color="#293f4b" />
    </mesh>
    {Array.from({ length: 7 }, (_, i) => {
      const angle = i * Math.PI * 2 / 7
      return <group key={i} rotation={[0, angle, 0]}>
        <mesh position={[Math.sin(angle) * 0.22, 0.88 + (i % 3) * 0.08, Math.cos(angle) * 0.22]} rotation={[0.2, 0, -0.28]} castShadow>
          <sphereGeometry args={[0.13, 12, 10]} />
          <meshStandardMaterial color={i % 2 ? '#286b5b' : '#397d65'} roughness={0.88} />
        </mesh>
        <mesh position={[0, 0.82, 0]}><cylinderGeometry args={[0.018, 0.025, 0.72, 6]} /><meshStandardMaterial color="#345e4b" /></mesh>
      </group>
    })}
    <mesh position={[0, 1.25, 0]} castShadow><sphereGeometry args={[0.2, 14, 12]} /><meshStandardMaterial color="#347b61" roughness={0.9} /></mesh>
  </group>
}

function Sofa({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return <group position={position} rotation={[0, rotation, 0]}>
    <Box position={[0, 0.34, 0]} size={[3.15, 0.48, 1.08]} color="#263c50" roughness={0.88} />
    <Box position={[0, 0.78, -0.43]} size={[3.15, 0.62, 0.22]} color="#304b61" roughness={0.9} />
    {[-1.48, 1.48].map(x => <Box key={x} position={[x, 0.67, 0]} size={[0.22, 0.66, 1.02]} color="#304b61" roughness={0.86} />)}
    {[-0.95, 0, 0.95].map(x => <group key={x}>
      <Box position={[x, 0.66, -0.08]} size={[0.91, 0.12, 0.76]} color="#3b566b" roughness={0.94} />
      <Box position={[x, 0.92, -0.38]} size={[0.72, 0.42, 0.16]} color="#a9bac5" roughness={0.98} />
    </group>)}
    {[-1.15, 1.15].map(x => <mesh key={x} position={[x, 0.13, 0]}><cylinderGeometry args={[0.045, 0.045, 0.26, 10]} /><meshStandardMaterial color="#111c28" metalness={0.7} /></mesh>)}
  </group>
}

function DeskSetup({ position }: { position: [number, number, number] }) {
  return <group position={position}>
    <Box position={[0, 0.86, 0]} size={[3.5, 0.13, 1.25]} color="#263a4e" roughness={0.32} metalness={0.35} />
    <Box position={[0, 0.43, -0.48]} size={[0.12, 0.82, 0.12]} color="#687d90" metalness={0.8} />
    <Box position={[-1.48, 0.43, -0.48]} size={[0.12, 0.82, 0.12]} color="#687d90" metalness={0.8} />
    <Box position={[1.48, 0.43, -0.48]} size={[0.12, 0.82, 0.12]} color="#687d90" metalness={0.8} />
    {[-0.88, 0, 0.88].map((x, i) => <group key={x} position={[x, 0, -0.22]}>
      <Box position={[0, 1.45, 0]} size={[0.78, 0.5, 0.075]} color="#070d17" roughness={0.18} metalness={0.3} />
      <Box position={[0, 1.45, 0.043]} size={[0.69, 0.4, 0.012]} color={i === 1 ? '#123a58' : '#10253a'} roughness={0.22} metalness={0.22} />
      <Box position={[0, 1.13, 0]} size={[0.08, 0.22, 0.08]} color="#8499aa" metalness={0.8} />
      <Box position={[0, 1.01, 0.04]} size={[0.32, 0.035, 0.25]} color="#6d8194" metalness={0.7} />
    </group>)}
    <Box position={[0, 0.96, 0.42]} size={[1.05, 0.035, 0.28]} color="#111a27" roughness={0.4} />
    {Array.from({ length: 12 }, (_, i) => <Box key={i} position={[-0.46 + (i % 6) * 0.18, 0.985, 0.4 + Math.floor(i / 6) * 0.09]} size={[0.12, 0.012, 0.055]} color="#8da6ba" roughness={0.35} />)}
    <Box position={[0, 0.56, 0.8]} size={[0.68, 0.08, 0.68]} color="#1b2d3e" />
    <Box position={[0, 0.34, 0.8]} size={[0.08, 0.42, 0.08]} color="#75889a" metalness={0.8} />
    <pointLight position={[0, 1.9, 0.1]} color="#2daeff" intensity={1.8} distance={4} />
  </group>
}

function FloorLamp({ position }: { position: [number, number, number] }) {
  return <group position={position}>
    <mesh position={[0, 0.08, 0]}><cylinderGeometry args={[0.25, 0.28, 0.1, 24]} /><meshStandardMaterial color="#24394c" metalness={0.8} /></mesh>
    <mesh position={[0, 1.12, 0]}><cylinderGeometry args={[0.025, 0.035, 2.05, 12]} /><meshStandardMaterial color="#8497a8" metalness={0.85} /></mesh>
    <mesh position={[0, 2.16, 0]}><coneGeometry args={[0.3, 0.42, 24, 1, true]} /><meshStandardMaterial color="#9bc9e3" emissive="#2c9bdf" emissiveIntensity={0.55} side={THREE.DoubleSide} /></mesh>
    <pointLight position={[0, 2.05, 0]} color="#8bcfff" intensity={2.1} distance={5} />
  </group>
}

function WallArt({ position, rotation = 0, accent = '#42baff' }: { position: [number, number, number]; rotation?: number; accent?: string }) {
  return <group position={position} rotation={[0, rotation, 0]}>
    <Box position={[0, 0, 0]} size={[1.15, 0.82, 0.09]} color="#111b28" roughness={0.45} metalness={0.45} />
    <Box position={[0, 0, 0.052]} size={[1.02, 0.69, 0.018]} color="#182b3e" roughness={0.9} />
    <mesh position={[0, 0, 0.07]}><torusGeometry args={[0.24, 0.018, 8, 40]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.5} /></mesh>
    <mesh position={[0, 0, 0.075]} rotation={[0, 0, Math.PI / 3]}><boxGeometry args={[0.56, 0.018, 0.012]} /><meshStandardMaterial color="#a7cde4" metalness={0.6} /></mesh>
  </group>
}

function Bookshelf({ position }: { position: [number, number, number] }) {
  const bookColors = ['#6b8aa2', '#bd8b5c', '#3b647b', '#7c9b9d', '#a9b5bd', '#5b6d83']
  return <group position={position}>
    <Box position={[0, 1.25, 0]} size={[2.35, 2.55, 0.22]} color="#182a3b" roughness={0.42} />
    {[0.2, 0.86, 1.52, 2.18].map(y => <Box key={y} position={[0, y, 0.17]} size={[2.28, 0.055, 0.42]} color="#8396a5" roughness={0.35} metalness={0.45} />)}
    {Array.from({ length: 17 }, (_, i) => <Box key={i} position={[-0.98 + (i % 6) * 0.36, 0.42 + Math.floor(i / 6) * 0.66, 0.18]} size={[0.24, 0.42 + (i % 3) * 0.08, 0.24]} color={bookColors[i % bookColors.length]} roughness={0.8} />)}
    <Box position={[0, 2.62, 0.1]} size={[2.55, 0.12, 0.42]} color="#9ab0c1" metalness={0.55} />
  </group>
}

export function Interior() {
  const rug = useMemo(() => new THREE.MeshStandardMaterial({ color: '#182c40', roughness: 0.98 }), [])
  return <group>
    {/* Lounge zone: large rug, sectional sofa, sculptural table */}
    <mesh position={[1.55, 0.235, 1.55]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={rug}><planeGeometry args={[6.1, 4.25]} /></mesh>
    <Sofa position={[1.7, 0.22, 2.6]} />
    <Sofa position={[-0.15, 0.22, 0.75]} rotation={Math.PI / 2} />
    <mesh position={[1.7, 0.48, 0.65]} castShadow><cylinderGeometry args={[0.83, 0.7, 0.12, 48]} /><meshStandardMaterial color="#8297a8" metalness={0.72} roughness={0.22} /></mesh>
    <mesh position={[1.7, 0.34, 0.65]}><cylinderGeometry args={[0.24, 0.35, 0.22, 24]} /><meshStandardMaterial color="#263c50" metalness={0.65} /></mesh>
    <Box position={[1.1, 0.57, 0.56]} size={[0.55, 0.035, 0.34]} color="#b6c5d0" roughness={0.24} metalness={0.3} />
    <Box position={[2.1, 0.57, 0.72]} size={[0.38, 0.035, 0.28]} color="#b6c5d0" roughness={0.24} metalness={0.3} />
    <FloorLamp position={[-1.1, 0.2, 2.4]} />
    <Plant position={[4.8, 0.2, 2.9]} scale={1.25} />

    {/* Media wall and gallery */}
    <group position={[0, 0, -4.58]}>
      <Box position={[0, 1.65, 0]} size={[5.7, 2.8, 0.3]} color="#101d2c" roughness={0.45} />
      <Box position={[0, 1.75, 0.19]} size={[3.45, 1.85, 0.045]} color="#050b14" roughness={0.18} metalness={0.35} />
      <Box position={[0, 1.75, 0.22]} size={[3.28, 1.68, 0.012]} color="#102a42" roughness={0.22} />
      <mesh position={[0, 1.75, 0.24]}><torusGeometry args={[0.42, 0.018, 8, 48]} /><meshStandardMaterial color="#4bbfff" emissive="#148de2" emissiveIntensity={2} /></mesh>
      <Box position={[0, 0.35, 0.3]} size={[4.4, 0.16, 0.72]} color="#283c50" roughness={0.35} metalness={0.25} />
      <WallArt position={[-3.65, 2.1, 0.22]} accent="#c58b59" />
      <WallArt position={[3.65, 2.1, 0.22]} accent="#63c8bd" />
    </group>

    {/* Developer studio */}
    <group position={[3.55, 0, -2.75]}>
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5.4, 3.4]} /><meshStandardMaterial color="#10243a" roughness={0.95} /></mesh>
      <DeskSetup position={[0, 0, -0.35]} />
      <Bookshelf position={[-2.7, 0, -1.3]} />
      <Plant position={[2.5, 0.2, 0.9]} scale={0.9} />
      <FloorLamp position={[2.35, 0.2, -1.55]} />
      <Box position={[0, 0.15, 1.55]} size={[1.45, 0.3, 0.8]} color="#192c40" roughness={0.82} />
      <Box position={[0, 0.52, 1.55]} size={[1.18, 0.48, 0.12]} color="#263d53" roughness={0.82} />
    </group>

    {/* Reading nook and display shelving upstairs */}
    <group position={[-2.5, 5.38, -1.25]}>
      <Box position={[0, 0.42, 0]} size={[2.1, 0.72, 0.9]} color="#304b60" roughness={0.88} />
      <Box position={[0, 0.82, -0.34]} size={[2.1, 0.58, 0.18]} color="#3b566b" roughness={0.9} />
      <Box position={[0, 0.12, 0]} size={[1.8, 0.12, 0.72]} color="#172a3c" metalness={0.5} />
      <FloorLamp position={[-1.55, 0, -0.6]} />
      <Bookshelf position={[2.15, 0, -2.55]} />
      <WallArt position={[-0.1, 1.65, -2.7]} accent="#55c7ff" />
      <Plant position={[1.35, 0, 0.95]} scale={0.72} />
    </group>

    {/* Architectural planting, warm/cool pools of light */}
    <Plant position={[-6.3, 0.2, -3.7]} scale={1.35} />
    <Plant position={[6.15, 0.2, 3.7]} scale={1.25} />
    <Plant position={[-6.15, 0.2, 3.65]} scale={0.9} />
    <pointLight position={[1.8, 2.5, 1.5]} color="#4aaeff" intensity={3.5} distance={9} />
    <pointLight position={[-3.4, 2.3, -2.4]} color="#e6b77b" intensity={2.2} distance={7} />
    <pointLight position={[2.4, 6.8, -1.8]} color="#2a9fff" intensity={2.5} distance={8} />
  </group>
}
