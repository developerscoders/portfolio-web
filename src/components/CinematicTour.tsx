import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'

type Scene = { title: string; subtitle: string; file: string; duration: number }

const scenes: Scene[] = [
  { title: 'THE RESIDENCE', subtitle: 'A different perspective on a developer portfolio.', file: '/videos/01-residence-exterior.mp4', duration: 8 },
  { title: 'THE LIVING SPACE', subtitle: 'An open, connected architectural experience.', file: '/videos/02-living-room.mp4', duration: 8 },
  { title: 'THE DEVELOPER STUDIO', subtitle: 'Where ideas become working products.', file: '/videos/03-developer-studio.mp4', duration: 8 },
  { title: 'THE UPPER FLOOR', subtitle: 'A quieter space to think, learn and create.', file: '/videos/04-upper-floor.mp4', duration: 8 },
  { title: 'THE PROJECT GALLERY', subtitle: 'Selected work, experiments and achievements.', file: '/videos/05-project-gallery.mp4', duration: 8 },
  { title: 'BEYOND THE SCREEN', subtitle: 'Let’s build something meaningful together.', file: '/videos/06-terrace-finale.mp4', duration: 8 },
]

export function CinematicTour({ onClose }: { onClose: () => void }) {
  const video = useRef<HTMLVideoElement>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [failed, setFailed] = useState(false)
  const [progress, setProgress] = useState(0)
  const scene = scenes[index]

  useEffect(() => {
    setFailed(false)
    setProgress(0)
    setPlaying(true)
    const node = video.current
    if (!node) return
    node.load()
    const attempt = node.play()
    if (attempt) attempt.then(() => setPlaying(true)).catch(() => setPlaying(false))
  }, [index])

  useEffect(() => {
    const node = video.current
    if (!node) return
    if (playing) node.play().catch(() => setPlaying(false))
    else node.pause()
  }, [playing, index])

  const next = () => setIndex(current => Math.min(current + 1, scenes.length - 1))
  const previous = () => setIndex(current => Math.max(current - 1, 0))

  return <section className="cinematic-tour" aria-label="Cinematic residence tour">
    <video
      ref={video}
      className="cinematic-video"
      src={scene.file}
      muted={muted}
      playsInline
      preload="metadata"
      onTimeUpdate={event => {
        const node = event.currentTarget
        setProgress(node.duration ? node.currentTime / node.duration : 0)
      }}
      onEnded={() => index < scenes.length - 1 ? next() : setPlaying(false)}
      onError={() => { setFailed(true); setPlaying(false) }}
    />
    <div className="cinematic-vignette"/>
    <div className="cinematic-top">
      <div className="cinematic-brand"><span className="brand-mark">P.</span><span>PALLAV <i> / CINEMATIC TOUR</i></span></div>
      <button className="cinematic-icon" onClick={onClose} aria-label="Close cinematic tour"><X size={19}/></button>
    </div>
    <div className="cinematic-copy">
      <div className="cinematic-kicker">CHAPTER {String(index + 1).padStart(2, '0')} / 06</div>
      <h2>{scene.title}</h2>
      <p>{scene.subtitle}</p>
      {failed && <div className="cinematic-missing">
        <strong>Video scene not added yet</strong>
        <span>Place the generated clip at <code>public{scene.file}</code>, then reload this tour.</span>
      </div>}
      <div className="cinematic-controls">
        <button className="cinematic-play" onClick={() => failed ? onClose() : setPlaying(value => !value)} aria-label={playing ? 'Pause' : 'Play'}>
          {failed ? <ArrowLeft size={16}/> : playing ? <Pause size={16}/> : <Play size={16}/>}
          {failed ? 'RETURN TO RESIDENCE' : playing ? 'PAUSE FILM' : 'PLAY FILM'}
        </button>
        <button className="cinematic-icon" onClick={() => setMuted(value => !value)} aria-label="Toggle mute">{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button>
        <button className="cinematic-icon" onClick={previous} disabled={index === 0} aria-label="Previous scene"><ArrowLeft size={17}/></button>
        <button className="cinematic-icon" onClick={next} disabled={index === scenes.length - 1} aria-label="Next scene"><ArrowRight size={17}/></button>
      </div>
    </div>
    <div className="cinematic-bottom">
      <div className="cinematic-progress">{scenes.map((item, i) => <button key={item.file} className={i === index ? 'progress-segment current' : i < index ? 'progress-segment complete' : 'progress-segment'} onClick={() => setIndex(i)} aria-label={'Go to ' + item.title}><span style={{ transform: i === index ? 'scaleX(' + progress + ')' : undefined }}/></button>)}</div>
      <div className="cinematic-bottom-meta"><span>INTERACTIVE PORTFOLIO FILM</span><span>{String(index + 1).padStart(2, '0')} — 06</span></div>
    </div>
  </section>
}
