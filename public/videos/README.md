# Cinematic video assets

Generate the six clips using the prompts in the project handoff and place the MP4 files in this directory with these exact filenames:

- 01-residence-exterior.mp4
- 02-living-room.mp4
- 03-developer-studio.mp4
- 04-upper-floor.mp4
- 05-project-gallery.mp4
- 06-terrace-finale.mp4

Recommended export: H.264 MP4, 1280x720 (720p), 24 fps, 6–10 seconds per clip, fast-start enabled, no baked-in titles or logos. Keep the six clips visually consistent: same residence architecture, material palette, time of day and camera language. Use matching end/start compositions so consecutive chapters feel continuous.

The cinematic tour player is already wired to these paths. Until a clip is added, the player displays a helpful missing-asset message. Do not commit large source renders if repository size becomes an issue; use Git LFS or host optimized MP4/WebM assets on a media CDN and update the paths in src/components/CinematicTour.tsx.
