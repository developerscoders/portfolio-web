import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

type Props = { cameraMode: 'first' | 'third'; started: boolean }

export function Avatar({ cameraMode, started }: Props) {
  const root = useRef<THREE.Group>(null)
  const body = useRef<THREE.Group>(null)
  const keys = useRef<Record<string, boolean>>({})
  const { camera, gl } = useThree()
  const direction = useRef(new THREE.Vector3())
  const target = useRef(new THREE.Vector3(0, 1.2, 1.5))
  const yaw = useRef(0)
  const pitch = useRef(-0.12)
  const dragging = useRef(false)
  const previous = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const down = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true }
    const up = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false }
    const canvas = gl.domElement
    const pointerDown = (e: PointerEvent) => { dragging.current = true; previous.current = { x: e.clientX, y: e.clientY }; canvas.setPointerCapture(e.pointerId) }
    const pointerUp = () => { dragging.current = false }
    const pointerMove = (e: PointerEvent) => {
      if (!dragging.current || !started) return
      yaw.current -= (e.clientX - previous.current.x) * 0.004
      pitch.current = THREE.MathUtils.clamp(pitch.current - (e.clientY - previous.current.y) * 0.003, -0.7, 0.45)
      previous.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    canvas.addEventListener('pointerdown', pointerDown)
    window.addEventListener('pointerup', pointerUp)
    canvas.addEventListener('pointermove', pointerMove)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      canvas.removeEventListener('pointerdown', pointerDown)
      window.removeEventListener('pointerup', pointerUp)
      canvas.removeEventListener('pointermove', pointerMove)
    }
  }, [gl, started])

  useFrame((_, delta) => {
    if (!root.current) return
    const speed = (keys.current.shift ? 5.8 : 3.1) * Math.min(delta, 0.04)
    const forward = Number(keys.current.w || keys.current.arrowup) - Number(keys.current.s || keys.current.arrowdown)
    const sideways = Number(keys.current.d || keys.current.arrowright) - Number(keys.current.a || keys.current.arrowleft)
    direction.current.set(sideways, 0, -forward).normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw.current)
    if (started && (forward || sideways)) {
      root.current.position.addScaledVector(direction.current, speed)
      root.current.position.x = THREE.MathUtils.clamp(root.current.position.x, -6.4, 6.4)
      root.current.position.z = THREE.MathUtils.clamp(root.current.position.z, -4.2, 4.3)
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, Math.atan2(direction.current.x, direction.current.z), 9, delta)
      if (body.current) body.current.position.y = Math.sin(performance.now() * 0.012) * 0.035
    } else if (body.current) body.current.position.y = THREE.MathUtils.damp(body.current.position.y, 0, 8, delta)

    const p = root.current.position
    if (cameraMode === 'third') {
      const offset = new THREE.Vector3(Math.sin(yaw.current) * 5.2, 2.5 + pitch.current * 1.5, Math.cos(yaw.current) * 5.2)
      target.current.lerp(new THREE.Vector3(p.x, p.y + 1.1, p.z), 1 - Math.exp(-5 * delta))
      camera.position.lerp(new THREE.Vector3(p.x + offset.x, p.y + offset.y, p.z + offset.z), 1 - Math.exp(-4 * delta))
      camera.lookAt(target.current)
    } else {
      const eye = new THREE.Vector3(p.x, p.y + 1.65, p.z)
      const look = new THREE.Vector3(Math.sin(yaw.current) * 8, Math.sin(pitch.current) * 8, -Math.cos(yaw.current) * 8)
      camera.position.lerp(eye, 1 - Math.exp(-8 * delta))
      camera.lookAt(eye.clone().add(look))
    }
  })

  return <group ref={root} position={[0, 0.18, 2.2]}>
    {cameraMode === 'third' && <group ref={body}>
      <mesh position={[0, 1.08, 0]} castShadow><capsuleGeometry args={[0.31, 0.78, 5, 12]}/><meshStandardMaterial color="#10141c" roughness={0.82}/></mesh>
      <mesh position={[0, 1.83, 0]} castShadow><sphereGeometry args={[0.23, 24, 24]}/><meshStandardMaterial color="#9b6247" roughness={0.72}/></mesh>
      <mesh position={[0, 1.87, -0.04]}><sphereGeometry args={[0.235, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.58]}/><meshStandardMaterial color="#17171a" roughness={0.95}/></mesh>
      <mesh position={[-0.14, 0.35, 0]} castShadow><capsuleGeometry args={[0.105, 0.54, 4, 8]}/><meshStandardMaterial color="#151b26" roughness={0.85}/></mesh>
      <mesh position={[0.14, 0.35, 0]} castShadow><capsuleGeometry args={[0.105, 0.54, 4, 8]}/><meshStandardMaterial color="#151b26" roughness={0.85}/></mesh>
      <mesh position={[0, 1.12, 0.315]}><boxGeometry args={[0.16, 0.12, 0.018]}/><meshStandardMaterial color="#c58a4c" metalness={0.7} roughness={0.35}/></mesh>
    </group>}
  </group>
}