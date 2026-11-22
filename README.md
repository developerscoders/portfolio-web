# PALLAV — Interactive 3D Developer Residence

A futuristic interactive portfolio built with React, Vite, TypeScript, Three.js and React Three Fiber.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Controls
- Click **Enter the Residence** to activate exploration.
- WASD / arrow keys: move.
- Shift: run.
- Drag on the canvas: look around.
- First / Third buttons: switch camera.
- Fullscreen: expand the experience.

## Phase 2 additions
- Expanded two-storey glass residence shell and mezzanine.
- Open-plan living zone with sectional seating, coffee table and floor lamp.
- Developer studio with three monitor setup, desk, keyboard, chair and bookshelf.
- Upper reading nook and display shelving.
- Gallery art, indoor planting and ambient light accents.
- Exterior terrace, reflecting pool and stylized garden trees.

## Asset approach
The architecture and furniture are procedural Three.js geometry and physically based materials. Earlier generated/search images were used as visual direction; they are not embedded as flat image backdrops or represented as downloaded 3D assets.

## Current limitations
The character remains a geometric placeholder, not the portrait-matched rigged avatar. Collision-aware navigation, stair traversal, interactive project panels, detailed PBR texture maps and a production build verification remain follow-up work.

## Phase 3 — Cinematic tour integration

The site now includes a six-scene cinematic tour player synchronized by chapter:
1. Residence exterior
2. Living room
3. Developer studio
4. Upper floor
5. Project gallery
6. Terrace finale

Place the generated MP4 clips in `public/videos/` using these exact names:
- `01-residence-exterior.mp4`
- `02-living-room.mp4`
- `03-developer-studio.mp4`
- `04-upper-floor.mp4`
- `05-project-gallery.mp4`
- `06-terrace-finale.mp4`

The player includes chapter navigation, progress, mute, pause, next/previous and a graceful missing-asset message. Video files are not included in the repository yet; they must be generated and added separately.

## Phase 4 — Avatar and slide portfolio

The main portfolio now uses six full-screen animated slides rather than a long scrolling page. Navigate with the right/left arrows, mouse wheel, touch swipe, keyboard arrows/PageUp/PageDown, or the chapter selector. Each slide selects its matching 720p cinematic background clip.

The avatar runtime is lazy-loaded and uses browser-native SpeechSynthesis for free device-provided voice. It checks for `public/models/pallav-avatar.glb`; when present, the Three.js avatar runtime tracks the global pointer through eye bones and head bone and drives supported mouth morph targets from speech boundary events. The browser voice is device-dependent; a male-sounding English voice is selected when the OS exposes one, but the browser cannot guarantee a male voice on every device.

### Required personal avatar assets

- Add your approved portrait as `public/pallav-avatar.jpg` for the portrait fallback.
- Add a genuinely rigged, photorealistic GLB as `public/models/pallav-avatar.glb` for full 3D eye/head tracking and mouth morphs.
- The GLB rig naming and performance requirements are documented in `public/models/README.md`.

A single portrait is not itself a rigged 3D model. The repository contains the loader, controls and animation hooks, but does not claim to contain a generated or rigged identity-matched model until that GLB is supplied. Native browser TTS provides free speech; its boundary events are approximate mouth cues, not phoneme-accurate visemes.
