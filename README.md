# PALLAV — Cinematic Developer Portfolio

A cinematic, chapter-based developer portfolio built with React, Vite and TypeScript. The visual direction is inspired by a premium private retreat: warm architectural light, full-screen residence footage, refined typography, quiet motion and interactive details.

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

## Experience
The portfolio is presented as six connected chapters:
1. **Arrival** — introduction and a route into selected work.
2. **The Lounge** — about, approach and product mindset.
3. **The Workspace** — professional experience and delivery highlights.
4. **The Library** — education, engineering toolkit and recognition.
5. **The Gallery** — selected product and project cards.
6. **The Terrace** — contact and next steps.

The avatar and its speech/microphone interface have been removed. The experience now focuses on the work, the visual environment and direct navigation.

## Interaction and motion
- Select chapters from the right-side journey rail or the Explore menu.
- Use the arrow controls, mouse wheel, touch swipe, or keyboard arrows/PageUp/PageDown.
- Cinematic scene changes follow the active chapter.
- Cards use pointer-positioned warm light, border highlights and lift-on-hover.
- Intro typography, ambient light, film grain and chapter transitions are animated.
- Reduced-motion preferences are respected.

## Video assets
Place the six MP4 clips in `public/videos/` with these exact names:
- `01-residence-exterior.mp4`
- `02-living-room.mp4`
- `03-developer-studio.mp4`
- `04-upper-floor.mp4`
- `05-project-gallery.mp4`
- `06-terrace-finale.mp4`

The player has a visual fallback if a clip is missing. Verify that all six MP4 files are present in the deployed build if you want the complete cinematic journey.

## Technical notes
- React + TypeScript + Vite.
- Video playback is muted by default; visitors can toggle sound.
- Video elements are reused across chapters to avoid mounting multiple simultaneous players.
- No external GLB or avatar model is required.
- The portfolio content is maintained in `src/components/PortfolioSlides.tsx`; visual styling is in `src/components/slides.css`.
