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
- Corners are rounded 8 mm, so tiles slide in and out without
  catching on a sharp corner.

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
only ~1.35 mm deep for a 3 mm tile. Its latch-pin successor is gone too —
pins are fiddly to print, lose, and push through. It is replaced by:

- **Slide-in frame** — one frame, no pins, no lid to lose. A 2.2 mm floor,
  a U-shaped wall (open at the bottom end), and a top lip frame that
  overlaps the insert by 2 mm per side. The pocket is 0.4 mm wider per
  side than the insert, the insert slides in from the open end until it
  hits the far wall, and the lip holds it down with 0.4 mm of vertical
  play. To swap a tile, press the exposed tile through the lip opening
  and slide it back out the open end.
- **Top keyring loop** — centered top loop, 14 mm across with a 7 mm hole,
  for a split ring or small clasp.
- **Keychain fob on the loop** — a flat fob (32 × 26 mm, with a 5 mm hole at
  the far end for a split ring) joined to the loop by a flat connector
  ring. On a one-piece tile it hangs from the tile; on a frame it
  hangs from the frame. Print it with the tile/frame — it is fused to
  the loop, not a separate part to assemble.

The tile cube is gone too — it was a novelty with no real use. The
frame, the rounded tile, and the keychain are the product now.

## Tile sets

Section 5, Tile Sets, adds four set modes. Sets use square tiles,
regardless of the Tile Format setting. Story, chain, and memory sets
use preset textures, cycling through the preset library starting at
the currently selected preset. The picture puzzle splits the current
design instead.

- **Story frame** — 3, 4, or 5 square inserts in a row in one long
  slide-in frame. Frame width is 170.6 mm for 3 tiles, 224.4 mm for 4,
  and 278.2 mm for 5, so check your bed: the 4-tile frame fits a
  220 mm bed diagonally, the 5-tile frame needs a larger bed or a
  small scale-down in the slicer. Inserts are in left-to-right order.
- **Tile chain** — 3, 4, or 5 full 63 mm tiles, each with a 14 mm loop
  (7 mm hole) on both sides. Links are not printed linked: print the
  links, then join them with split rings or jump rings after printing.
- **Memory game** — 3 or 4 pairs, two tiles per texture. Tiles are
  identical in size and shape, backs are blank, so pairs match by
  touch only. Shuffle the printed tiles before playing.
- **Picture puzzle** — the current design, split into 2×2 or 3×3
  pieces in one big slide frame (116.8 mm square for 2×2,
  170.6 mm for 3×3). Pieces are named by row and column, R1C1
  top-left to bottom-right, and the pattern is continuous across
  pieces, not repeated per piece. For an equation, rotation and scale
  are applied to the whole picture before splitting, so pieces align.
  For an uploaded image, the image is split at its original
  orientation so pieces align.

## Export

All exports are binary STL.

- **Export solid STL** — one-piece tile (with loop/fob if those are on).
- With the slide-in frame on, the button splits into **Export frame STL**
  (floor + wall + lip, plus the keychain if that is on) and
  **Export texture insert STL** — print separately, then slide the
  insert in from the open end.
- With a set on, the button splits into **Export set frame STL**
  (story and puzzle only) and **Export set tiles STL** — set tiles
  download as one file per tile, in set order, so a failed tile print
  can be reprinted on its own. Allow multiple downloads if your
  browser asks.

## Print notes

Relief is gentle by design (tanh-softened, ±1.6 mm clamp). 0.2 mm layers work
well; no supports needed for the tile, tray, lid, pins, fob, faces, core,
or caps. Container and cube parts are sized with 0.4 mm clearance per side
for a sliding fit on a typical FDM printer; if your printer runs tight,
scale the lid/caps up 1% rather than forcing the insert.
