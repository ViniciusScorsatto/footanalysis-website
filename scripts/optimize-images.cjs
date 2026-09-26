// Run with: node scripts/optimize-images.cjs
// Keep the PNG sources for social previews and future image exports.
const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

async function main() {
  const root = path.resolve(__dirname, "../public");
  const output = path.join(root, "optimized");
  await fs.mkdir(output, { recursive: true });
  const names = (await fs.readdir(root)).filter((name) =>
    /^(hero-bg-|video-example-|fake-banner-en|footanalysis-logo).*\.png$/.test(name)
  ).sort();
  let before = 0;
  let after = 0;
  for (const name of names) {
    const source = path.join(root, name);
    const destination = path.join(output, name.replace(/\.png$/, ".webp"));
    const original = (await fs.stat(source)).size;
    const result = await sharp(source)
      .webp({ quality: name.startsWith("video-example-") ? 88 : 82, effort: 6 })
      .toFile(destination);
    before += original;
    after += result.size;
    console.log(`${name}: ${original} -> ${result.size} bytes`);
  }
  console.log(`Total: ${before} -> ${after} bytes (${(100 * (1 - after / before)).toFixed(1)}% smaller)`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
