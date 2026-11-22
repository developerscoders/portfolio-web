import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { MessageCircle, Mic, Volume2, X } from 'lucide-react'
import './avatar.css'

type Mode = 'hero' | 'resident'
type AvatarProps = { mode: Mode }
type Motion = { gaze: THREE.Vector2; jaw: number; speaking: boolean }

function RiggedHuman({ motion }: { motion: MutableRefObject<Motion> }) {
  const { scene } = useGLTF('/models/pallav-avatar.glb')
  const head = useMemo(() => scene.getObjectByName('Head') || scene.getObjectByName('head'), [scene])
  const leftEye = useMemo(() => scene.getObjectByName('LeftEye') || scene.getObjectByName('leftEye') || scene.getObjectByName('mixamorigLeftEye'), [scene])
  const rightEye = useMemo(() => scene.getObjectByName('RightEye') || scene.getObjectByName('rightEye') || scene.getObjectByName('mixamorigRightEye'), [scene])
  const meshes = useMemo(() => { const list: THREE.Mesh[] = []; scene.traverse(o => { if ((o as THREE.Mesh).isMesh) list.push(o as THREE.Mesh) }); return list }, [scene])
  const baseHead = useRef(new THREE.Euler())
  useEffect(() => { if (head) baseHead.current.copy(head.rotation) }, [head])
  useFrame((_, delta) => {
    const m = motion.current
    const ease = 1 - Math.exp(-8 * delta)
    if (leftEye) { leftEye.rotation.y = THREE.MathUtils.lerp(leftEye.rotation.y, m.gaze.x * .28, ease); leftEye.rotation.x = THREE.MathUtils.lerp(leftEye.rotation.x, -m.gaze.y * .18, ease) }
    if (rightEye) { rightEye.rotation.y = THREE.MathUtils.lerp(rightEye.rotation.y, m.gaze.x * .28, ease); rightEye.rotation.x = THREE.MathUtils.lerp(rightEye.rotation.x, -m.gaze.y * .18, ease) }
    if (head) { head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, baseHead.current.y + m.gaze.x * .10, ease); head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, baseHead.current.x - m.gaze.y * .055, ease) }
    for (const mesh of meshes) {
      const dictionary = mesh.morphTargetDictionary
      const influences = mesh.morphTargetInfluences
      if (!dictionary || !influences) continue
      for (const [name, value] of Object.entries({ jawOpen: m.jaw, mouthOpen: m.jaw, viseme_aa: m.jaw, viseme_oh: m.jaw * .45 })) {
        const key = dictionary[name]
        if (key !== undefined) influences[key] = THREE.MathUtils.lerp(influences[key] || 0, value, ease)
      }
    }
  })
  return <primitive object={scene} position={[0, -1.55, 0]} scale={1.8}/>
}

function Scene({ motion }: { motion: React.MutableRefObject<Motion> }) {
  return <Canvas camera={{ position: [0, 0, 3.4], fov: 32 }} dpr={[1, 1.35]} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}>
    <ambientLight intensity={1.8}/><directionalLight position={[2, 3, 4]} intensity={2.2}/><directionalLight position={[-3, 1, -2]} intensity={1.1} color="#83caff"/>
    <Suspense fallback={<Html center><span className="avatar-canvas-loading">PREPARING AVATAR</span></Html>}><RiggedHuman motion={motion}/></Suspense>
  </Canvas>
}

