import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin, ExternalLink, Code2, Cpu, GraduationCap, Trophy, BriefcaseBusiness } from 'lucide-react'
import './portfolio.css'

type Scene = { id: string; number: string; title: string; file: string; label: string }
const scenes: Scene[] = [
  { id: 'home', number: '01', title: 'The Residence', file: '/videos/01-residence-exterior.mp4', label: 'EXTERIOR' },
  { id: 'about', number: '02', title: 'About Pallav', file: '/videos/02-living-room.mp4', label: 'THE PERSON' },
  { id: 'experience', number: '03', title: 'Professional Experience', file: '/videos/03-developer-studio.mp4', label: 'THE WORK' },
  { id: 'education', number: '04', title: 'Education & Skills', file: '/videos/04-upper-floor.mp4', label: 'THE FOUNDATION' },
  { id: 'projects', number: '05', title: 'Selected Projects', file: '/videos/05-project-gallery.mp4', label: 'WHAT I BUILD' },
  { id: 'contact', number: '06', title: 'Let’s Build Something', file: '/videos/06-terrace-finale.mp4', label: 'THE NEXT CHAPTER' },
]

const projects = [
  { name: 'Uvilox AI', type: 'REAL-TIME VOICE AI', description: 'A real-time voice AI calling system using Deepgram speech services, Twilio and asynchronous FastAPI WebSockets. Built for responsive conversations under 800 ms, with MongoDB-backed multi-turn context and transcripts.', stack: ['Python', 'FastAPI', 'Deepgram', 'Twilio', 'WebSockets', 'MongoDB'] },
  { name: 'DevForge', type: 'MULTI-AGENT AI DEVELOPMENT', description: 'A multi-agent development platform coordinating coder, reviewer and testing agents through Redis Pub/Sub and Docker, with streamed results in a React interface. Reduced concurrent task latency by 35%.', stack: ['FastAPI', 'Redis', 'Docker', 'React', 'NVIDIA NIM'] },
  { name: 'BillKaro', type: 'GST BILLING PLATFORM', description: 'A GST billing application with JWT-secured workflows, automated GST calculations, Razorpay payments, PDF invoices and WhatsApp invoice sharing through an Expo app.', stack: ['Java 17', 'Spring Boot', 'MongoDB', 'JWT', 'React Native', 'Razorpay'] },
  { name: 'RecruitFlow AI', type: 'RECRUITER WORKFLOW SAAS', description: 'A recruiter-focused platform for candidate tracking and timely follow-ups, with organization-scoped workflows, AI-assisted follow-up drafting and email automation integrations.', stack: ['React', 'TypeScript', 'Tailwind CSS', 'Express', 'MongoDB Atlas', 'n8n'] },
]

const additionalProjects = ['Calmly AI · Stress-management project', 'Mediverse.AI · Medical-track hackathon project', 'TrustFlow AI · AI product project']

function SectionKicker({ number, label }: { number: string; label: string }) {
  return <div className="pf-kicker"><span>{number}</span><i />{label}</div>
}

