import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'

type Scene = { title: string; subtitle: string; file: string }
const scenes: Scene[] = [
  { title: 'THE RESIDENCE', subtitle: 'A different perspective on a developer portfolio.', file: '/videos/01-residence-exterior.mp4' },
  { title: 'THE LIVING SPACE', subtitle: 'An open, connected architectural experience.', file: '/videos/02-living-room.mp4' },
  { title: 'THE DEVELOPER STUDIO', subtitle: 'Where ideas become working products.', file: '/videos/03-developer-studio.mp4' },
  { title: 'THE UPPER FLOOR', subtitle: 'A quieter space to think, learn and create.', file: '/videos/04-upper-floor.mp4' },
  { title: 'THE PROJECT GALLERY', subtitle: 'Selected work, experiments and achievements.', file: '/videos/05-project-gallery.mp4' },
  { title: 'BEYOND THE SCREEN', subtitle: 'Let’s build something meaningful together.', file: '/videos/06-terrace-finale.mp4' },
]

export function CinematicTour({ onClose }: { onClose: () => void }) {
  const video = useRef<HTMLVideoElement>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [failed, setFailed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const scene = scenes[index]

  useEffect(() => {
    const node = video.current
    setFailed(false)
    setLoading(false)
    setProgress(0)
    setPlaying(false)
    if (node) {
      node.pause()
      node.currentTime = 0
      node.preload = 'none'
      node.load()
    }
  }, [index])

  const play = () => {
    const node = video.current
    if (!node) return
    setFailed(false)
    setLoading(true)
    setPlaying(true)
    node.preload = 'auto'
    if (node.networkState === HTMLMediaElement.NETWORK_EMPTY) node.load()
    node.play().catch(() => {
      setPlaying(false)
      setLoading(false)
    })
  }

  const pause = () => {
    video.current?.pause()
    setPlaying(false)
    setLoading(false)
  }

  const next = () => {
    if (index < scenes.length - 1) setIndex(current => current + 1)
    else pause()
  }

  const previous = () => {
    if (index > 0) setIndex(current => current - 1)
  }

  return <section className="cinematic-tour" aria-label="Cinematic residence tour">
    <video
      key={scene.file}
      ref={video}
      className="cinematic-video"
      src={scene.file}
      muted={muted}
      playsInline
      preload="none"
      controls={false}
      onClick={() => playing ? pause() : play()}
      onCanPlay={() => setLoading(false)}
      onLoadedData={() => setLoading(false)}
      onWaiting={() => setLoading(true)}
      onTimeUpdate={event => {
        const node = event.currentTarget
        setProgress(node.duration ? node.currentTime / node.duration : 0)
      }}
      onEnded={next}
      onError={() => { setFailed(true); setPlaying(false); setLoading(false) }}
    />
    <div className="cinematic-vignette"/>
    {loading && <div className="cinematic-buffering" role="status">LOADING VIDEO…</div>}
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
        <span>Place an optimized 720p H.264 MP4 at <code>public{scene.file}</code>. Recommended: 1280 × 720, 24 fps, fast-start enabled.</span>
      </div>}
      <div className="cinematic-controls">
        <button className="cinematic-play" onClick={() => {
          if (failed) { setFailed(false); play(); return }
          playing ? pause() : play()
        }} aria-label={playing ? 'Pause' : 'Play'}>
          {failed ? <ArrowLeft size={16}/> : playing ? <Pause size={16}/> : <Play size={16}/>}
          {failed ? 'RETRY SCENE' : playing ? 'PAUSE FILM' : 'PLAY FILM'}
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
