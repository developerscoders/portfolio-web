import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MessageCircle, Mic, MicOff, Volume2, X } from 'lucide-react'
import './avatar.css'

type Mode = 'hero' | 'resident'
type Motion = {
  gaze: THREE.Vector2
  jaw: number
  blink: number
  talking: boolean
  headTarget: THREE.Vector2
}
type SpeechRecognitionResult = { 0: { transcript: string }; isFinal: boolean }
type SpeechRecognitionEvent = { results: ArrayLike<SpeechRecognitionResult> }
type SpeechRecognitionLike = {
  lang: string
  interimResults: boolean
  continuous: boolean
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}
type SpeechWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike
  webkitSpeechRecognition?: new () => SpeechRecognitionLike
}

function Eye({ x, motion, side }: { x: number; motion: MutableRefObject<Motion>; side: 'left' | 'right' }) {
  const eye = useRef<THREE.Group>(null)
  const lid = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (eye.current) {
      const targetX = THREE.MathUtils.clamp(motion.current.gaze.x * 0.22, -0.23, 0.23)
      const targetY = THREE.MathUtils.clamp(-motion.current.gaze.y * 0.16, -0.16, 0.16)
      eye.current.rotation.y = THREE.MathUtils.damp(eye.current.rotation.y, targetX, 15, delta)
      eye.current.rotation.x = THREE.MathUtils.damp(eye.current.rotation.x, targetY, 15, delta)
    }
    if (lid.current) {
      const blinkScale = 1 - motion.current.blink * 0.96
      lid.current.scale.y = THREE.MathUtils.damp(lid.current.scale.y, 0.068 * Math.max(0.035, blinkScale), 32, delta)
    }
  })
  return <group position={[x, 0.105, 0.382]}>
    <mesh scale={[0.105, 0.073, 0.045]}><sphereGeometry args={[1, 32, 24]}/><meshStandardMaterial color="#f3eee8" roughness={0.22}/></mesh>
    <group ref={eye}>
      <mesh position={[0, 0, 0.036]} scale={[0.043, 0.046, 0.018]}><sphereGeometry args={[1, 24, 20]}/><meshStandardMaterial color="#76513b" roughness={0.25}/></mesh>
      <mesh position={[0, 0, 0.051]} scale={[0.022, 0.027, 0.012]}><sphereGeometry args={[1, 20, 16]}/><meshStandardMaterial color="#10151b" roughness={0.15}/></mesh>
      <mesh position={[-0.009, 0.013, 0.061]} scale={[0.008, 0.008, 0.004]}><sphereGeometry args={[1, 12, 12]}/><meshBasicMaterial color="white"/></mesh>
    </group>
    <mesh ref={lid} position={[0, 0.026, 0.054]} scale={[0.112, 0.068, 0.035]}><sphereGeometry args={[1, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.48]}/><meshStandardMaterial color="#bd896f" roughness={0.82}/></mesh>
    <mesh position={[0, 0.095, 0.005]} rotation={[0, 0, side === 'left' ? 0.08 : -0.08]} scale={[0.115, 0.021, 0.025]}><capsuleGeometry args={[0.012, 0.16, 5, 12]}/><meshStandardMaterial color="#29201d" roughness={0.95}/></mesh>
  </group>
}

