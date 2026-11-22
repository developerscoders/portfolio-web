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

## Phase 4 — Animated slide portfolio

The portfolio uses six full-screen animated slides rather than a long scrolling page. Navigate with the left/right arrows, mouse wheel, touch swipe, keyboard arrows/PageUp/PageDown, or chapter selector. Each slide selects its matching 720p cinematic background clip.

## Phase A — Procedural avatar (no GLB required)

The avatar is constructed at runtime with Three.js geometry inside React Three Fiber. No external character model, GLB download, image-to-3D service or paid rigging export is required.

Implemented:
- Procedural upper-body male bust with dark hair, beard, facial features, black sweatshirt and bronze N detail.
- Cursor-following eye groups with bounded rotation and delayed head movement.
- Randomized natural blink animation.
- Subtle torso breathing and idle sway.
- Articulated jaw and mouth movement driven by speech-synthesis boundary events.
- Browser-native SpeechSynthesis for the automatic welcome and replay-intro control.
- Optional visitor voice input using the browser SpeechRecognition API, where supported.
- Local portfolio FAQ responses for projects, skills, experience, education and contact.
- Lazy loading of the avatar component and a low-power, capped-DPR WebGL canvas.

### Voice and browser support

SpeechSynthesis voices are supplied by the visitor's operating system/browser. The app prefers an available English voice and attempts to choose an Indian English voice where possible; it cannot guarantee a male voice on every device. SpeechRecognition is not supported in every browser and may require microphone permission. The conversational response layer currently uses local intent matching and predefined portfolio answers; it is not a connected generative AI chatbot.

### Visual limitation

This is a procedural geometric character, not a photorealistic digital twin. Its face, hair and clothing are assembled from runtime geometry and materials. It does not reproduce the exact facial identity of a photograph, and volume/word-boundary mouth cues are approximate rather than phoneme-accurate visemes. The benefit is a fully self-contained, free-to-render avatar with no GLB dependency.
