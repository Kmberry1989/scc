/**
 * snug-asset-pipeline.js — minimal local asset-pipeline loader.
 *
 * The Sep 13 2026 export referenced a generated asset pipeline that was never
 * uploaded to this repository. This file is a small, honest replacement that
 * exposes the same `loadSnugAssetPipeline()` shape the game bundle expects:
 *
 *   { catalog, draco, environment }
 *
 * - catalog:      { hairstyles:[], headAccessories:[], outfits:[],
 *                   handAccessories:[], shoes:[] } — each entry is
 *                   { id, label, path }. Populated from
 *                   assets/cosmetics/manifest.json when present.
 * - draco:        null (no Draco decoder vendored; GLTFLoader is used without
 *                 one until the real decoder files are restored).
 * - environment:  {} — populated from assets/environment-props/manifest.json
 *                 when present ({ id: { id, path, ... } }).
 *
 * If the full export is ever re-uploaded, replace this file with the original
 * assets/snug-asset-pipeline.js — no other changes needed.
 */

const EMPTY_CATALOG = {
  hairstyles: [],
  headAccessories: [],
  outfits: [],
  handAccessories: [],
  shoes: [],
};

async function readJson(path) {
  try {
    const res = await fetch(path, { cache: "no-cache" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function loadSnugAssetPipeline() {
  const [cosmetics, environment] = await Promise.all([
    readJson("assets/cosmetics/manifest.json"),
    readJson("assets/environment-props/manifest.json"),
  ]);

  const catalog = { ...EMPTY_CATALOG };
  if (cosmetics && typeof cosmetics === "object") {
    for (const key of Object.keys(EMPTY_CATALOG)) {
      if (Array.isArray(cosmetics[key])) catalog[key] = cosmetics[key];
    }
  }

  console.info(
    "[snug] asset pipeline: local stub — " +
      Object.values(catalog).reduce((n, a) => n + a.length, 0) +
      " catalogued cosmetics, no Draco decoder"
  );

  return {
    catalog,
    draco: null,
    environment: environment && typeof environment === "object" ? environment : {},
  };
}
