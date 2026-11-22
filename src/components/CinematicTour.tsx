import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'

type Scene = { title: string; subtitle: string; file: string; location: string }
const scenes: Scene[] = [
  { title: 'THE RESIDENCE', subtitle: 'A different perspective on a developer portfolio.', file: '/videos/01-residence-exterior.mp4', location: '01 / EXTERIOR' },
  { title: 'THE LIVING SPACE', subtitle: 'An open, connected architectural experience.', file: '/videos/02-living-room.mp4', location: '02 / LIVING' },
  { title: 'THE DEVELOPER STUDIO', subtitle: 'Where ideas become working products.', file: '/videos/03-developer-studio.mp4', location: '03 / STUDIO' },
  { title: 'THE UPPER FLOOR', subtitle: 'A quieter space to think, learn and create.', file: '/videos/04-upper-floor.mp4', location: '04 / UPPER FLOOR' },
  { title: 'THE PROJECT GALLERY', subtitle: 'Selected work, experiments and achievements.', file: '/videos/05-project-gallery.mp4', location: '05 / GALLERY' },
  { title: 'BEYOND THE SCREEN', subtitle: 'A final view from the residence terrace.', file: '/videos/06-terrace-finale.mp4', location: '06 / TERRACE' },
]

export function CinematicTour({ onClose }: { onClose: () => void }) {
  const video = useRef<HTMLVideoElement>(null)
  const autoAdvance = useRef(false)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [failed, setFailed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const [preloadNext, setPreloadNext] = useState(false)
  const scene = scenes[index]
  const nextScene = scenes[index + 1]

  useEffect(() => {
    const node = video.current
    setFailed(false)
    setLoading(false)
    setReady(false)
    setProgress(0)
    setPreloadNext(false)
    setPlaying(false)
    if (node) {
      node.pause()
      node.currentTime = 0
      node.preload = 'none'
      node.load()
    }
  }, [index])

  useEffect(() => {
    const stopOnHidden = () => {
      if (document.hidden) {
        video.current?.pause()
        setPlaying(false)
      }
    }
    document.addEventListener('visibilitychange', stopOnHidden)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') goTo(index + 1, false)
      if (event.key === 'ArrowLeft') goTo(index - 1, false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('visibilitychange', stopOnHidden)
      window.removeEventListener('keydown', onKeyDown)
      video.current?.pause()
    }
  }, [index, onClose])

  const play = () => {
    const node = video.current
    if (!node) return
    setFailed(false)
    setLoading(true)
    node.preload = 'auto'
    if (node.networkState === HTMLMediaElement.NETWORK_EMPTY) node.load()
    node.play().then(() => {
      setPlaying(true)
      setLoading(false)
    }).catch(() => {
      setPlaying(false)
      setLoading(false)
    })
  }

  const pause = () => {
    video.current?.pause()
    setPlaying(false)
    setLoading(false)
  }

  function goTo(target: number, continuePlayback: boolean) {
    if (target < 0 || target >= scenes.length) return
    autoAdvance.current = continuePlayback
    setIndex(target)
  }

  const handleLoaded = () => {
    setReady(true)
    setLoading(false)
    if (autoAdvance.current) {
      autoAdvance.current = false
      video.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  return <section className="cinematic-tour" aria-label="Cinematic residence tour">
    <video
      key={scene.file}
      ref={video}
      className={ready ? 'cinematic-video is-ready' : 'cinematic-video'}
      src={scene.file}
      muted={muted}
      playsInline
      preload="none"
      controls={false}
      onClick={() => playing ? pause() : play()}
      onCanPlay={handleLoaded}
      onLoadedData={handleLoaded}
      onWaiting={() => setLoading(true)}
      onTimeUpdate={event => {
        const node = event.currentTarget
        const ratio = node.duration ? node.currentTime / node.duration : 0
        setProgress(ratio)
        if (ratio >= 0.78 && nextScene) setPreloadNext(true)
      }}
      onEnded={() => goTo(index + 1, true)}
      onError={() => {
        autoAdvance.current = false
        setFailed(true)
        setPlaying(false)
        setLoading(false)
        setReady(false)
      }}
    />
    {nextScene && <video className="cinematic-prefetch" src={nextScene.file} muted playsInline preload={preloadNext ? 'auto' : 'none'} aria-hidden="true"/>}
    <div className="cinematic-vignette"/>
    {loading && <div className="cinematic-buffering" role="status">BUFFERING CHAPTER {String(index + 1).padStart(2, '0')}…</div>}
    <div className="cinematic-top">
      <div className="cinematic-brand"><span className="brand-mark">P.</span><span>PALLAV <i> / CINEMATIC TOUR</i></span></div>
      <button className="cinematic-icon" onClick={onClose} aria-label="Close cinematic tour"><X size={19}/></button>
    </div>
    <div className="cinematic-copy">
      <div className="cinematic-kicker">CHAPTER {String(index + 1).padStart(2, '0')} / 06 <span>· {scene.location}</span></div>
      <h2>{scene.title}</h2>
      <p>{scene.subtitle}</p>
      {failed && <div className="cinematic-missing">
        <strong>Video scene not available</strong>
        <span>Add the 720p H.264 MP4 at <code>public{scene.file}</code>. The residence remains available when you close this tour.</span>
      </div>}
      <div className="cinematic-controls">
        <button className="cinematic-play" onClick={() => playing ? pause() : play()} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? <Pause size={16}/> : <Play size={16}/>}
          {playing ? 'PAUSE FILM' : failed ? 'RETRY SCENE' : 'PLAY FILM'}
        </button>
        <button className="cinematic-icon" onClick={() => setMuted(value => !value)} aria-label="Toggle mute">{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button>
        <button className="cinematic-icon" onClick={() => goTo(index - 1, false)} disabled={index === 0} aria-label="Previous scene"><ArrowLeft size={17}/></button>
        <button className="cinematic-icon" onClick={() => goTo(index + 1, false)} disabled={index === scenes.length - 1} aria-label="Next scene"><ArrowRight size={17}/></button>
      </div>
    </div>
    <div className="cinematic-bottom">
      <div className="cinematic-progress">{scenes.map((item, i) => <button key={item.file} className={i === index ? 'progress-segment current' : i < index ? 'progress-segment complete' : 'progress-segment'} onClick={() => goTo(i, false)} aria-label={'Go to ' + item.title}><span style={{ transform: i === index ? 'scaleX(' + progress + ')' : undefined }}/></button>)}</div>
      <div className="cinematic-bottom-meta"><span>INTERACTIVE PORTFOLIO FILM</span><span>{String(index + 1).padStart(2, '0')} — 06</span></div>
    </div>
  </section>
}
