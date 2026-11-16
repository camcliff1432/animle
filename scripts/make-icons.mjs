// Renders the app icons and the social preview image from SVG. Run: npm run icons
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const mark = (inset) => `
  <g transform="translate(${inset} ${inset}) scale(${(64 - inset * 2) / 64})">
    <circle cx="32" cy="32" r="19" fill="none" stroke="#e3f1ea" stroke-width="3"/>
    <path d="M41 23 L35.5 35.5 L23 41 L28.5 28.5 Z" fill="#f59e0b"/>
    <circle cx="32" cy="32" r="2.6" fill="#153124"/>
  </g>`;
const icon = (radius, inset) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${radius}" fill="#153124"/>${mark(inset)}</svg>`
);
const og = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#153124"/>
  <rect x="40" y="40" width="1120" height="550" rx="36" fill="#0d1f17" stroke="#275c44" stroke-width="3"/>
  <g transform="translate(110 215) scale(3.1)">${mark(0)}</g>
  <text x="350" y="285" font-family="Georgia, serif" font-size="104" font-weight="700" fill="#fcfaf5">Animle</text>
  <text x="352" y="350" font-family="Arial, sans-serif" font-size="38" fill="#a7f3d0">The daily wildlife challenge</text>
  <text x="352" y="420" font-family="Arial, sans-serif" font-size="30" fill="#e3f1ea">Name the animal · Estimate its numbers · Paint its range</text>
</svg>`);

await mkdir("public/icons", { recursive: true });
await sharp(icon(14, 0), { density: 600 }).resize(192, 192).png().toFile("public/icons/icon-192.png");
await sharp(icon(14, 0), { density: 900 }).resize(512, 512).png().toFile("public/icons/icon-512.png");
await sharp(icon(0, 9), { density: 900 }).resize(512, 512).png().toFile("public/icons/icon-512-maskable.png");
await sharp(icon(0, 6), { density: 600 }).resize(180, 180).png().toFile("public/icons/apple-touch-icon.png");
await sharp(og, { density: 150 }).resize(1200, 630).png().toFile("public/og-image.png");
console.log("icons written");
