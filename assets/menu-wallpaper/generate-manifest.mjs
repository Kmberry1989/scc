// Scans assets/menu-wallpaper/ for menu.mp4 / menu.webm and a poster image,
// writes assets/menu-wallpaper/manifest.json.
// No media -> { videos: [], poster: null }, and the menu falls back to the live 3D town.
import { readdirSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dir = join(root, "assets", "menu-wallpaper");

const manifest = { videos: [], poster: null };
if (existsSync(dir)) {
  const files = readdirSync(dir).map((f) => f.toLowerCase());
  for (const name of ["menu.mp4", "menu.webm"]) {
    if (files.includes(name)) manifest.videos.push(`assets/menu-wallpaper/${name}`);
  }
  const poster = files.find((f) => /^menu\.(webp|png|jpg|jpeg)$/.test(f));
  if (poster) manifest.poster = `assets/menu-wallpaper/${poster}`;
}

mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `menu-wallpaper manifest: ${manifest.videos.length} video(s)` +
    (manifest.poster ? `, poster ${manifest.poster}` : ", no poster")
);
