# Snug Society 0.9.15 — current GitHub/Vercel project refresh

**Snapshot:** September 13, 2026  
**Package version:** 0.9.15

This archive matches the latest hosted Snug Society build and is ready to upload to the root of the GitHub repository connected to Vercel.

## Main menu and sign-in

- Compact, icon-only menu dock sized for phone screens while leaving the rotating town diorama visible.
- First tap on a mode opens a translucent confirmation overlay naming the mode; the mode starts only after confirmation.
- Live town-gate title scene with the camera pulled farther back and higher, looking down over the noticeably globe-shaped world while the menu camera orbits.
- Google sign-in alongside Firebase anonymous sign-in. Desktop uses a popup and mobile uses redirect; returning Google players restore their character and progress and skip the welcome sequence.
- Firebase web configuration remains embedded. Enable **Google** in Firebase Console → Authentication → Sign-in method, and add the deployed Vercel domain under Authorized domains.

## In-game camera and visibility

- On-screen camera controls for orbiting left/right and zooming in/out.
- Smart local occlusion fading: buildings, trees, and other scenery between the camera and the local avatar become transparent for that player.
- Text selection, drag-selection, callouts, and document-style highlighting are disabled across the game surface while normal form fields remain usable.

## World, terrain, time, and weather

- Larger terrain footprint with buildings, trees, props, shops, and activity areas spread farther apart.
- The world reads as a rounded globe rather than a flat square, including curved terrain treatment and a higher menu view.
- Slower day/night cycle with sun, moon, stars, and gentler lighting changes.
- Weather transitions fade in and out gradually instead of switching abruptly.
- Snow accumulates progressively on the ground and recedes smoothly as conditions change.
- Clouds are distributed around the sky with varied shapes, sizes, heights, and spacing instead of uniform clumps.
- Rain and snow use smoother particle updates to reduce popping and stutter.
- Birds, rabbits, varied cats, seasons, storms, lightning, thunder, and collision boundaries remain included.

## Town Life

- Shared **Moonlight Footbridge** town project with community coin contributions and visible progress.
- Adoptable cats that can be named and fed, build a bond, follow the player in 3D, and react to emotes.
- Three rotating festivals: Fireworks Night, Meteor Shower, and Costume Parade.
- Photo mode with world freeze, avatar poses, orbit/zoom controls, PNG capture, download, and native sharing where supported.
- Matching `townLife` Realtime Database rules are included.

## Asset pipeline

- Automatic cosmetic catalogue generation for ordinary or Draco-compressed GLBs in:
  - `assets/cosmetics/hairstyles/`
  - `assets/cosmetics/head-accessories/`
  - `assets/cosmetics/outfits/`
  - `assets/cosmetics/hand-accessories/`
  - `assets/cosmetics/shoes/`
- Filenames become display names automatically (`yellow_raincoat.glb` → **Yellow Raincoat**).
- Replacement-world folders and manifest generation for `assets/environment-props/buildings/`, `trees/`, and `props/`.
- Terrain texture slots for grass, paths, soil, water, and sky.
- Bundled Three.js modules, Draco decoders, fitting templates, placeholder environment models, and modeling notes.

## Audio

- Six slower, less repetitive placeholder music arrangements for title, plaza, board, minigames, shops, and home.
- Each track uses a longer 12-bar-style arrangement with changing melody, rests, varied accompaniment, and gentle crossfades between environments.
- Drop-in music and SFX folders plus automatic audio-manifest generation remain included.

## Other current systems included

- 3D welcoming-committee photo shoot with Mayor Mayor, Gideon, and Penny Press; spoken dialogue, larger captions, character gestures, expression previews, and replacement slots for faces and accessories.
- Solo Practice, multiplayer family rooms, invite links/codes, live movement, room chat, WebRTC voice chat, and speaking body language.
- Multiplayer minigames, Snug Board with 2–4 player lobby and bots, walk-up shops, economy, house and avatar customization, and current hardened Firebase Realtime Database rules.

## Deployment reminder

1. Extract the ZIP and upload its **contents** to the root of the GitHub repository.
2. Push to the branch connected to Vercel.
3. Run the included Vercel build so the cosmetic, audio, wallpaper, and environment manifests regenerate.
4. Publish `assets/firebase-realtime-database.rules.json` in Firebase Console.
5. Enable the Google provider and authorize the Vercel domain in Firebase Authentication.

The ZIP contains the current source snapshot, asset folders, manifests, placeholder media, vendor files, build scripts, setup documentation, and checksums.
