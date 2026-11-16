// Lists Wikimedia Commons photos with a usable licence for a search phrase, to pick a replacement
// when an article's lead image is unsuitable. Add the chosen "File:..." to OVERRIDES in fetch-photos.mjs.
// Run: node scripts/find-photo.mjs "Danaus plexippus"
const UA = "wildlife-game-build/0.3 (photo search script)";
const ALLOWED = /^(cc0|public domain|pd\b|cc by( |-)\d|cc by-sa( |-)\d)/i;
const q = process.argv.slice(2).join(" ");
const url = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({
  format: "json", origin: "*", action: "query", generator: "search", gsrsearch: `${q} filetype:bitmap`, gsrnamespace: "6", gsrlimit: "40",
  prop: "imageinfo", iiprop: "size|extmetadata"
});
const res = await (await fetch(url, { headers: { "User-Agent": UA } })).json();
const strip = (h) => (h || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
for (const p of Object.values(res.query?.pages || {}).sort((a, b) => a.index - b.index)) {
  const i = p.imageinfo?.[0];
  if (!i) continue;
  const lic = strip(i.extmetadata?.LicenseShortName?.value);
  if (!ALLOWED.test(lic) || i.width < 1600 || i.width < i.height) continue;
  const quality = /Featured|Quality|Valued/i.test(i.extmetadata?.Assessments?.value || "") ? "*" : " ";
  console.log(`${quality} ${p.title} | ${lic} | ${i.width}x${i.height} | ${strip(i.extmetadata?.Artist?.value).slice(0, 30)}`);
}
