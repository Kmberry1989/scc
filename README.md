# Snug Society — hosting project

Single-file build of the Snug Society game (`index.html`, v0.9.15 era, exported
**September 13, 2026**). Open `index.html` over HTTP (ES modules won't load from
`file://`):

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Current state (October 15, 2026)

The September 13 upload to this repository was **partial** — most of the
`assets/` tree from the original export never made it up. What's here now:

**Present and working**

- `index.html` — the full game shell: start menu, welcome cinematic, and the
  bundled React + Three.js game client.
- `assets/snug-asset-pipeline.js` — minimal local replacement for the missing
  generated pipeline. Exposes the same `loadSnugAssetPipeline()` shape
  (`{ catalog, draco, environment }`) and reads the generated manifests below
  when they exist. Replace with the original file if the full export is
  re-uploaded.
- `assets/vendor/three/three.module.js` — Three.js r170 (vendored from npm;
  the welcome cinematic imports bare `"three"` via the import map).
- `assets/textures/*.svg` — simple placeholder terrain textures
  (grass, path, sky, soil, water).
- `assets/menu-wallpaper/manifest.json` — empty manifest; the menu falls back
  to the live 3D town view.
- `npm run build` — regenerates the four manifests below; now passes on a
  fresh clone (previously referenced scripts that didn't exist).

**Missing** (referenced by the page, not uploaded — see `CHECKSUMS.sha256`
for the full original file list)

- `assets/multiplayer.js` — Solo Practice, family rooms, Snug Board, voice chat.
  The menu now shows a clear "unavailable" message instead of a blank screen.
- `assets/town-life.js` + `assets/town-life.css` — town project, adoptable cats,
  festivals, photo mode.
- `assets/snug-audio.js` + `assets/audio/music/*.wav`, `assets/audio/sfx/*.wav`.
- `assets/cosmetics/` GLBs, `assets/environment-props/` GLBs,
  `assets/welcome-committee/` models, Draco decoders.
- Firebase web config — `index.html` still carries `"…"` placeholders. Paste the
  real config into the in-app config screen, or the game runs without
  auth/database.

To restore: re-upload the missing `assets/` files from the original September 13
export ZIP (verify against `CHECKSUMS.sha256`), then push — no code changes needed.

## Deploy with GitHub + Vercel

1. Push to the branch connected to Vercel. The included `vercel.json` runs
   `npm run build` and publishes the repository root.
2. Add the deployed Vercel domain in Firebase Authentication → Settings →
   Authorized domains.
3. In Firebase Console → Realtime Database → Rules, replace the existing rules
   with the rules file from the original export (`CHECKSUMS.sha256` lists it as
   `assets/firebase-realtime-database.rules.json`) and publish.

## Add cosmetic GLBs

Place Draco-compressed or ordinary `.glb` files in:

- `assets/cosmetics/hairstyles/`
- `assets/cosmetics/head-accessories/`
- `assets/cosmetics/outfits/`
- `assets/cosmetics/hand-accessories/`
- `assets/cosmetics/shoes/`

Commit and push. The build regenerates `assets/cosmetics/manifest.json`.
Filenames become catalogue labels: `yellow_raincoat.glb` becomes **Yellow Raincoat**.

## Replace placeholder audio

Drop files into `assets/audio/music/` and `assets/audio/sfx/` (same base names
the game expects). The build regenerates `assets/audio/manifest.json`.

## Custom animated menu wallpaper

Add a looping `menu.mp4` (H.264 recommended), optional `menu.webm`, and optional
poster such as `menu.webp` to `assets/menu-wallpaper/`. The build regenerates its
manifest. With no media, the main menu shows the live 3D town.