function ProceduralHead({ motion }: { motion: MutableRefObject<Motion> }) {
  const head = useRef<THREE.Group>(null)
  const jaw = useRef<THREE.Group>(null)
  const mouth = useRef<THREE.Mesh>(null)
  const upperLip = useRef<THREE.Mesh>(null)
  const hair = useMemo(() => new THREE.MeshStandardMaterial({ color: '#17191d', roughness: 0.9 }), [])
  const skin = useMemo(() => new THREE.MeshStandardMaterial({ color: '#bd896f', roughness: 0.78 }), [])
  useFrame((state, delta) => {
    const m = motion.current
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, m.headTarget.x * 0.12, 4.5, delta)
      head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -m.headTarget.y * 0.075 + Math.sin(state.clock.elapsedTime * 1.2) * 0.008, 4.5, delta)
    }
    if (jaw.current) jaw.current.rotation.x = THREE.MathUtils.damp(jaw.current.rotation.x, m.jaw * 0.32, 18, delta)
    if (mouth.current) mouth.current.scale.y = THREE.MathUtils.damp(mouth.current.scale.y, 0.25 + m.jaw * 1.8, 20, delta)
    if (upperLip.current) upperLip.current.scale.x = THREE.MathUtils.damp(upperLip.current.scale.x, 1 + m.jaw * 0.08, 12, delta)
  })
  return <group ref={head} position={[0, 0.77, 0]}>
    {/* Skull and facial planes */}
    <mesh position={[0, 0.02, 0]} scale={[0.48, 0.61, 0.405]} material={skin}><sphereGeometry args={[1, 48, 40]}/></mesh>
    <mesh position={[0, -0.20, 0.13]} scale={[0.365, 0.34, 0.31]} material={skin}><sphereGeometry args={[1, 40, 32]}/></mesh>
    <mesh position={[0, -0.43, 0.13]} scale={[0.26, 0.17, 0.26]} material={skin}><sphereGeometry args={[1, 32, 24]}/></mesh>
    {/* Ears */}
    {[-1, 1].map(side => <group key={side} position={[side * 0.465, -0.06, -0.005]}><mesh scale={[0.085, 0.145, 0.075]} material={skin}><sphereGeometry args={[1, 24, 20]}/></mesh><mesh position={[0, 0, 0.054]} scale={[0.033, 0.078, 0.018]}><sphereGeometry args={[1, 16, 12]}/><meshStandardMaterial color="#865d4e"/></mesh></group>)}
    {/* Nose bridge and tip */}
    <mesh position={[0, -0.075, 0.365]} scale={[0.062, 0.105, 0.055]} material={skin}><sphereGeometry args={[1, 24, 20]}/></mesh>
    <mesh position={[0, -0.155, 0.392]} scale={[0.072, 0.048, 0.052]} material={skin}><sphereGeometry args={[1, 24, 18]}/></mesh>
    {[-1, 1].map(side => <mesh key={side} position={[side * 0.043, -0.177, 0.388]} scale={[0.018, 0.009, 0.012]}><sphereGeometry args={[1, 16, 12]}/><meshStandardMaterial color="#704c42"/></mesh>)}
    {/* Eyes and brows */}
    <Eye x={-0.19} motion={motion} side="left"/><Eye x={0.19} motion={motion} side="right"/>
    {[-1, 1].map(side => <mesh key={side} position={[side * 0.19, 0.225, 0.365]} rotation={[0, 0, side * -0.06]} scale={[0.13, 0.027, 0.035]} material={hair}><sphereGeometry args={[1, 24, 16]}/></mesh>)}
    {/* Beard and moustache */}
    <mesh position={[0, -0.355, 0.235]} scale={[0.29, 0.17, 0.16]} material={hair}><sphereGeometry args={[1, 36, 24]}/></mesh>
    <mesh position={[0, -0.245, 0.365]} scale={[0.145, 0.035, 0.025]} material={hair}><sphereGeometry args={[1, 24, 16]}/></mesh>
    {/* Hair cap and swept front quiff */}
    <mesh position={[0, 0.39, -0.015]} scale={[0.49, 0.30, 0.42]} material={hair}><sphereGeometry args={[1, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.72]}/></mesh>
    <mesh position={[0.02, 0.48, 0.20]} rotation={[0.22, 0, -0.12]} scale={[0.31, 0.16, 0.22]} material={hair}><sphereGeometry args={[1, 32, 20]}/></mesh>
    {[-1, 1].map(side => <mesh key={side} position={[side * 0.42, 0.24, 0.06]} rotation={[0, 0, side * -0.08]} scale={[0.075, 0.22, 0.12]} material={hair}><sphereGeometry args={[1, 24, 16]}/></mesh>)}
    {/* Mouth cavity, lips and articulated lower jaw */}
    <mesh ref={mouth} position={[0, -0.245, 0.411]} scale={[0.105, 0.25, 0.025]}><sphereGeometry args={[1, 24, 16]}/><meshStandardMaterial color="#351a1c" roughness={0.8}/></mesh>
    <mesh ref={upperLip} position={[0, -0.225, 0.431]} scale={[0.12, 0.025, 0.018]}><sphereGeometry args={[1, 24, 16]}/><meshStandardMaterial color="#89564f" roughness={0.7}/></mesh>
    <group ref={jaw} position={[0, -0.31, 0.15]}>
      <mesh position={[0, -0.065, 0.12]} scale={[0.265, 0.105, 0.22]} material={skin}><sphereGeometry args={[1, 32, 20]}/></mesh>
    </group>
  </group>
}

