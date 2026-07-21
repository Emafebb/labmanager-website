import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { verifyCommercialManifest } from "./verifica-manifesto-commerciale.mjs";

const canonicalPath = resolve(
  "config/commerciale/manifesto-commerciale.v1.json",
);

test("accepts the versioned canonical commercial manifest", async () => {
  const manifest = await verifyCommercialManifest(canonicalPath);
  assert.equal(manifest.version, "1.1.0");
  assert.equal(manifest.offerte.length, 4);
});

test("rejects commercial drift before build and Cloudflare pipelines", async () => {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), "labmanager-manifest-"));
  try {
    const manifest = JSON.parse(await readFile(canonicalPath, "utf8"));
    manifest.offerte[0].prezzo.importoMinore += 1;
    const driftedPath = join(temporaryDirectory, "manifest.json");
    await writeFile(driftedPath, `${JSON.stringify(manifest, null, 2)}\n`);

    await assert.rejects(
      verifyCommercialManifest(driftedPath),
      /Drift dal manifesto commerciale canonico/,
    );
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});

test("guards Next build and both Cloudflare pipeline entry points", async () => {
  const packageJson = JSON.parse(await readFile(resolve("package.json"), "utf8"));
  assert.equal(packageJson.scripts.prebuild, "npm run commerciale:check");
  assert.equal(packageJson.scripts.prepreview, "npm run commerciale:check");
  assert.equal(packageJson.scripts.predeploy, "npm run commerciale:check");
});
