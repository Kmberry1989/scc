// Scans assets/cosmetics/<category>/*.glb and writes assets/cosmetics/manifest.json.
// Filenames become catalogue labels: yellow_raincoat.glb -> "Yellow Raincoat".
// Missing folders produce empty category arrays (the game tolerates this).
import { readdirSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "assets", "cosmetics");

const CATEGORIES = {
  hairstyles: "hairstyles",
  "head-accessories": "headAccessories",
  outfits: "outfits",
  "hand-accessories": "handAccessories",
  shoes: "shoes",
};

const label = (file) =>
  file
    .replace(/\.[^.]+$/, "")
    .split(/[_-]+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

const manifest = {};
for (const [folder, key] of Object.entries(CATEGORIES)) {
  const folderPath = join(dir, folder);
  const entries = [];
  if (existsSync(folderPath)) {
    for (const file of readdirSync(folderPath).sort()) {
      if (!file.toLowerCase().endsWith(".glb")) continue;
      entries.push({
        id: file.replace(/\.[^.]+$/, ""),
        label: label(file),
        path: `assets/cosmetics/${folder}/${file}`,
      });
    }
  }
  manifest[key] = entries;
}

mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
const total = Object.values(manifest).reduce((n, a) => n + a.length, 0);
console.log(`cosmetics manifest: ${total} item(s)`);
