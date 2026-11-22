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