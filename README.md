# Touchy Subjects — Tactile Tile Studio

Browser-based studio for designing 3D-printable tactile tiles. Pick a preset (or
write your own `Z = f(x, y)` equation), preview the relief in 3D, add a case or
keyring loop, and export a print-ready STL.

Just open `index.html` over HTTP (ES modules don't load from `file://`):

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Three.js r160 is vendored in `assets/vendor/three/` — no CDN, works offline.

## The tiles

- **Square Tile** · 63 × 63 mm, or **Tall Card** · 63 × 88 mm.
- 3 mm base, 4 mm protected rim, relief clamped to ±1.6 mm. Texture is inset
  from the edge so every tile keeps a strong, flat border.

## Designing a surface

- **Preset design** — 29 built-in relief equations (Soft Domes, Fingerprint
  Spiral, Brain Coral, Damped Ripples, …). Thumbnails preview each one.
- **Base shape (macro)** + **Surface texture (micro)** — combine a large form
  with a fine grain; **Randomize** rolls a distinct combo.
- **Modify** — intensity, rotation, scale, offset, invert relief.
- **Custom equation** — type any `Z = f(x, y)`. Available: `x`, `y`, `PI`,
  `sin cos tan asin acos atan atan2 hypot tanh exp log sqrt abs ceil floor
  round min max pow`, operators `+ - * / ^ ( )`. Example:
  `sin(x*2)*cos(y*2)`. Bad input shows a plain-language error, nothing breaks.
- **Image relief** — upload any picture instead of an equation; its brightness
  becomes the heightfield (white = raised). All the Modify controls
  (intensity, rotation, scale, offset, invert) apply to it. Picking a preset
  or typing an equation switches back.

## Case options

- **Replaceable texture insert** — prints a two-part case (front rim + back with
  an 18 mm push-out opening) so texture inserts can be swapped.
- **Corner keyring loop** — centered, flat top loop, reinforced at the joint.
- **Interlocking jigsaw case edges** — right-side tab mates with the next case's
  left socket; forces the modular case on.

## Export

- **Export solid STL** — one-piece tile.
- With the modular case on, the button splits into **Export case STL** and
  **Export texture insert STL** — print separately.
- Filenames carry the format, e.g. `TouchySubjects_square_modular_tile.stl`.

## Print notes

Relief is gentle by design (tanh-softened, ±1.6 mm clamp). 0.2 mm layers work
well; no supports needed for the tile itself. The case rim prints flat on the
bed.
