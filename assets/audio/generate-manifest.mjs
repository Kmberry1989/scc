// Scans assets/audio/music/*.wav and assets/audio/sfx/*.wav,
// writes assets/audio/manifest.json. Missing folders -> empty lists.
import { readdirSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dir = join(root, "assets", "audio");

const label = (file) =>
  file
    .replace(/\.[^.]+$/, "")
    .split(/[_-]+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

const scan = (sub) => {
  const folderPath = join(dir, sub);
  const entries = [];
  if (existsSync(folderPath)) {
    for (const file of readdirSync(folderPath).sort()) {
      if (!/\.(wav|mp3|ogg)$/i.test(file)) continue;
      entries.push({
        id: file.replace(/\.[^.]+$/, ""),
        label: label(file),
        path: `assets/audio/${sub}/${file}`,
      });
    }
  }
  return entries;
};

const manifest = { music: scan("music"), sfx: scan("sfx") };
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `audio manifest: ${manifest.music.length} music, ${manifest.sfx.length} sfx`
);
