import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Cpu, ExternalLink, Github, GraduationCap, Linkedin, Mail, MapPin, Pause, Play, Trophy, Volume2, VolumeX } from 'lucide-react'
import './slides.css'

const AvatarCompanion = lazy(() => import('./avatar/AvatarCompanion'))

type Slide = { id: string; number: string; title: string; label: string; file: string }
const slides: Slide[] = [
  { id: 'home', number: '01', title: 'The Residence', label: 'INTRODUCTION', file: '/videos/01-residence-exterior.mp4' },
  { id: 'about', number: '02', title: 'About Pallav', label: 'THE PERSON', file: '/videos/02-living-room.mp4' },
  { id: 'experience', number: '03', title: 'Experience', label: 'THE WORK', file: '/videos/03-developer-studio.mp4' },
  { id: 'education', number: '04', title: 'Education & Skills', label: 'THE FOUNDATION', file: '/videos/04-upper-floor.mp4' },
  { id: 'projects', number: '05', title: 'Selected Projects', label: 'WHAT I BUILD', file: '/videos/05-project-gallery.mp4' },
  { id: 'contact', number: '06', title: 'Let’s Build Something', label: 'THE NEXT CHAPTER', file: '/videos/06-terrace-finale.mp4' },
]

const projects = [
  { name: 'Uvilox AI', type: 'REAL-TIME VOICE AI', description: 'A real-time voice AI calling and accessibility platform using speech services, LiveKit, Twilio and asynchronous FastAPI services. Built around responsive conversations, sign-language experiences and MongoDB-backed context.', stack: ['Python', 'FastAPI', 'LiveKit', 'Deepgram', 'Twilio', 'MongoDB'] },
  { name: 'DevForge', type: 'MULTI-AGENT AI DEVELOPMENT', description: 'A multi-agent development platform coordinating coder, reviewer and testing agents through Redis and Docker, with streamed results in a React interface.', stack: ['FastAPI', 'Redis', 'Docker', 'React', 'NVIDIA NIM'] },
  { name: 'BillKaro', type: 'GST BILLING PLATFORM', description: 'A GST billing application with JWT-secured workflows, automated GST calculations, Razorpay payments, PDF invoices and WhatsApp invoice sharing.', stack: ['Java', 'Spring Boot', 'MongoDB', 'JWT', 'React Native', 'Razorpay'] },
  { name: 'RecruitFlow AI', type: 'RECRUITER WORKFLOW SAAS', description: 'A recruiter-focused platform for candidate tracking and timely follow-ups, with organization-scoped workflows, AI-assisted drafting and email automation.', stack: ['React', 'TypeScript', 'Tailwind', 'MongoDB', 'n8n'] },
  { name: 'Calmly AI', type: 'WELLNESS PRODUCT', description: 'A calming digital experience focused on guided stress management, breathing and accessible voice-led support.', stack: ['React', 'TypeScript', 'Workers', 'Supabase'] },
  { name: 'Mediverse.AI', type: 'HEALTHCARE HACKATHON', description: 'A healthcare-focused AI project developed for HackWithUttarPradesh, where the team placed first in the medical track.', stack: ['AI', 'Python', 'Automation'] },
  { name: 'TrustFlow AI', type: 'AI PRODUCT PROJECT', description: 'An AI product concept from my project portfolio. A detailed case study and verified feature breakdown will be added when the project documentation is published.', stack: ['AI', 'Product Engineering'] },
]

function Kicker({ number, children }: { number: string; children: string }) {
  return <div className="slide-kicker"><span>{number}</span><i />{children}</div>
}