function ProceduralBust({ motion }: { motion: MutableRefObject<Motion> }) {
  const torso = useRef<THREE.Group>(null)
  const shirt = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111820', roughness: 0.88 }), [])
  const bronze = useMemo(() => new THREE.MeshStandardMaterial({ color: '#bd8750', metalness: 0.58, roughness: 0.38 }), [])
  useFrame((state, delta) => {
    if (!torso.current) return
    const t = state.clock.elapsedTime
    torso.current.position.y = -0.76 + Math.sin(t * 1.7) * 0.009
    torso.current.rotation.z = THREE.MathUtils.damp(torso.current.rotation.z, Math.sin(t * 0.65) * 0.012, 3, delta)
    const breath = 1 + Math.sin(t * 1.7) * 0.008
    torso.current.scale.set(1, breath, 1)
  })
  return <group ref={torso} position={[0, -0.76, 0]}>
    {/* neck */}
    <mesh position={[0, 0.53, -0.005]} scale={[0.19, 0.30, 0.19]}><cylinderGeometry args={[0.72, 0.88, 1, 32]}/><meshStandardMaterial color="#bd896f" roughness={0.78}/></mesh>
    {/* shoulders and chest */}
    <mesh position={[0, 0.06, -0.02]} scale={[1.02, 0.60, 0.52]} material={shirt}><sphereGeometry args={[0.58, 48, 32]}/></mesh>
    <mesh position={[0, -0.40, -0.015]} scale={[0.80, 0.46, 0.43]} material={shirt}><sphereGeometry args={[0.58, 40, 28]}/></mesh>
    {/* collar */}
    <mesh position={[0, 0.48, 0.10]} rotation={[0.16, 0, 0]} scale={[0.30, 0.10, 0.13]} material={shirt}><torusGeometry args={[0.8, 0.22, 12, 40]}/></mesh>
    {/* subtle bronze embroidered N */}
    <group position={[0.37, 0.02, 0.493]}>
      <mesh material={bronze}><boxGeometry args={[0.025, 0.20, 0.012]}/></mesh>
      <mesh position={[0.075, 0, 0]} rotation={[0, 0, 0.12]} material={bronze}><boxGeometry args={[0.025, 0.20, 0.012]}/></mesh>
      <mesh position={[0.038, 0, 0.008]} rotation={[0, 0, -0.68]} material={bronze}><boxGeometry args={[0.025, 0.23, 0.012]}/></mesh>
    </group>
    <ProceduralHead motion={motion}/>
  </group>
}