function AvatarWelcome() {
  const [look, setLook] = useState({ x: 0, y: 0 })
  const [speaking, setSpeaking] = useState(false)
  const [speechAvailable, setSpeechAvailable] = useState(false)
  const welcome = "Hey, I'm Pallav. Welcome to my digital residence! I'm a full-stack developer and AI builder. Feel free to explore my work, projects and experience. Let's build something amazing together."

  const getMaleEnglishVoice = () => {
    const voices = window.speechSynthesis.getVoices()
    const english = voices.filter(voice => voice.lang.toLowerCase().startsWith('en'))
    const indianMale = english.find(voice =>
      voice.lang.toLowerCase().startsWith('en-in') &&
      /\b(ravi|prabhat|male)\b/i.test(voice.name)
    )
    const labelledMale = english.find(voice =>
      /\b(male|david|mark|guy|ryan|daniel|james|george|thomas|oliver|aaron|alex|ravi|prabhat)\b/i.test(voice.name)
    )
    return indianMale || labelledMale || english.find(voice => voice.lang.toLowerCase().startsWith('en-in')) || english[0]
  }

  const speak = () => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const message = new SpeechSynthesisUtterance(welcome)
    const voice = getMaleEnglishVoice()
    message.lang = voice?.lang || 'en-IN'
    message.rate = 0.94
    message.pitch = 0.88
    if (voice) message.voice = voice
    message.onstart = () => setSpeaking(true)
    message.onend = () => setSpeaking(false)
    message.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(message)
  }

  useEffect(() => {
    const supported = 'speechSynthesis' in window
    setSpeechAvailable(supported)
    if (!supported) return
    const timer = window.setTimeout(speak, 1500)
    return () => {
      window.clearTimeout(timer)
      window.speechSynthesis.cancel()
    }
  }, [])

  useEffect(() => {
    let frame = 0
    const trackCursor = (event: PointerEvent) => {
      if (frame) window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const x = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2
        const y = (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2
        setLook({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) })
      })
    }
    const reset = () => setLook({ x: 0, y: 0 })
    window.addEventListener('pointermove', trackCursor, { passive: true })
    window.addEventListener('blur', reset)
    return () => {
      window.removeEventListener('pointermove', trackCursor)
      window.removeEventListener('blur', reset)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return <aside className="pf-avatar-welcome" aria-label="Pallav's welcome avatar">
    <div className="pf-avatar-card">
      <div className="pf-avatar-image-wrap">
        <img
          src="/pallav-avatar.jpg"
          alt="Pallav wearing a black sweatshirt with a bronze N emblem"
          className="pf-avatar-image"
          style={{ transform: `perspective(900px) rotateY(${look.x * 3.5}deg) rotateX(${-look.y * 2.5}deg) scale(1.07) translate(${look.x * 3}px, ${look.y * 2}px)` }}
        />
        <span className="pf-avatar-live"><i /> HERE WITH YOU</span>
      </div>
      <div className="pf-avatar-message">
        <span className="pf-avatar-label">A QUICK HELLO FROM PALLAV</span>
        <p>Hey, welcome in. Take a look around — this is where I build, experiment and bring ideas to life.</p>
        <button type="button" onClick={speak} disabled={!speechAvailable} className={speaking ? 'pf-avatar-speak is-speaking' : 'pf-avatar-speak'}>
          <span>{speaking ? 'SPEAKING…' : '▶  HEAR MY WELCOME'}</span><i />
        </button>
      </div>
    </div>
  </aside>
}

