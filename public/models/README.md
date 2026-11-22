# Pallav avatar model asset

The portfolio code is prepared to load a photorealistic, rigged glTF 2.0 binary at:

`public/models/pallav-avatar.glb`

The model is intentionally not fabricated from a flat photograph. Add a genuine rigged GLB generated from Pallav's approved portrait reference.

## Required rig conventions

- Human body skeleton with a head bone named `Head` (or `head`).
- Eye bones named `LeftEye` and `RightEye` (aliases for common Mixamo names are also checked).
- Face mesh with morph targets named `jawOpen`, `mouthOpen`, `viseme_aa`, and optionally `viseme_oh`.
- Neutral standing pose, facing +Z.
- Realistic human proportions and PBR materials.
- The bronze embroidered N sweatshirt detail should be part of the model texture/material.

The runtime detects this file before mounting the Three.js canvas. Until it exists, a lightweight placeholder is shown and the rest of the portfolio remains usable.

## Performance

Export a GLB with compressed textures (KTX2 where possible), Draco geometry compression, 1K–2K textures and a reasonable mesh budget. Keep the model below roughly 12 MB where practical. The canvas uses low-power rendering and a capped device pixel ratio.
