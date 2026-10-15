// Scans assets/environment-props/{buildings,trees,props}/*.glb and writes
// assets/environment-props/manifest.json as { id: { id, kind, label, path } }.
// Missing folders -> empty object (the game tolerates this).
import { readdirSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dir = join(root, "assets", "environment-props");

const KINDS = ["buildings", "trees", "props"];

const label = (file) =>
  file
    .replace(/\.[^.]+$/, "")
    .split(/[_-]+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

const manifest = {};
for (const kind of KINDS) {
  const folderPath = join(dir, kind);
  if (!existsSync(folderPath)) continue;
  for (const file of readdirSync(folderPath).sort()) {
    if (!file.toLowerCase().endsWith(".glb")) continue;
    const id = file.replace(/\.[^.]+$/, "");
    manifest[id] = {
      id,
      kind,
      label: label(file),
      path: `assets/environment-props/${kind}/${file}`,
    };
  }
}

mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`environment-props manifest: ${Object.keys(manifest).length} item(s)`);
