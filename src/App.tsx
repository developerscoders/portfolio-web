import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import { ArrowUpRight, Camera, Compass, Expand, Github, Linkedin, Mouse, Volume2, VolumeX } from 'lucide-react'
import { Residence } from './scene/Residence'
import { Avatar } from './scene/Avatar'

type CameraMode = 'third' | 'first'

export default function App() {
  const [cameraMode, setCameraMode] = useState<CameraMode>('third')
  const [started, setStarted] = useState(false)
  const [sound, setSound] = useState(false)
  const [showControls, setShowControls] = useState(true)

  return (
    <main className="experience">
      <div className="scene-wrap">
        <Canvas shadows dpr={[1, 1.7]} camera={{ position: [9, 6, 12], fov: 42 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
          <color attach="background" args={['#050914']} />
          <fog attach="fog" args={['#07101f', 24, 65]} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 14, 5]} intensity={2.1} castShadow shadow-mapSize={[2048, 2048]} />
          <pointLight position={[0, 5, 0]} color="#1d8fff" intensity={18} distance={22} />
          <Environment preset="night" />
          <Stars radius={90} depth={45} count={1300} factor={2.2} saturation={0.15} fade speed={0.4} />
          <Residence />
          <Avatar cameraMode={cameraMode} started={started} />
        </Canvas>
      </div>

      <header className="topbar">
        <a className="brand" href="#home" aria-label="Pallav home">
          <span className="brand-mark">P.</span>
          <span className="brand-name">PALLAV<span className="brand-dot">.</span></span>
        </a>
        <div className="top-center"><span className="live-dot" /> INTERACTIVE PORTFOLIO <span className="top-divider">/</span> 3D RESIDENCE</div>
        <div className="top-actions">
          <button className="icon-button" onClick={() => setSound(!sound)} aria-label="Toggle sound">{sound ? <Volume2 size={17}/> : <VolumeX size={17}/>}</button>
          <a className="social-link" href="https://github.com/developerscoders" target="_blank" rel="noreferrer"><Github size={16}/></a>
          <a className="social-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={16}/></a>
        </div>
      </header>

      <section className="hero-copy" id="home">
        <div className="eyebrow"><span className="eyebrow-line"/> SOFTWARE ENGINEER · AI BUILDER</div>
        <h1>Ideas become<br/><span>experiences.</span></h1>
        <p className="hero-description">Welcome to my digital residence. Explore the space, discover what I build, and get to know the developer behind the screen.</p>
        <div className="hero-ctas">
          <button className="primary-button" onClick={() => { setStarted(true); setShowControls(true) }}>
            {started ? 'EXPLORATION ACTIVE' : 'ENTER THE RESIDENCE'} <ArrowUpRight size={17}/>
          </button>
          <button className="text-button" onClick={() => setCameraMode(cameraMode === 'third' ? 'first' : 'third')}><Camera size={16}/> {cameraMode === 'third' ? 'THIRD PERSON' : 'FIRST PERSON'}</button>
        </div>
      </section>

      <div className="scene-label"><span className="scene-label-index">01</span><span>THE RESIDENCE</span><span className="scene-label-rule"/></div>

      <aside className="right-rail">
        <div className="rail-caption">SELECT VIEW</div>
        <button className={cameraMode === 'third' ? 'view-button active' : 'view-button'} onClick={() => setCameraMode('third')}><span>03</span> THIRD</button>
        <button className={cameraMode === 'first' ? 'view-button active' : 'view-button'} onClick={() => setCameraMode('first')}><span>01</span> FIRST</button>
        <div className="rail-line"/>
        <button className="rail-icon" onClick={() => setShowControls(!showControls)} aria-label="Toggle controls"><Compass size={17}/></button>
        <button className="rail-icon" onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Fullscreen"><Expand size={16}/></button>
      </aside>

      {showControls && <div className="controls-card">
        <div className="controls-title"><Mouse size={14}/> MOVEMENT GUIDE <button onClick={() => setShowControls(false)}>×</button></div>
        <div className="key-row"><span className="key">W</span><span className="key">A</span><span className="key">S</span><span className="key">D</span><small>MOVE</small></div>
        <div className="control-foot"><span>DRAG TO LOOK</span><span>SHIFT · RUN</span></div>
      </div>}

      <footer className="bottom-bar">
        <div className="coordinates"><span className="coordinate-dot"/> <span>ENVIRONMENT ONLINE</span><span className="bottom-separator">·</span><span>BUILD 001</span></div>
        <div className="scroll-hint">SCROLL TO EXPLORE <span>↓</span></div>
        <div className="copyright">© 2026 PALLAV BURNWAL</div>
      </footer>
    </main>
  )
}