import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play, Volume2, VolumeX, X, Film } from 'lucide-react'

type Chapter = { title: string; subtitle: string; file: string; category: string; duration: string }
const chapters: Chapter[] = [
  { title: 'The Residence', subtitle: 'An architectural introduction to the digital home.', file: '/videos/01-residence-exterior.mp4', category: '01 / EXTERIOR', duration: '01' },
  { title: 'The Living Space', subtitle: 'A connected open-plan space for everyday life.', file: '/videos/02-living-room.mp4', category: '02 / LIVING', duration: '02' },
  { title: 'The Developer Studio', subtitle: 'The desk, tools and systems behind the work.', file: '/videos/03-developer-studio.mp4', category: '03 / STUDIO', duration: '03' },
  { title: 'The Upper Floor', subtitle: 'A quieter level for learning, focus and ideas.', file: '/videos/04-upper-floor.mp4', category: '04 / UPPER FLOOR', duration: '04' },
  { title: 'The Project Gallery', subtitle: 'Selected products, experiments and achievements.', file: '/videos/05-project-gallery.mp4', category: '05 / GALLERY', duration: '05' },
  { title: 'The Terrace', subtitle: 'A closing view and an invitation to connect.', file: '/videos/06-terrace-finale.mp4', category: '06 / TERRACE', duration: '06' },
]

export function CinematicTour({ onClose }: { onClose: () => void }) {
  const video = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const chapter = chapters[active]

  useEffect(() => {
    const node = video.current
    setPlaying(false)
    setLoading(false)
    setFailed(false)
    setReady(false)
    setProgress(0)
    setCompleted(false)
    if (node) {
      node.pause()
      node.currentTime = 0
      node.load()
    }
  }, [active])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setActive(value => Math.min(chapters.length - 1, value + 1))
      if (event.key === 'ArrowLeft') setActive(value => Math.max(0, value - 1))
    }
    const onVisibility = () => {
      if (document.hidden) {
        video.current?.pause()
        setPlaying(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('visibilitychange', onVisibility)
      video.current?.pause()
    }
  }, [onClose])

  const play = async () => {
    const node = video.current
    if (!node) return
    setFailed(false)
    setLoading(true)
    if (completed) {
      node.currentTime = 0
      setProgress(0)
      setCompleted(false)
    }
    node.load()
    try {
      await node.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
      setLoading(false)
    }
  }

  const pause = () => {
    video.current?.pause()
    setPlaying(false)
    setLoading(false)
  }

  const selectChapter = (index: number) => setActive(index)
  const previous = () => selectChapter(Math.max(0, active - 1))
  const next = () => selectChapter(Math.min(chapters.length - 1, active + 1))

  return <section className="cinematic-tour" aria-label="Cinematic residence tour">
    <header className="cinematic-top">
      <div className="cinematic-brand"><span className="brand-mark">P.</span><span>PALLAV <i>/ CINEMATIC RESIDENCE</i></span></div>
      <div className="cinematic-top-center"><Film size={14}/> SIX CHAPTERS <span>·</span> SELECT A CHAPTER TO EXPLORE</div>
      <button className="cinematic-icon" onClick={onClose} aria-label="Close cinematic tour"><X size={19}/></button>
    </header>

    <div className="cinematic-layout">
      <aside className="cinematic-chapters">
        <div className="cinematic-section-label">THE FILM <span>01 — 06</span></div>
        <h2>Explore the<br/><em>residence.</em></h2>
        <p className="cinematic-intro">A guided visual journey through the spaces, work and ideas that make up my digital home.</p>
        <nav className="chapter-list" aria-label="Film chapters">
          {chapters.map((item, index) => <button
            key={item.file}
            className={index === active ? 'chapter-item active' : 'chapter-item'}
            onClick={() => selectChapter(index)}
            aria-current={index === active ? 'step' : undefined}
          >
            <span className="chapter-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="chapter-details"><strong>{item.title}</strong><small>{item.category.split('/ ')[1]}</small></span>
            <span className="chapter-arrow">↗</span>
          </button>)}
        </nav>
        <div className="cinematic-side-note"><span className="live-dot"/> CHOOSE ANY CHAPTER · WATCH AT YOUR PACE</div>
      </aside>

      <main className="cinematic-stage">
        <div className="cinematic-stage-art" aria-hidden="true">
          <div className="stage-glow"/>
          <div className="stage-grid"/>
          <div className="stage-index">P / RESIDENCE FILM</div>
        </div>
        <video
          key={chapter.file}
          ref={video}
          className={ready ? 'cinematic-video is-ready' : 'cinematic-video'}
          src={chapter.file}
          muted={muted}
          playsInline
          preload="metadata"
          controls={false}
          onCanPlay={() => { setReady(true); setLoading(false) }}
          onLoadedData={() => { setReady(true); setLoading(false) }}
          onWaiting={() => setLoading(true)}
          onPlaying={() => { setPlaying(true); setLoading(false) }}
          onTimeUpdate={event => {
            const node = event.currentTarget
            setProgress(node.duration ? node.currentTime / node.duration : 0)
          }}
          onEnded={() => { setPlaying(false); setCompleted(true) }}
          onError={() => { setFailed(true); setPlaying(false); setLoading(false); setReady(false) }}
        />
        {!ready && <div className="cinematic-stage-placeholder">
          <span className="placeholder-kicker">CHAPTER {String(active + 1).padStart(2, '0')} / 06</span>
          <Film size={34}/>
          <strong>{failed ? 'VIDEO ASSET NOT FOUND' : chapter.title}</strong>
          <span>{failed ? 'Add the MP4 file at the path shown below to activate this chapter.' : 'Select PLAY CHAPTER to load this 720p film.'}</span>
          {failed && <code>public{chapter.file}</code>}
        </div>}
        <div className="cinematic-stage-shade"/>
        <div className="cinematic-stage-heading">
          <div className="cinematic-kicker">{chapter.category} <span>· 720P CINEMATIC</span></div>
          <h3>{chapter.title}</h3>
          <p>{chapter.subtitle}</p>
          <div className="cinematic-controls">
            <button className="cinematic-play" onClick={() => playing ? pause() : play()}>
              {playing ? <Pause size={16}/> : <Play size={16}/>}
              {playing ? 'PAUSE CHAPTER' : completed ? 'REPLAY CHAPTER' : failed ? 'RETRY CHAPTER' : 'PLAY CHAPTER'}
            </button>
            <button className="cinematic-icon" onClick={() => setMuted(value => !value)} aria-label="Toggle mute">{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button>
            <button className="cinematic-icon" onClick={previous} disabled={active === 0} aria-label="Previous chapter"><ArrowLeft size={17}/></button>
            <button className="cinematic-icon" onClick={next} disabled={active === chapters.length - 1} aria-label="Next chapter"><ArrowRight size={17}/></button>
          </div>
          {loading && <div className="cinematic-buffering" role="status">LOADING CHAPTER…</div>}
        </div>
        <div className="cinematic-stage-footer">
          <div className="chapter-progress"><span style={{ transform: 'scaleX(' + progress + ')' }}/></div>
          <div><span>{completed ? 'CHAPTER COMPLETE' : playing ? 'NOW PLAYING' : failed ? 'ASSET REQUIRED' : 'READY TO EXPLORE'}</span><span>{String(active + 1).padStart(2, '0')} / 06</span></div>
        </div>
      </main>
    </div>
  </section>
}
