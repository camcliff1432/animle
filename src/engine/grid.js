// The round 3 map grid: equal-area hexagonal cells covering the whole world.
// Pure geometry (no DOM), shared by the map, the scoring and the tests.
//
// The grid lives in a fixed "map space" of MAP_W x MAP_H units, an Equal Earth
// projection of the globe. Because that projection preserves area, every cell
// covers the same amount of the Earth's surface (about 260,000 km2).
import { geoEqualEarth } from "d3-geo";

export const MAP_W = 1000;
export const HEX_R = 8;                       // centre-to-corner, in map units
const SQRT3 = Math.sqrt(3);

export const projection = geoEqualEarth().fitWidth(MAP_W, { type: "Sphere" });
export const MAP_H = Math.ceil(projection([0, -90])[1]);

/** Map units -> [lat, lng], or null outside the globe's outline. */
export function unproject(x, y) {
  const ll = projection.invert([x, y]);
  if (!ll || !Number.isFinite(ll[0]) || !Number.isFinite(ll[1])) return null;
  if (Math.abs(ll[1]) > 90 || Math.abs(ll[0]) > 180) return null;
  const back = projection(ll);
  if (Math.hypot(back[0] - x, back[1] - y) > 0.5) return null;
  return [ll[1], ll[0]];
}
export const project = (lat, lng) => projection([lng, lat]);

// Pointy-top hexagons in axial (q, r) coordinates.
const centreOf = (q, r) => [HEX_R * SQRT3 * (q + r / 2), HEX_R * 1.5 * r];
const key = (q, r) => `${q},${r}`;

function axialRound(fq, fr) {
  let q = Math.round(fq), r = Math.round(fr);
  const s = Math.round(-fq - fr);
  const dq = Math.abs(q - fq), dr = Math.abs(r - fr), ds = Math.abs(s + fq + fr);
  if (dq > dr && dq > ds) q = -r - s;
  else if (dr > ds) r = -q - s;
  return [q, r];
}

/** cells[id] = { id, q, r, x, y, lat, lng } */
export const cells = [];
const idByKey = new Map();
{
  const rows = Math.ceil(MAP_H / (HEX_R * 1.5)) + 1;
  const cols = Math.ceil(MAP_W / (HEX_R * SQRT3)) + 1;
  for (let r = 0; r <= rows; r++) {
    for (let col = -1; col <= cols; col++) {
      const q = col - Math.floor(r / 2);
      const [x, y] = centreOf(q, r);
      const ll = unproject(x, y);
      if (!ll) continue;
      idByKey.set(key(q, r), cells.length);
      cells.push({ id: cells.length, q, r, x, y, lat: ll[0], lng: ll[1] });
    }
  }
}

const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, -1], [-1, 1]];
const neighbourCache = new Map();

/** Ids of the cells touching a cell. */
export function neighbours(id) {
  let list = neighbourCache.get(id);
  if (!list) {
    const { q, r } = cells[id];
    list = DIRS.map(([dq, dr]) => idByKey.get(key(q + dq, r + dr))).filter(n => n !== undefined);
    neighbourCache.set(id, list);
  }
  return list;
}

/** The cell under a point in map units, or -1. */
export function cellAt(x, y) {
  const fq = (SQRT3 / 3 * x - y / 3) / HEX_R;
  const fr = (2 / 3 * y) / HEX_R;
  const [q, r] = axialRound(fq, fr);
  return idByKey.get(key(q, r)) ?? -1;
}
export function cellAtLatLng(lat, lng) {
  const p = project(lat, lng);
  return p ? cellAt(p[0], p[1]) : -1;
}

/** Corner points of a cell, in map units. */
export function corners(id) {
  const { x, y } = cells[id];
  return Array.from({ length: 6 }, (_, i) => {
    const a = Math.PI / 180 * (60 * i - 30);
    return [x + HEX_R * Math.cos(a), y + HEX_R * Math.sin(a)];
  });
}
export const cellPath = (id) => "M" + corners(id).map(p => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join("L") + "Z";

/** The neighbour to step to for an arrow key, or the same cell at the map's edge. */
export function step(id, direction) {
  const { q, r } = cells[id];
  const odd = Math.abs(r) % 2 === 1;
  const moves = {
    left: [-1, 0], right: [1, 0],
    up: odd ? [1, -1] : [0, -1],
    down: odd ? [0, 1] : [-1, 1]
  };
  const [dq, dr] = moves[direction];
  return idByKey.get(key(q + dq, r + dr)) ?? id;
}

export function isPointInPolygon(lat, lng, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect = ((yi > lng) !== (yj > lng)) &&
      (lat < (xj - xi) * (lng - yi) / ((yj - yi) || 1e-12) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Sample points spread across a hexagon: the centre and two rings.
const SAMPLE_OFFSETS = [[0, 0]];
for (const [ring, n] of [[0.45, 6], [0.8, 12]]) {
  for (let i = 0; i < n; i++) {
    const a = (2 * Math.PI * i) / n;
    SAMPLE_OFFSETS.push([ring * HEX_R * Math.cos(a), ring * HEX_R * Math.sin(a)]);
  }
}

/**
 * Turn range polygons ([lat, lng] rings) into cell ids. A cell belongs to the
 * range when at least a fifth of it is covered. Ranges smaller than a cell
 * (a lake, an island) still claim the cell they sit in.
 */
export function cellsForPolygons(polygons) {
  const out = new Set();
  for (const ring of polygons) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const [lat, lng] of ring) {
      const [x, y] = project(lat, lng);
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
    let found = false;
    for (const cell of cells) {
      if (cell.x < minX - HEX_R || cell.x > maxX + HEX_R || cell.y < minY - HEX_R || cell.y > maxY + HEX_R) continue;
      let inside = 0;
      for (const [dx, dy] of SAMPLE_OFFSETS) {
        const ll = unproject(cell.x + dx, cell.y + dy);
        if (ll && isPointInPolygon(ll[0], ll[1], ring)) inside++;
      }
      if (inside / SAMPLE_OFFSETS.length >= 0.2) { out.add(cell.id); found = true; }
    }
    if (!found) {
      const lat = ring.reduce((s, p) => s + p[0], 0) / ring.length;
      const lng = ring.reduce((s, p) => s + p[1], 0) / ring.length;
      const id = cellAtLatLng(lat, lng);
      if (id >= 0) out.add(id);
    }
  }
  return [...out].sort((a, b) => a - b);
}

/** Smallest gap between two sets of cells, measured in cell widths. */
export function cellDistance(a, b) {
  let best = Infinity;
  for (const i of a) for (const j of b) {
    const d = Math.hypot(cells[i].x - cells[j].x, cells[i].y - cells[j].y);
    if (d < best) best = d;
  }
  return best / (HEX_R * SQRT3);
}

/** "12°S 45°E" for a cell, for screen readers and the on-map readout. */
export function describePosition(id) {
  const { lat, lng } = cells[id];
  const ns = lat >= 0 ? "N" : "S", ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(Math.round(lat))}°${ns} ${Math.abs(Math.round(lng))}°${ew}`;
}