function AvatarScene({ motion }: { motion: MutableRefObject<Motion> }) {
  return <Canvas camera={{ position: [0, 0.08, 3.85], fov: 38 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}>
    <ambientLight intensity={1.45}/>
    <directionalLight position={[2, 3, 4]} intensity={2.0} color="#fff0df"/>
    <directionalLight position={[-3, 1, -2]} intensity={1.15} color="#76bfff"/>
    <pointLight position={[0, 1, 2]} intensity={0.35} color="#d9a36a"/>
    <ProceduralBust motion={motion}/>
  </Canvas>
}

const responses = [
  { test: /project|built|work|uvilox|recruit|devforge|billkaro|calmly|mediverse/i, answer: "I've built products including Uvilox AI for real-time voice and accessibility, RecruitFlow AI for recruiter workflows, DevForge for multi-agent development, and several other full-stack and AI projects. You can explore the projects chapter for more detail." },
  { test: /skill|tech|stack|language|python|react|fastapi/i, answer: "My core stack includes Python, TypeScript, React, FastAPI, Node.js, MongoDB, SQL, Docker, Redis, and real-time technologies such as WebSockets and LiveKit. I also work with applied AI and automation." },
  { test: /experience|hrfy|job|work history/i, answer: "I worked as a full-stack developer at Hrfy AI, building recruitment and interview automation products with React, FastAPI and databases. I also worked on resume extraction, asynchronous APIs and real-time interview workflows." },
  { test: /education|study|university|degree/i, answer: "I'm pursuing an MCA focused on Artificial Intelligence and Machine Learning at Vellore Institute of Technology, after completing my BCA at Chandigarh University." },
  { test: /contact|email|hire|available/i, answer: "You can reach me at pallavburnwal@gmail.com, or connect with me through GitHub and LinkedIn. I'm open to full-time developer opportunities and collaborations." },
]
const fallbackAnswer = "I'm Pallav's digital portfolio assistant. Ask me about his projects, technical skills, professional experience, education, or contact details."

export default function AvatarCompanion({ mode }: { mode: Mode }) {
  const [open, setOpen] = useState(true)
  const [speaking, setSpeaking] = useState(false)
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(false)
  const [status, setStatus] = useState('READY')
  const motion = useRef<Motion>({ gaze: new THREE.Vector2(), jaw: 0, blink: 0, talking: false, headTarget: new THREE.Vector2() })
  const blinkTimer = useRef(2.4)
  const blinkProgress = useRef(0)
  const recognition = useRef<SpeechRecognitionLike | null>(null)
  const greeting = "Hey, I'm Pallav. Welcome to my digital residence. I'm a full-stack developer and AI builder. Explore my projects, experience and the ideas I'm bringing to life."

  useEffect(() => {
    setSupported('speechSynthesis' in window)
    const move = (event: PointerEvent) => {
      const x = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2
      const y = -((event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2)
      motion.current.gaze.set(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1))
      motion.current.headTarget.set(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  useEffect(() => {
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05)
      last = now
      blinkTimer.current -= delta
      if (blinkTimer.current <= 0 && blinkProgress.current === 0) blinkProgress.current = 0.001
      if (blinkProgress.current > 0) {
        blinkProgress.current += delta * 8.5
        motion.current.blink = Math.sin(Math.min(1, blinkProgress.current) * Math.PI)
        if (blinkProgress.current >= 1) { blinkProgress.current = 0; blinkTimer.current = 2.1 + Math.random() * 3.1; motion.current.blink = 0 }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) { setStatus('VOICE UNAVAILABLE'); return }
    window.speechSynthesis.cancel()
    const voices = window.speechSynthesis.getVoices()
    const english = voices.filter(v => v.lang.toLowerCase().startsWith('en'))
    const voice = english.find(v => /en-in/i.test(v.lang) && /ravi|prabhat|male/i.test(v.name))
      || english.find(v => /david|mark|guy|ryan|daniel|james|george|thomas|oliver|alex/i.test(v.name))
      || english.find(v => /en-in/i.test(v.lang)) || english[0]
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voice || null
    utterance.lang = voice?.lang || 'en-IN'
    utterance.rate = 0.94
    utterance.pitch = 0.88
    utterance.onstart = () => { setSpeaking(true); setStatus('SPEAKING'); motion.current.talking = true }
    utterance.onboundary = event => {
      const segment = text.slice(event.charIndex, event.charIndex + 4).toLowerCase()
      const openness = /[aou]/.test(segment) ? 0.78 : /[ei]/.test(segment) ? 0.48 : /[bmp]/.test(segment) ? 0.08 : 0.28
      motion.current.jaw = openness
    }
    utterance.onend = () => { setSpeaking(false); setStatus('READY'); motion.current.talking = false; motion.current.jaw = 0 }
    utterance.onerror = () => { setSpeaking(false); setStatus('READY'); motion.current.talking = false; motion.current.jaw = 0 }
    window.speechSynthesis.speak(utterance)
  }, [])

  useEffect(() => {
    if (!supported || sessionStorage.getItem('pallav-procedural-greeted')) return
    const timer = window.setTimeout(() => {
      sessionStorage.setItem('pallav-procedural-greeted', '1')
      speak(greeting)
    }, 2600)
    return () => window.clearTimeout(timer)
  }, [supported, speak])

  useEffect(() => () => {
    window.speechSynthesis?.cancel()
    recognition.current?.stop()
  }, [])

  const stopListening = () => {
    recognition.current?.stop()
    recognition.current = null
    setListening(false)
    setStatus('READY')
  }

  const startListening = () => {
    const SpeechRecognitionCtor = (window as SpeechWindow).SpeechRecognition || (window as SpeechWindow).webkitSpeechRecognition
    if (!SpeechRecognitionCtor) { setStatus('VOICE INPUT NOT SUPPORTED'); return }
    window.speechSynthesis.cancel()
    const instance = new SpeechRecognitionCtor()
    instance.lang = 'en-IN'
    instance.interimResults = false
    instance.continuous = false
    instance.onresult = event => {
      const transcript = event.results[0]?.[0]?.transcript || ''
      const match = responses.find(item => item.test.test(transcript))
      speak(match?.answer || fallbackAnswer)
    }
    instance.onerror = () => { setListening(false); setStatus('MICROPHONE UNAVAILABLE') }
    instance.onend = () => { setListening(false); setStatus('READY'); recognition.current = null }
    recognition.current = instance
    setListening(true)
    setStatus('LISTENING')
    instance.start()
  }

  if (!open) return <button className="avatar-reopen" onClick={() => setOpen(true)} aria-label="Open Pallav avatar"><MessageCircle size={20}/></button>

  return <aside className={'avatar-companion '+(mode === 'hero' ? 'avatar-hero' : 'avatar-resident')} aria-label="Pallav's procedural digital avatar">
    <div className="avatar-topline"><span><i/> PALLAV · DIGITAL AVATAR</span><button onClick={() => setOpen(false)} aria-label="Minimize avatar"><X size={14}/></button></div>
    <div className="avatar-visual avatar-procedural-visual"><Suspense fallback={<span className="avatar-canvas-loading">BUILDING AVATAR…</span>}><AvatarScene motion={motion}/></Suspense><span className="avatar-status">{status} · EYE TRACKING ACTIVE</span></div>
    <div className="avatar-caption"><div><strong>{speaking ? 'Speaking with you' : listening ? 'Listening…' : 'Hey, I’m Pallav.'}</strong><p>Ask about my projects, skills or experience.</p></div><button onClick={() => speak(greeting)} disabled={!supported} aria-label="Speak welcome message"><Volume2 size={14}/><span>HELLO</span></button></div>
    <div className="avatar-controls"><button onClick={listening ? stopListening : startListening} className={listening ? 'listening' : ''}><>{listening ? <MicOff size={14}/> : <Mic size={14}/>} {listening ? 'STOP LISTENING' : 'ASK ME'}</></button><button onClick={() => speak(greeting)}><Volume2 size={14}/> REPLAY INTRO</button></div>
    <div className="avatar-foot"><span>PROCEDURAL THREE.JS · NO GLB REQUIRED</span><span>{supported ? 'VOICE READY' : 'VOICE UNSUPPORTED'}</span></div>
  </aside>
}
