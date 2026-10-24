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
- 3 mm base, relief clamped to ±1.6 mm. Texture is inset
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
  becomes the heightfield (white = raised), sampled at 512 × 512 and built
  on a 256-segment tile mesh (about 0.25 mm per vertex on the 63 mm tile),
  so fine image detail survives into the print. An uploaded image loads
  upright, with rotation reset to 0 — it no longer inherits the preset
  default of 35°. All the Modify controls
  (intensity, rotation, scale, offset, invert) still apply to it, so you
  can rotate it deliberately from the slider. Picking a preset
  or typing an equation switches back.

## Case options

The old rim case is gone — it could not fit: its opening was the same size
as the insert (53 mm, shrunk to ~51.9 mm by its bevel), and its pocket was
only ~1.35 mm deep for a 3 mm tile. It is replaced by:

- **Latch container (tray + lid + pins)** — a tray with a 2 mm floor and a
  pocket 0.4 mm wider per side than the insert, so the insert actually
  slides in. The lid is a frame that overlaps the insert by 2 mm per side,
  so the insert cannot pass through it, and two latch pins (3.6 mm shaft
  in a 4 mm hole) drop through ears on the tray and lid to lock the lid.
  The tray floor keeps the 18 mm push-out opening: push the tile out from
  the back to swap it. No bevels on container parts, so the printed sizes
  are the designed sizes.
- **Top keyring loop** — centered top loop, 14 mm across with a 7 mm hole,
  for a split ring or small clasp.
- **Keychain fob on the loop** — a flat fob (32 × 26 mm, with a 5 mm hole at
  the far end for a split ring) joined to the loop by a flat connector
  ring. On a one-piece tile it hangs from the tile; on a container it
  hangs from the tray. Print it with the tile/tray — it is fused to the
  loop, not a separate part to assemble.
- **Cube of tiles (6 faces)** — the current texture on all six faces of a
  63 mm cube. A 56.2 mm core stops the faces falling in, and eight corner
  caps (three plates each, clearing the highest relief by 0.4 mm) hold the
  corners. Cube mode is square-only and turns the container/keychain off.

## Export

All exports are binary STL.

- **Export solid STL** — one-piece tile (with loop/fob if those are on).
- With the latch container on, the button splits into **Export tray STL**,
  **Export lid STL**, **Export latch pins STL** (both pins in one file),
  and **Export texture insert STL** — print separately, then drop the
  insert in, set the lid on, and push both pins through the ears.
- With the cube on, the button splits into **Export cube faces STL** (six
  faces laid flat in a 3 × 2 grid, 199 × 131 mm), **Export cube core STL**,
  and **Export cube caps STL** (eight caps in a row, 179 × 18 mm).

## Print notes

Relief is gentle by design (tanh-softened, ±1.6 mm clamp). 0.2 mm layers work
well; no supports needed for the tile, tray, lid, pins, fob, faces, core,
or caps. Container and cube parts are sized with 0.4 mm clearance per side
for a sliding fit on a typical FDM printer; if your printer runs tight,
scale the lid/caps up 1% rather than forcing the insert.