export default function AvatarCompanion({ mode }: AvatarProps) {
  const [modelReady, setModelReady] = useState(false)
  const [open, setOpen] = useState(true)
  const [speaking, setSpeaking] = useState(false)
  const [available, setAvailable] = useState(false)
  const motion = useRef<Motion>({ gaze: new THREE.Vector2(), jaw: 0, speaking: false })
  const lastBoundary = useRef(0)
  const greeting = "Hey, I’m Pallav. Welcome to my digital residence. I’m a full-stack developer and AI builder. Explore my projects, experience and the ideas I’m bringing to life."
  useEffect(() => {
    let alive = true
    fetch('/models/pallav-avatar.glb', { method: 'HEAD' }).then(r => { if (alive) setModelReady(r.ok) }).catch(() => { if (alive) setModelReady(false) })
    setAvailable('speechSynthesis' in window)
    const move = (event: PointerEvent) => {
      motion.current.gaze.set((event.clientX / Math.max(innerWidth, 1) - .5) * 2, -((event.clientY / Math.max(innerHeight, 1) - .5) * 2))
    }
    const reset = () => motion.current.gaze.set(0, 0)
    window.addEventListener('pointermove', move, { passive: true }); window.addEventListener('blur', reset)
    return () => { alive = false; window.removeEventListener('pointermove', move); window.removeEventListener('blur', reset) }
  }, [])
  useEffect(() => {
    if (!available || sessionStorage.getItem('pallav-avatar-greeted')) return
    const timer = window.setTimeout(() => { sessionStorage.setItem('pallav-avatar-greeted', '1'); say(greeting) }, 2200)
    return () => window.clearTimeout(timer)
  }, [available])
  useEffect(() => () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel() }, [])
  const say = (text: string) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const voices = window.speechSynthesis.getVoices()
    const english = voices.filter(v => v.lang.toLowerCase().startsWith('en'))
    const voice = english.find(v => /en-in/i.test(v.lang) && /ravi|prabhat|male/i.test(v.name)) || english.find(v => /david|mark|guy|ryan|daniel|james|george|thomas|oliver|alex/i.test(v.name)) || english.find(v => /en-in/i.test(v.lang)) || english[0]
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voice || null; utterance.lang = voice?.lang || 'en-IN'; utterance.rate = .94; utterance.pitch = .88
    utterance.onstart = () => { setSpeaking(true); motion.current.speaking = true }
    utterance.onboundary = event => {
      const char = text.slice(event.charIndex, event.charIndex + 3).toLowerCase()
      const vowel = /[aou]/.test(char) ? .72 : /[ei]/.test(char) ? .42 : /[bmp]/.test(char) ? .04 : .22
      motion.current.jaw = vowel
      lastBoundary.current = performance.now()
    }
    utterance.onend = () => { setSpeaking(false); motion.current.speaking = false; motion.current.jaw = 0 }
    utterance.onerror = () => { setSpeaking(false); motion.current.speaking = false; motion.current.jaw = 0 }
    window.speechSynthesis.speak(utterance)
  }
  useEffect(() => {
    let frame = 0
    const animate = () => {
      if (motion.current.speaking && performance.now() - lastBoundary.current > 180) motion.current.jaw = Math.max(0, motion.current.jaw * .82)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])
  if (!open) return <button className="avatar-reopen" onClick={() => setOpen(true)} aria-label="Open Pallav avatar"><MessageCircle size={20}/></button>
  return <aside className={'avatar-companion '+(mode === 'hero' ? 'avatar-hero' : 'avatar-resident')} aria-label="Pallav's digital avatar">
    <div className="avatar-topline"><span><i/> PALLAV · DIGITAL TWIN</span><button onClick={() => setOpen(false)} aria-label="Minimize avatar"><X size={14}/></button></div>
    <div className="avatar-visual">
      {modelReady ? <Scene motion={motion}/> : <div className="avatar-photo-fallback"><img className="avatar-reference-photo" src="/pallav-avatar.jpg" alt="Pallav portrait reference" onError={event => { event.currentTarget.style.display = "none" }}/><div className="avatar-photo-message"><strong>YOUR 3D AVATAR</strong><span>Add the rigged model at <code>/public/models/pallav-avatar.glb</code></span></div><div className="avatar-silhouette"><div className="avatar-silhouette-head"/><div className="avatar-silhouette-body"/></div></div>}
      <span className="avatar-status">{speaking ? 'SPEAKING' : modelReady ? 'EYE TRACKING READY' : 'MODEL ASSET NEEDED'}</span>
    </div>
    <div className="avatar-caption"><div><strong>{speaking ? 'Speaking with you' : 'Hey, I’m Pallav.'}</strong><p>{modelReady ? 'My eyes follow your cursor. Ask me about the work.' : 'The interactive avatar rig will appear here once its GLB asset is added.'}</p></div><button onClick={() => say(greeting)} disabled={!available} aria-label="Play welcome voice"><Mic size={15}/><span>{speaking ? 'SPEAKING' : 'SAY HELLO'}</span></button></div>
    <div className="avatar-foot"><Volume2 size={12}/> FREE DEVICE VOICE · {modelReady ? '3D RIG CONNECTED' : 'WAITING FOR GLB'}</div>
  </aside>
}