export default function PortfolioExperience() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(0)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeScene = scenes[active]

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'))
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      const index = scenes.findIndex(scene => scene.id === visible.target.getAttribute('data-scene'))
      if (index >= 0) setActive(index)
    }, { threshold: [0.35, 0.55, 0.72] })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const node = videoRef.current
    if (!node) return
    setVideoReady(false)
    setVideoFailed(false)
    node.pause()
    node.src = activeScene.file
    node.load()
    const playPromise = node.play()
    if (playPromise) playPromise.catch(() => setVideoFailed(true))
  }, [activeScene.file])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <main className="portfolio-experience">
      <div className="pf-film" aria-hidden="true">
        <video ref={videoRef} className={videoReady ? 'pf-film-video is-ready' : 'pf-film-video'} muted playsInline loop preload="none" autoPlay
          onCanPlay={() => setVideoReady(true)} onPlaying={() => setVideoReady(true)}
          onError={() => { setVideoFailed(true); setVideoReady(false) }} />
        <div className="pf-film-fallback" />
        <div className="pf-film-shade" />
        <div className={videoFailed ? 'pf-film-status visible' : 'pf-film-status'}>CINEMATIC BACKDROP · {activeScene.number}</div>
      </div>

      <header className="pf-header">
        <a href="#home" className="pf-brand" onClick={e => { e.preventDefault(); scrollTo('home') }}>
          <span className="pf-brand-mark">P.</span><span>PALLAV<span className="pf-blue">.</span></span>
        </a>
        <div className="pf-header-center"><span className="pf-live" /> FULL-STACK DEVELOPER <i>/</i> AI BUILDER</div>
        <button className="pf-menu-toggle" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation">{menuOpen ? 'CLOSE' : 'MENU'}</button>
        <nav className={menuOpen ? 'pf-nav is-open' : 'pf-nav'} aria-label="Main navigation">
          <button onClick={() => scrollTo('about')}>ABOUT</button>
          <button onClick={() => scrollTo('experience')}>EXPERIENCE</button>
          <button onClick={() => scrollTo('projects')}>PROJECTS</button>
          <button onClick={() => scrollTo('contact')}>CONTACT</button>
        </nav>
        <div className="pf-socials">
          <a href="https://github.com/developerscoders" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
          <a href="https://linkedin.com/in/pallavburnwal" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
        </div>
      </header>

      <div className="pf-scene-indicator"><span>{activeScene.number}</span><i />{activeScene.label}</div>

      <section id="home" data-scene="home" className="pf-section pf-hero">
        <AvatarWelcome />
        <div className="pf-content pf-hero-content">
          <SectionKicker number="01" label="SOFTWARE ENGINEER · AI BUILDER" />
          <h1>Ideas become<br /><em>experiences.</em></h1>
          <p className="pf-lead">I’m Pallav Burnwal — a full-stack developer building thoughtful products across AI, real-time systems and the web.</p>
          <div className="pf-hero-actions">
            <button className="pf-primary" onClick={() => scrollTo('projects')}>EXPLORE MY WORK <ArrowUpRight size={17} /></button>
            <a className="pf-secondary" href="mailto:pallavburnwal@gmail.com"><Mail size={16} /> GET IN TOUCH</a>
          </div>
          <div className="pf-hero-meta"><span><MapPin size={13} /> ASANSOL, INDIA</span><span>OPEN TO FULL-TIME · REMOTE / RELOCATION</span></div>
        </div>
        <button className="pf-scroll-cue" onClick={() => scrollTo('about')}><span>SCROLL TO DISCOVER</span><ArrowDown size={15} /></button>
      </section>

      <section id="about" data-scene="about" className="pf-section">
        <div className="pf-content pf-narrow">
          <SectionKicker number="02" label="THE PERSON BEHIND THE SCREEN" />
          <h2>Building at the intersection of <em>software & intelligence.</em></h2>
          <p className="pf-body">I’m a full-stack developer focused on turning complex ideas into useful, reliable products. My work spans backend systems, modern web interfaces, real-time voice experiences and applied AI/ML.</p>
          <p className="pf-body">At Hrfy.AI, I worked across an AI interview platform — building asynchronous services, shipping React experiences and improving the reliability and speed of production workflows. Outside that role, I build end-to-end products and experiment with multi-agent systems and voice AI.</p>
          <div className="pf-stat-grid">
            <div><strong>9<span>+</span></strong><small>MONTHS AT HRFY.AI</small></div>
            <div><strong>1000<span>+</span></strong><small>DAILY API REQUESTS</small></div>
            <div><strong>800<span>ms</span></strong><small>VOICE AI RESPONSE TARGET</small></div>
          </div>
        </div>
      </section>

      <section id="experience" data-scene="experience" className="pf-section">
        <div className="pf-content pf-wide">
          <SectionKicker number="03" label="PROFESSIONAL EXPERIENCE" />
          <h2>Shipping software that <em>makes a difference.</em></h2>
          <div className="pf-timeline">
            <article className="pf-timeline-card">
              <div className="pf-card-top"><span><BriefcaseBusiness size={15} /> HRFY.AI · KHARAR</span><time>JAN 2026 — MAY 2026</time></div>
              <h3>Full-Stack Developer</h3>
              <ul>
                <li>Built asynchronous FastAPI + MongoDB/MySQL APIs serving 1,000+ daily requests with sub-second streaming inference.</li>
                <li>Delivered LiveKit and WebSocket audio/video interview sessions with automated evaluation and report generation.</li>
                <li>Trained and deployed a YOLOv8 cheat-detection model, reducing proctoring false positives by 22%.</li>
                <li>Prompt-tuned VedaGPT candidate chatbot and wrote PyTest coverage for critical modules reaching 90%.</li>
              </ul>
            </article>
            <article className="pf-timeline-card">
              <div className="pf-card-top"><span><BriefcaseBusiness size={15} /> HRFY.AI · KHARAR</span><time>SEP 2025 — DEC 2025</time></div>
              <h3>Software Developer Intern</h3>
              <ul>
                <li>Built FastAPI + MongoDB resume-parsing services and reduced extraction time by 30% through query and async optimization.</li>
                <li>Reduced page load time by 40% using lazy loading and reusable components.</li>
                <li>Built React + TypeScript interfaces from Figma designs.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="education" data-scene="education" className="pf-section">
        <div className="pf-content pf-wide">
          <SectionKicker number="04" label="THE FOUNDATION" />
          <h2>Curiosity, backed by <em>craft.</em></h2>
          <div className="pf-education-grid">
            <article className="pf-info-card"><GraduationCap /><small> AUG 2026 — AUG 2028 · DISTANCE EDUCATION</small><h3>Master of Computer Applications</h3><p>Artificial Intelligence & Machine Learning</p><strong>Vellore Institute of Technology</strong></article>
            <article className="pf-info-card"><GraduationCap /><small>AUG 2023 — JUL 2026</small><h3>Bachelor of Computer Applications</h3><p>Computer Applications</p><strong>Chandigarh University</strong></article>
          </div>
          <div className="pf-skills">
            <div><Code2 /><strong>LANGUAGES</strong><p>Python · TypeScript · Java · SQL</p></div>
            <div><Cpu /><strong>ENGINEERING</strong><p>FastAPI · Spring Boot · Node.js · React · Next.js · React Native · REST · WebSockets</p></div>
            <div><Code2 /><strong>AI / DATA / DEVOPS</strong><p>YOLOv8 · LiveKit · Deepgram · OpenAI · NVIDIA NIM · OpenRouter · MongoDB · MySQL · Redis · Docker · PyTest</p></div>
          </div>
          <div className="pf-achievements"><Trophy /><span><b>1st Place</b> — HackWithUttarPradesh (200+ teams, team lead)</span><span><b>5-Star HackerRank</b> — Python & Java</span><span><b>Microsoft Azure Fundamentals</b> — AZ-900</span><span><b>Google Developers Group</b> — Student member since 2024</span></div>
        </div>
      </section>

      <section id="projects" data-scene="projects" className="pf-section pf-projects-section">
        <div className="pf-content pf-wide">
          <SectionKicker number="05" label="SELECTED BUILDS" />
          <h2>From an idea to <em>something real.</em></h2>
          <div className="pf-project-grid">
            {projects.map((project, index) => <article className="pf-project-card" key={project.name}>
              <div className="pf-project-index">0{index + 1} <span>{project.type}</span></div>
              <h3>{project.name}</h3><p>{project.description}</p>
              <div className="pf-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
              <a href="https://github.com/developerscoders" target="_blank" rel="noreferrer">VIEW GITHUB PROFILE <ExternalLink size={13} /></a>
            </article>)}
          </div>
          <div className="pf-more-projects"><span>ALSO BUILDING</span>{additionalProjects.map(name => <b key={name}>{name}</b>)}</div>
          <p className="pf-project-note">Project details above are drawn from my resume. Additional builds are listed by name; more case studies and live demos will be added as they are prepared.</p>
        </div>
      </section>

      <section id="contact" data-scene="contact" className="pf-section pf-contact-section">
        <div className="pf-content pf-contact-content">
          <SectionKicker number="06" label="THE NEXT CHAPTER" />
          <h2>Have a good problem?<br /><em>Let’s build the solution.</em></h2>
          <p className="pf-lead">I’m available for full-time opportunities and collaborations across full-stack engineering, AI and product development.</p>
          <a className="pf-primary pf-contact-link" href="mailto:pallavburnwal@gmail.com">START A CONVERSATION <ArrowUpRight size={17} /></a>
          <div className="pf-contact-details"><a href="mailto:pallavburnwal@gmail.com">pallavburnwal@gmail.com</a><a href="tel:+917340981451">+91 73409 81451</a><span>ASANSOL, WEST BENGAL, INDIA</span></div>
          <div className="pf-contact-socials"><a href="https://github.com/developerscoders" target="_blank" rel="noreferrer"><Github size={17} /> GITHUB</a><a href="https://linkedin.com/in/pallavburnwal" target="_blank" rel="noreferrer"><Linkedin size={17} /> LINKEDIN</a></div>
        </div>
        <footer className="pf-footer"><span>© 2026 PALLAV BURNWAL</span><span>DESIGNED AS A DIGITAL RESIDENCE</span><button onClick={() => scrollTo('home')}>BACK TO TOP ↑</button></footer>
      </section>
    </main>
  )
}
