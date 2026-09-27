import assert from "node:assert/strict";

const base = process.argv[2] || "http://localhost:3000";
const canonicalOrigin = process.argv[3] || "https://footanalysis.io";
const paths = ["/pt", "/en", "/pt/about", "/en/about"];
const titles = new Set();
const descriptions = new Set();

for (const path of paths) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const locale = path.split("/")[1];
  const suffix = path.endsWith("/about") ? "/about" : "";
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && description, `${path}: title and description`);
  titles.add(title);
  descriptions.add(description);
  assert.ok(html.includes(`<html lang="${locale === "pt" ? "pt-BR" : "en"}"`), `${path}: language`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: exactly one H1`);
  assert.ok(html.includes(`rel="canonical" href="${canonicalOrigin}${path}"`), `${path}: canonical`);
  for (const lang of ["pt", "en", "x-default"]) {
    assert.ok(html.includes(`hrefLang="${lang}" href="${canonicalOrigin}/${lang === "x-default" ? "pt" : lang}${suffix}"`), `${path}: ${lang} alternative`);
  }
  assert.ok(html.includes(`property="og:url" content="${canonicalOrigin}${path}"`), `${path}: OG URL`);
  assert.ok(html.includes(`name="twitter:title" content="${title}"`), `${path}: Twitter title`);
  const data = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(data, `${path}: JSON-LD`);
  const graph = JSON.parse(data)["@graph"];
  assert.ok(graph.some(item => item["@type"] === "WebSite" && item.url === canonicalOrigin));
  const organization = graph.find(item => item["@type"] === "Organization");
  assert.ok(organization?.sameAs.length && organization.logo.url.startsWith(canonicalOrigin));
  assert.ok(!html.includes('name="robots" content="noindex'), `${path}: indexable`);
  console.log(`PASS ${path}: metadata, language, H1 and structured data`);
}
assert.equal(titles.size, 4, "unique titles");
assert.equal(descriptions.size, 4, "unique descriptions");
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
assert.equal((sitemap.match(/<loc>/g) || []).length, 4);
for (const path of paths) assert.ok(sitemap.includes(`<loc>${canonicalOrigin}${path}</loc>`));
assert.ok(!sitemap.includes("<lastmod>"));
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
const root = await fetch(base, { redirect: "manual" });
assert.equal(root.status, 308);
assert.equal(new URL(root.headers.get("location"), base).pathname, "/pt");
for (const path of ["/pt/palpites", "/not-a-locale"]) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 404, path);
  assert.ok((await response.text()).includes('name="robots" content="noindex"'), `${path}: noindex`);
}
console.log("PASS sitemap, robots, permanent redirect and 404/noindex");