function SlideContent({ index, onNavigate, onSpeak }: { index: number; onNavigate: (next: number) => void; onSpeak: (text: string) => void }) {
  if (index === 0) return <div className="slide-copy home-copy">
    <Kicker number="SOFTWARE ENGINEER">AI BUILDER · FULL-STACK DEVELOPER</Kicker>
    <h1>Ideas become<br /><em>experiences.</em></h1>
    <p className="slide-lead">I’m Pallav Burnwal — a developer building thoughtful products across AI, real-time systems and the web.</p>
    <div className="slide-actions"><button className="slide-primary" onClick={() => onNavigate(4)}>EXPLORE MY WORK <ArrowUpRight size={17}/></button><a href="mailto:pallavburnwal@gmail.com" className="slide-secondary"><Mail size={16}/> GET IN TOUCH</a></div>
    <div className="slide-meta"><span><MapPin size={13}/> ASANSOL, INDIA</span><span>OPEN TO FULL-TIME · REMOTE / RELOCATION</span></div>
  </div>

  if (index === 1) return <div className="slide-copy content-slide">
    <Kicker number="02">THE PERSON BEHIND THE SCREEN</Kicker>
    <h2>Building at the intersection of <em>software & intelligence.</em></h2>
    <p className="slide-body">I’m a full-stack developer focused on turning complex ideas into useful, reliable products. My work spans backend systems, modern web interfaces, real-time voice experiences and applied AI/ML.</p>
    <p className="slide-body">At Hrfy.AI, I worked across an AI interview platform — building asynchronous services, shipping React experiences and improving the reliability and speed of production workflows. Outside that role, I build end-to-end products and experiment with multi-agent systems and voice AI.</p>
    <div className="slide-stats"><div><strong>30<span>%</span></strong><small>RESUME EXTRACTION IMPROVEMENT</small></div><div><strong>1k<span>+</span></strong><small>DAILY API REQUESTS</small></div><div><strong>AI<span>+</span></strong><small>PRODUCT-FOCUSED ENGINEERING</small></div></div>
    <button className="slide-text-action" onClick={() => onSpeak("I’m Pallav Burnwal, a full-stack developer and AI builder. I enjoy taking ideas from the first sketch to reliable products, with a focus on useful experiences and thoughtful engineering.")}> <Volume2 size={15}/> HEAR ABOUT ME</button>
  </div>

  if (index === 2) return <div className="slide-copy content-slide wide-slide">
    <Kicker number="03">PROFESSIONAL EXPERIENCE</Kicker>
    <h2>Shipping software that <em>makes a difference.</em></h2>
    <div className="slide-timeline">
      <article><div className="slide-card-meta"><span><BriefcaseBusiness size={14}/> HRFY.AI · KHARAR</span><time>JAN 2026 — MAY 2026</time></div><h3>Full-Stack Developer</h3><ul><li>Built asynchronous FastAPI + MongoDB/MySQL APIs serving 1,000+ daily requests.</li><li>Delivered LiveKit and WebSocket interview sessions with automated evaluation and report generation.</li><li>Worked on YOLOv8-based proctoring and candidate chatbot workflows.</li><li>Added automated tests for critical backend modules.</li></ul></article>
      <article><div className="slide-card-meta"><span><BriefcaseBusiness size={14}/> HRFY.AI · KHARAR</span><time>SEP 2025 — DEC 2025</time></div><h3>Software Developer Intern</h3><ul><li>Built FastAPI + MongoDB resume-parsing services and improved extraction time by 30%.</li><li>Reduced page load time by 40% using lazy loading and reusable components.</li><li>Built React + TypeScript interfaces from Figma designs.</li></ul></article>
    </div>
  </div>

  if (index === 3) return <div className="slide-copy content-slide wide-slide">
    <Kicker number="04">THE FOUNDATION</Kicker>
    <h2>Curiosity, backed by <em>craft.</em></h2>
    <div className="slide-education"><article><GraduationCap/><small>2026 — 2028</small><h3>Master of Computer Applications</h3><p>Artificial Intelligence & Machine Learning</p><b>Vellore Institute of Technology</b></article><article><GraduationCap/><small>2023 — 2026</small><h3>Bachelor of Computer Applications</h3><p>Computer Applications · CGPA 8.63/10</p><b>Chandigarh University</b></article></div>
    <div className="slide-skills"><div><Code2/><b>LANGUAGES</b><p>Python · TypeScript · Java · SQL</p></div><div><Cpu/><b>ENGINEERING</b><p>FastAPI · Spring Boot · Node.js · React · React Native · REST · WebSockets</p></div><div><Code2/><b>AI / DATA / DEVOPS</b><p>YOLOv8 · LiveKit · Deepgram · OpenAI · NVIDIA NIM · MongoDB · MySQL · Redis · Docker</p></div></div>
    <div className="slide-awards"><Trophy size={16}/><span><b>1st Place</b> — HackWithUttarPradesh</span><span><b>5-Star HackerRank</b> — Python & Java</span><span><b>Microsoft Azure Fundamentals</b> — AZ-900</span></div>
  </div>

  if (index === 4) return <div className="slide-copy content-slide wide-slide projects-slide">
    <Kicker number="05">SELECTED BUILDS</Kicker>
    <h2>From an idea to <em>something real.</em></h2>
    <div className="slide-project-grid">{projects.map((project, i) => <article key={project.name}><div className="slide-project-meta">0{i + 1} <span>{project.type}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="slide-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>
  </div>

  return <div className="slide-copy content-slide contact-copy">
    <Kicker number="06">THE NEXT CHAPTER</Kicker>
    <h2>Have a good problem?<br/><em>Let’s build the solution.</em></h2>
    <p className="slide-lead">I’m available for full-time opportunities and collaborations across full-stack engineering, AI and product development.</p>
    <a className="slide-primary contact-button" href="mailto:pallavburnwal@gmail.com">START A CONVERSATION <ArrowUpRight size={17}/></a>
    <div className="slide-contact-links"><a href="mailto:pallavburnwal@gmail.com">pallavburnwal@gmail.com</a><a href="https://github.com/developerscoders" target="_blank" rel="noreferrer"><Github size={15}/> GITHUB</a><a href="https://linkedin.com/in/pallavburnwal" target="_blank" rel="noreferrer"><Linkedin size={15}/> LINKEDIN</a></div>
  </div>
}

export default function PortfolioSlides() {
  const [active, setActive] = useState(0)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const touchStart = useRef<number | null>(null)
  const lock = useRef(false)
  const activeSlide = slides[active]

  const goTo = useCallback((next: number) => {
    const bounded = Math.max(0, Math.min(slides.length - 1, next))
    if (bounded === active) return
    setActive(bounded)
    setMenuOpen(false)
  }, [active])

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const voices = window.speechSynthesis.getVoices()
    const english = voices.filter(v => v.lang.toLowerCase().startsWith('en'))
    utterance.voice = english.find(v => /en-in/i.test(v.lang) && /ravi|prabhat|male/i.test(v.name)) || english.find(v => /david|mark|guy|ryan|daniel|james|george|thomas|oliver|alex/i.test(v.name)) || english.find(v => /en-in/i.test(v.lang)) || english[0] || null
    utterance.lang = utterance.voice?.lang || 'en-IN'
    utterance.rate = 0.94
    utterance.pitch = 0.88
    window.speechSynthesis.speak(utterance)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement)?.tagName)) return
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') { event.preventDefault(); goTo(active + 1) }
      if (event.key === 'ArrowUp' || event.key === 'PageUp') { event.preventDefault(); goTo(active - 1) }
      if (event.key === 'Home') goTo(0)
      if (event.key === 'End') goTo(slides.length - 1)
      if (event.key === 'Escape') setMenuOpen(false)
    }
    let wheelTime = 0
    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null
      const nested = target?.closest('.slide-project-grid, .slides-stage') as HTMLElement | null
      if (nested && ((event.deltaY < 0 && nested.scrollTop > 0) || (event.deltaY > 0 && nested.scrollTop + nested.clientHeight < nested.scrollHeight - 1))) return
      if (Math.abs(event.deltaY) < 24) return
      const now = Date.now()
      if (now - wheelTime < 850) return
      wheelTime = now
      goTo(active + (event.deltaY > 0 ? 1 : -1))
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('wheel', onWheel) }
  }, [active, goTo])

  useEffect(() => {
    const node = videoRef.current
    if (!node) return
    setVideoReady(false); setVideoFailed(false)
    node.pause(); node.src = activeSlide.file; node.load()
    if (playing) node.play().catch(() => setVideoFailed(true))
  }, [activeSlide.file, playing])

  useEffect(() => {
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel() }
  }, [])

  const togglePlay = () => {
    const node = videoRef.current
    if (!node) return
    if (node.paused) { node.play().then(() => setPlaying(true)).catch(() => setVideoFailed(true)) }
    else { node.pause(); setPlaying(false) }
  }

  return <main className="portfolio-slides" onTouchStart={e => { touchStart.current = e.target instanceof Element && e.target.closest('.slide-project-grid') ? null : (e.touches[0]?.clientY ?? null) }} onTouchEnd={e => { if (touchStart.current === null) return; const delta = touchStart.current - (e.changedTouches[0]?.clientY ?? touchStart.current); if (Math.abs(delta) > 55) goTo(active + (delta > 0 ? 1 : -1)); touchStart.current = null }}>
    <div className="slides-video-layer" aria-hidden="true"><video ref={videoRef} className={videoReady ? 'slides-video ready' : 'slides-video'} muted={muted} playsInline loop preload="none" onCanPlay={() => setVideoReady(true)} onPlaying={() => setVideoReady(true)} onError={() => { setVideoFailed(true); setVideoReady(false) }}/><div className="slides-video-fallback"/><div className="slides-video-shade"/></div>
    <header className="slides-header"><button className="slides-brand" onClick={() => goTo(0)}><span>P.</span> PALLAV.</button><div className="slides-header-center"><i/> INTERACTIVE PORTFOLIO <b>/</b> 3D RESIDENCE</div><div className="slides-header-actions"><button aria-label={muted ? 'Unmute video' : 'Mute video'} onClick={() => setMuted(v => !v)}>{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button><a href="https://github.com/developerscoders" aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={17}/></a><a href="https://linkedin.com/in/pallavburnwal" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={17}/></a><button className="slides-menu-toggle" onClick={() => setMenuOpen(v => !v)}>CHAPTERS</button></div></header>
    {menuOpen && <nav className="slides-menu">{slides.map((s, i) => <button key={s.id} className={i === active ? 'active' : ''} onClick={() => goTo(i)}><span>{s.number}</span>{s.title}</button>)}</nav>}
    <div className="slides-chapter-label"><span>{activeSlide.number}</span><i/>{activeSlide.label}</div>
    <section className="slides-stage" aria-live="polite"><div key={activeSlide.id} className="slides-enter"><SlideContent index={active} onNavigate={goTo} onSpeak={speak}/></div></section>
    {(active === 0 || active === 1) && <Suspense fallback={<div className="avatar-loading">LOADING AVATAR…</div>}>
      <AvatarCompanion mode={active === 0 ? 'hero' : 'resident'}/>
    </Suspense>}
    <aside className="slides-side-controls"><span>CHOOSE A CHAPTER</span>{slides.map((s, i) => <button key={s.id} className={i === active ? 'active' : ''} onClick={() => goTo(i)} aria-label={'Go to '+s.title}><b>{s.number}</b><i/></button>)}</aside>
    <div className="slides-bottom"><span><i/> ENVIRONMENT {videoFailed ? 'ASSET MISSING' : videoReady ? 'ONLINE' : 'LOADING'} · BUILD 005</span><div className="slides-bottom-center"><button onClick={togglePlay}>{playing ? <Pause size={13}/> : <Play size={13}/>} {playing ? 'PAUSE FILM' : 'PLAY FILM'}</button><span>{activeSlide.number} / 06</span></div><span>© 2026 PALLAV BURNWAL</span></div>
    <div className="slides-arrows"><button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous slide"><ArrowLeft/></button><button onClick={() => goTo(active + 1)} disabled={active === slides.length - 1} aria-label="Next slide"><ArrowRight/></button></div>
  </main>
}
