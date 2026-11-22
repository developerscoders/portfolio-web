import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Cpu, ExternalLink, Github, GraduationCap, Linkedin, Mail, MapPin, Pause, Play, Sparkles, Sun, Trophy, Volume2, VolumeX, Waves, Wind, Compass, Layers3 } from 'lucide-react'
import './slides.css'

type Chapter = { id: string; number: string; name: string; room: string; title: string; subtitle: string; file: string; tag: string }
const chapters: Chapter[] = [
  { id: 'arrival', number: '01', name: 'Arrival', room: 'THE ARRIVAL', title: 'Engineering with a sense of possibility.', subtitle: 'Welcome to my corner of the internet — a considered space for ideas, engineering and things worth building.', file: '/videos/01-residence-exterior.mp4', tag: 'WELCOME TO THE JOURNEY' },
  { id: 'story', number: '02', name: 'The Story', room: 'THE LOUNGE', title: 'Curiosity is where everything begins.', subtitle: 'I’m Pallav Burnwal — a full-stack developer and AI builder who enjoys turning complex ideas into useful, reliable products.', file: '/videos/02-living-room.mp4', tag: 'A LITTLE ABOUT ME' },
  { id: 'experience', number: '03', name: 'Experience', room: 'THE WORKSPACE', title: 'Built with intent. Shipped with care.', subtitle: 'From asynchronous services to real-time interview experiences, I work across the details that make products dependable.', file: '/videos/03-developer-studio.mp4', tag: 'WHERE IDEAS MEET EXECUTION' },
  { id: 'craft', number: '04', name: 'The Craft', room: 'THE LIBRARY', title: 'Strong foundations. Constant exploration.', subtitle: 'A practical toolkit across frontend, backend, databases, cloud infrastructure and applied AI — chosen to solve real problems.', file: '/videos/04-upper-floor.mp4', tag: 'TOOLS ARE ONLY THE BEGINNING' },
  { id: 'projects', number: '05', name: 'Selected Work', room: 'THE GALLERY', title: 'A few things brought to life.', subtitle: 'A collection of products and experiments spanning voice AI, developer tooling, recruiting workflows and more.', file: '/videos/05-project-gallery.mp4', tag: 'SELECTED BUILDS · 2024—26' },
  { id: 'contact', number: '06', name: 'The Next Chapter', room: 'THE TERRACE', title: 'The best work is still ahead.', subtitle: 'Have a thoughtful challenge, a product to shape or a team that values good engineering? Let’s make something meaningful.', file: '/videos/06-terrace-finale.mp4', tag: 'LET’S START A CONVERSATION' },
]
const projects = [
  { name: 'Uvilox AI', type: 'REAL-TIME VOICE & ACCESSIBILITY', description: 'A browser-first communication experience combining real-time voice, accessibility workflows and AI-powered interactions.', stack: ['React', 'FastAPI', 'LiveKit', 'Deepgram', 'MongoDB'], icon: Waves },
  { name: 'DevForge', type: 'MULTI-AGENT DEVELOPER TOOLING', description: 'A development workspace coordinating coding, review and testing agents with streamed execution feedback.', stack: ['FastAPI', 'Redis', 'Docker', 'React', 'NVIDIA NIM'], icon: Layers3 },
  { name: 'RecruitFlow AI', type: 'RECRUITER WORKFLOW SAAS', description: 'A focused workflow product that helps recruitment teams stay ahead of candidate follow-ups with AI-assisted drafting.', stack: ['React', 'TypeScript', 'MongoDB', 'n8n'], icon: Compass },
  { name: 'BillKaro', type: 'GST BILLING PLATFORM', description: 'A billing application with GST calculations, secure workflows, invoice generation and payment integration.', stack: ['Java', 'Spring Boot', 'MongoDB', 'Razorpay'], icon: Code2 },
  { name: 'Calmly AI', type: 'WELLNESS PRODUCT', description: 'A calm, voice-led digital experience exploring guided breathing, stress management and accessible interaction.', stack: ['React', 'TypeScript', 'Workers', 'Supabase'], icon: Wind },
  { name: 'Mediverse.AI', type: 'HEALTHCARE HACKATHON', description: 'A healthcare-focused AI project recognised with first place in the medical track at HackWithUttarPradesh.', stack: ['AI', 'Python', 'Automation'], icon: Sparkles },
]
const skillGroups = [
  { title: 'PRODUCT INTERFACES', icon: Code2, items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'React Native', 'UI engineering'] },
  { title: 'BACKEND SYSTEMS', icon: Layers3, items: ['Python', 'FastAPI', 'Node.js', 'Spring Boot', 'REST APIs', 'WebSockets'] },
  { title: 'DATA & INFRASTRUCTURE', icon: Cpu, items: ['MongoDB', 'MySQL', 'Redis', 'Docker', 'Azure', 'CI/CD'] },
  { title: 'AI & REAL-TIME', icon: Sparkles, items: ['LLM integrations', 'LiveKit', 'Deepgram', 'YOLOv8', 'NVIDIA NIM', 'Automation'] },
]
function pointerGlow(event: React.PointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - bounds.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - bounds.top}px`)
}
function Kicker({ children, number }: { children: string; number: string }) {
  return <div className="resort-kicker"><span>{number}</span><i />{children}</div>
}
function ChapterContent({ index, goTo }: { index: number; goTo: (n: number) => void }) {
  if (index === 0) return <div className="chapter-content arrival-content">
    <Kicker number="A DIGITAL GETAWAY">WELCOME · PALLAV BURNWAL</Kicker>
    <h1>Engineering<br/>with a sense of<br/><em>possibility.</em></h1>
    <p className="chapter-lead">A full-stack developer exploring the intersection of thoughtful interfaces, reliable systems and applied intelligence.</p>
    <div className="hero-cta-row"><button className="resort-primary" onClick={() => goTo(4)}>EXPLORE SELECTED WORK <ArrowUpRight size={16}/></button><button className="resort-quiet" onClick={() => goTo(1)}>GET TO KNOW ME <ArrowDown size={15}/></button></div>
    <div className="arrival-note"><span><MapPin size={13}/> ASANSOL, INDIA</span><span>OPEN TO FULL-TIME OPPORTUNITIES</span></div>
  </div>
  if (index === 1) return <div className="chapter-content story-content">
    <Kicker number="THE LOUNGE">A LITTLE ABOUT ME</Kicker><h2>Curious by nature.<br/><em>Engineer by craft.</em></h2>
    <p className="chapter-lead">I enjoy working at the point where a good idea becomes a product someone can actually use.</p>
    <p className="chapter-copy">My work spans backend services, modern web interfaces, real-time voice experiences and applied AI. I like understanding the whole system — from the first interaction and data model to deployment, reliability and the details that make an experience feel considered.</p>
    <p className="chapter-copy">At Hrfy.AI, I worked on recruitment and interview automation workflows, building asynchronous services and React experiences while improving resume extraction performance by 30%.</p>
    <div className="story-facts"><div><strong>30<span>%</span></strong><small>RESUME EXTRACTION IMPROVEMENT</small></div><div><strong>1k<span>+</span></strong><small>DAILY API REQUESTS HANDLED</small></div><div><strong>END<span>→</span>END</strong><small>PRODUCT ENGINEERING MINDSET</small></div></div>
  </div>
  if (index === 2) return <div className="chapter-content work-content">
    <Kicker number="THE WORKSPACE">EXPERIENCE · DELIVERY</Kicker><h2>Make it useful.<br/><em>Make it dependable.</em></h2>
    <div className="experience-list">
      <article className="glow-card" onPointerMove={pointerGlow}><div className="experience-top"><span><BriefcaseBusiness size={14}/> HRFY.AI · KHARAR</span><time>JAN 2026 — MAY 2026</time></div><h3>Full-Stack Developer</h3><p>Worked across an AI interview platform, asynchronous backend services and production-facing React experiences.</p><ul><li>Built FastAPI services backed by MongoDB and MySQL, supporting 1,000+ daily API requests.</li><li>Delivered real-time interview workflows using LiveKit and WebSockets.</li><li>Contributed to automated evaluation, report generation and candidate-facing chatbot workflows.</li></ul></article>
      <article className="glow-card" onPointerMove={pointerGlow}><div className="experience-top"><span><BriefcaseBusiness size={14}/> HRFY.AI · KHARAR</span><time>SEP 2025 — DEC 2025</time></div><h3>Software Developer Intern</h3><p>Built core recruitment automation features and refined the user experience across the platform.</p><ul><li>Improved resume extraction performance by 30% through backend optimisation.</li><li>Reduced page load time by 40% using lazy loading and reusable components.</li><li>Translated Figma designs into responsive React and TypeScript interfaces.</li></ul></article>
    </div><div className="micro-note"><span className="live-pulse"/> HANDS-ON PRODUCT DEVELOPMENT · FRONT TO BACK</div>
  </div>
  if (index === 3) return <div className="chapter-content craft-content">
    <Kicker number="THE LIBRARY">FOUNDATIONS · TOOLKIT</Kicker><h2>Good engineering<br/>is a <em>continuous practice.</em></h2>
    <div className="education-strip"><article><GraduationCap size={19}/><small>2026 — 2028</small><strong>MCA · AI & Machine Learning</strong><span>Vellore Institute of Technology</span></article><article><GraduationCap size={19}/><small>2023 — 2026</small><strong>BCA · Computer Applications</strong><span>Chandigarh University · CGPA 8.63/10</span></article></div>
    <div className="skill-grid">{skillGroups.map(group => { const Icon = group.icon; return <article className="glow-card skill-card" key={group.title} onPointerMove={pointerGlow}><Icon size={17}/><h3>{group.title}</h3><div>{group.items.map(item => <span key={item}>{item}</span>)}</div></article> })}</div>
    <div className="recognition-line"><Trophy size={15}/><span><b>1st Place</b> · HackWithUttarPradesh</span><span><b>5-Star</b> · HackerRank Python & Java</span><span><b>AZ-900</b> · Azure Fundamentals</span></div>
  </div>
  if (index === 4) return <div className="chapter-content gallery-content">
    <Kicker number="THE GALLERY">SELECTED BUILDS · CASE STUDIES</Kicker><h2>Ideas, shaped<br/>into <em>real products.</em></h2>
    <div className="project-grid">{projects.map((project, i) => { const Icon = project.icon; return <article className="project-card glow-card" key={project.name} onPointerMove={pointerGlow}><div className="project-card-top"><span>0{i + 1} / 06</span><Icon size={18}/></div><small>{project.type}</small><h3>{project.name}</h3><p>{project.description}</p><div className="project-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></article> })}</div>
  </div>
  return <div className="chapter-content finale-content">
    <Kicker number="THE TERRACE">THE NEXT CHAPTER</Kicker><h2>Let’s make<br/>something <em>matter.</em></h2>
    <p className="chapter-lead">I’m open to full-time developer opportunities and collaborations across full-stack engineering, AI and product development.</p>
    <a className="resort-primary contact-cta" href="mailto:pallavburnwal@gmail.com">START A CONVERSATION <ArrowUpRight size={16}/></a>
    <div className="finale-links"><a href="mailto:pallavburnwal@gmail.com"><Mail size={15}/> pallavburnwal@gmail.com</a><a href="https://github.com/developerscoders" target="_blank" rel="noreferrer"><Github size={15}/> GITHUB <ExternalLink size={11}/></a><a href="https://linkedin.com/in/pallavburnwal" target="_blank" rel="noreferrer"><Linkedin size={15}/> LINKEDIN <ExternalLink size={11}/></a></div>
    <div className="finale-signoff">THANK YOU FOR STAYING A WHILE <span>✳</span></div>
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
  const stageRef = useRef<HTMLElement>(null)
  const wheelLock = useRef(0)
  const touchStart = useRef<number | null>(null)
  const chapter = chapters[active]
  const goTo = useCallback((next: number) => {
    const bounded = Math.max(0, Math.min(chapters.length - 1, next))
    if (bounded === active) return
    setActive(bounded); setMenuOpen(false)
  }, [active])
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement)?.tagName)) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { event.preventDefault(); goTo(active + 1) }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); goTo(active - 1) }
      if (event.key === 'Home') goTo(0)
      if (event.key === 'End') goTo(chapters.length - 1)
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 28) return
      const now = Date.now()
      if (now - wheelLock.current < 760) return
      wheelLock.current = now
      goTo(active + (event.deltaY > 0 ? 1 : -1))
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('wheel', onWheel) }
  }, [active, goTo])
  useEffect(() => { if (stageRef.current) stageRef.current.scrollTop = 0 }, [active])
  useEffect(() => {
    const node = videoRef.current
    if (!node) return
    setVideoReady(false); setVideoFailed(false); node.pause(); node.src = chapter.file; node.load()
    if (playing) node.play().catch(() => setVideoFailed(true))
  }, [chapter.file, playing])
  useEffect(() => { if (videoRef.current) videoRef.current.muted = muted }, [muted])
  const togglePlay = () => {
    const node = videoRef.current
    if (!node) return
    if (node.paused) node.play().then(() => setPlaying(true)).catch(() => setVideoFailed(true))
    else { node.pause(); setPlaying(false) }
  }
  return <main className="portfolio-slides resort-portfolio" onTouchStart={e => { touchStart.current = e.touches[0]?.clientY ?? null }} onTouchEnd={e => { if (touchStart.current === null) return; const delta = touchStart.current - (e.changedTouches[0]?.clientY ?? touchStart.current); if (Math.abs(delta) > 55) goTo(active + (delta > 0 ? 1 : -1)); touchStart.current = null }}>
    <div className="slides-video-layer" aria-hidden="true"><video ref={videoRef} className={videoReady ? 'slides-video ready' : 'slides-video'} muted playsInline loop preload="none" onCanPlay={() => setVideoReady(true)} onPlaying={() => setVideoReady(true)} onError={() => { setVideoFailed(true); setVideoReady(false) }}/><div className="slides-video-fallback"/><div className="slides-video-shade"/></div>
    <div className="resort-grain" aria-hidden="true"/><div className="resort-light-orb" aria-hidden="true"/><div className="resort-vignette" aria-hidden="true"/>
    <header className="slides-header resort-header"><button className="slides-brand resort-brand" onClick={() => goTo(0)}><span>P.</span><b>PALLAV <i>BURNWAL</i></b></button><div className="slides-header-center"><i/> A PORTFOLIO IN SIX CHAPTERS <b>/</b> EST. 2026</div><div className="slides-header-actions"><button aria-label={muted ? 'Unmute video' : 'Mute video'} onClick={() => setMuted(v => !v)}>{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button><a href="https://github.com/developerscoders" aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={17}/></a><a href="https://linkedin.com/in/developerscoders" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={17}/></a><button className="slides-menu-toggle" onClick={() => setMenuOpen(v => !v)}>EXPLORE <span>☰</span></button></div></header>
    {menuOpen && <nav className="slides-menu resort-menu">{chapters.map((item, i) => <button key={item.id} className={i === active ? 'active' : ''} onClick={() => goTo(i)}><span>{item.number}</span>{item.name}<ArrowUpRight size={13}/></button>)}</nav>}
    <div className="resort-side-label"><span>SCROLL TO EXPLORE</span><i/></div>
    <section ref={stageRef} className="slides-stage resort-stage" aria-live="polite"><div key={chapter.id} className="slides-enter resort-enter"><div className="resort-room-label"><span>{chapter.room}</span><span>{chapter.number} / 06</span></div><ChapterContent index={active} goTo={goTo}/></div></section>
    <aside className="resort-chapter-rail"><span className="rail-title">THE JOURNEY</span>{chapters.map((item, i) => <button key={item.id} className={i === active ? 'active' : ''} onClick={() => goTo(i)} aria-label={`Open ${item.name}`}><span>{item.number}</span><i/><small>{item.name}</small></button>)}</aside>
    <footer className="slides-bottom resort-footer"><span><i/> {videoFailed ? 'CINEMATIC ASSET UNAVAILABLE' : videoReady ? 'SCENE IN MOTION' : 'PREPARING THE SCENE'} <b>·</b> {chapter.tag}</span><div className="slides-bottom-center"><button onClick={togglePlay}>{playing ? <Pause size={13}/> : <Play size={13}/>} {playing ? 'PAUSE FILM' : 'PLAY FILM'}</button><span>{chapter.number} / 06</span></div><span>© 2026 PALLAV BURNWAL</span></footer>
    <div className="slides-arrows resort-arrows"><button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous chapter"><ArrowLeft/></button><button onClick={() => goTo(active + 1)} disabled={active === chapters.length - 1} aria-label="Next chapter"><ArrowRight/></button></div>
    <div className="resort-corner-mark"><Sun size={13}/> DESIGNED TO EXPLORE</div>
  </main>
}
