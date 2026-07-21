import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const defaultManifestPath = resolve(
  repoRoot,
  "config/commerciale/manifesto-commerciale.v1.json",
);
const expectedManifestSha256 =
  "ef325fafa1cb11eb8cadc87e4c6d8d60e1c260116c87b67e7d3667685384ae79";

export async function verifyCommercialManifest(
  manifestPath = defaultManifestPath,
) {
  const rawManifest = await readFile(manifestPath, "utf8");
  const actualHash = createHash("sha256").update(rawManifest).digest("hex");
  if (actualHash !== expectedManifestSha256) {
    throw new Error(
      `Drift dal manifesto commerciale canonico: SHA-256 atteso ${expectedManifestSha256}, ricevuto ${actualHash}`,
    );
  }

  const manifest = JSON.parse(rawManifest);
  const errors = validateManifestSemantics(manifest);
  if (errors.length > 0) {
    throw new Error(`Manifesto commerciale non valido:\n- ${errors.join("\n- ")}`);
  }

  await rejectHardCodedPrices(resolve(repoRoot, "src"));
  return manifest;
}

function validateManifestSemantics(manifest) {
  const errors = [];
  if (manifest.schemaVersion !== 1 || manifest.version !== "1.1.0") {
    errors.push("versione canonica diversa da schema 1 / catalogo 1.1.0");
  }
  if (manifest.valuta !== "EUR") errors.push("valuta diversa da EUR");
  if (JSON.stringify(manifest.tier) !== JSON.stringify(["Light", "Plus"])) {
    errors.push("tier diversi da Light e Plus");
  }
  if (
    JSON.stringify(manifest.periodicita) !==
    JSON.stringify(["mensile", "annuale"])
  ) {
    errors.push("periodicità diverse da mensile e annuale");
  }

  const offers = new Map(
    (manifest.offerte ?? []).map((offer) => [offer.id, offer]),
  );
  const expectedOffers = new Map([
    ["light-mensile", ["Light", "mensile", 1999, "email_standard", 0]],
    ["light-annuale", ["Light", "annuale", 20000, "email_standard", 0]],
    ["plus-mensile", ["Plus", "mensile", 4499, "prioritario", 0]],
    ["plus-annuale", ["Plus", "annuale", 48000, "prioritario", 2]],
  ]);
  if (offers.size !== expectedOffers.size) {
    errors.push("numero di offerte diverso da quattro");
  }
  for (const [id, expected] of expectedOffers) {
    const offer = offers.get(id);
    const actual = offer
      ? [
          offer.tier,
          offer.periodicita,
          offer.prezzo?.importoMinore,
          offer.supporto?.livello,
          offer.supporto?.sessioniIndividuali?.length,
        ]
      : null;
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      errors.push(`offerta ${id} diversa dal contratto canonico`);
    }
    if (offer?.prezzo?.valuta !== "EUR" || offer?.costoAttivazioneMinore !== 0) {
      errors.push(`offerta ${id} con valuta o costo di attivazione non canonico`);
    }
  }

  const expectedLevels = {
    Light: { sessions: 2, recipe: 5, ddt: 0 },
    Plus: { sessions: 3, recipe: 15, ddt: 15 },
  };
  for (const [tier, expected] of Object.entries(expectedLevels)) {
    const level = manifest.livelli?.find((candidate) => candidate.tier === tier);
    if (
      level?.sessioniSimultanee !== expected.sessions ||
      level?.quoteAiGiornaliere?.recipe !== expected.recipe ||
      level?.quoteAiGiornaliere?.ddt !== expected.ddt ||
      level?.esportazioni?.moduliInclusi !== "illimitate"
    ) {
      errors.push(`limiti del livello ${tier} diversi dal contratto canonico`);
    }
  }

  const capabilityIds = new Set(
    (manifest.capacita ?? []).map((capability) => capability.id),
  );
  for (const level of manifest.livelli ?? []) {
    if (
      level.featureIds?.some((featureId) => !capabilityIds.has(featureId))
    ) {
      errors.push(`feature del livello ${level.tier} non dichiarata nelle capacità`);
    }
  }
  if (JSON.stringify(manifest).match(/price_[a-z0-9]+|sk_(test|live)_|whsec_/i)) {
    errors.push("il manifesto contiene identificativi o segreti non pubblici");
  }
  return errors;
}

async function rejectHardCodedPrices(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await rejectHardCodedPrices(path);
      continue;
    }
    if (!/\.(ts|tsx)$/.test(entry.name) || entry.name.includes(".test.")) {
      continue;
    }
    const source = await readFile(path, "utf8");
    if (/€\s*\d|\b(?:19[,.]99|44[,.]99|200|480)\s*(?:€|euro)/i.test(source)) {
      throw new Error(
        `Prezzo commerciale hard-coded in ${path}; usare il manifesto canonico`,
      );
    }
  }
}

function parseManifestPath(arguments_) {
  if (arguments_.length === 0) return defaultManifestPath;
  if (arguments_.length === 2 && arguments_[0] === "--manifest") {
    return resolve(process.cwd(), arguments_[1]);
  }
  throw new Error("Uso: verifica-manifesto-commerciale.mjs [--manifest path]");
}

const invokedPath = process.argv[1]
  ? pathToFileURL(resolve(process.argv[1])).href
  : null;
if (invokedPath === import.meta.url) {
  verifyCommercialManifest(parseManifestPath(process.argv.slice(2)))
    .then((manifest) => {
      process.stdout.write(
        `Manifesto commerciale ${manifest.version} allineato\n`,
      );
    })
    .catch((error) => {
      process.stderr.write(`${error.message}\n`);
      process.exitCode = 1;
    });
}
