// Round 3 map: a world map covered in equal-area hexagonal cells that the
// player paints. Works with a finger, a mouse or the keyboard.
import { select, pointer } from "d3-selection";
import { zoom as d3zoom, zoomIdentity, zoomTransform } from "d3-zoom";
import "d3-transition";
import { geoPath, geoGraticule10, geoContains } from "d3-geo";
import { feature } from "topojson-client";
import worldTopo from "world-atlas/countries-110m.json";
import {
  MAP_W, MAP_H, HEX_R, projection, cells, cellAt, cellPath, step, describePosition, cellAtLatLng
} from "./engine/grid.js";

const countries = feature(worldTopo, worldTopo.objects.countries);
const MAX_ZOOM = 14;

/** Preset views: [west, south, east, north] in degrees. */
export const REGIONS = {
  world: null,
  "north-america": [-168, 7, -52, 72],
  "south-america": [-82, -56, -34, 13],
  europe: [-25, 35, 45, 71],
  africa: [-18, -35, 52, 38],
  asia: [45, 5, 150, 75],
  oceania: [110, -48, 180, 0],
  arctic: [-180, 58, 180, 85]
};

const placeCache = new Map();
/** The country a cell's centre falls in, or "open sea". */
export function placeName(id) {
  if (!placeCache.has(id)) {
    const { lat, lng } = cells[id];
    const hit = countries.features.find(f => geoContains(f, [lng, lat]));
    placeCache.set(id, hit ? hit.properties.name : "open sea");
  }
  return placeCache.get(id);
}

export function createHabitatMap({ container, svgEl, onChange, announce }) {
  let svg = null, g = null, zoomBehavior = null;
  let k = 1;
  let mode = "paint";           // "paint" | "erase" | "move"
  let locked = false;
  let spaceHeld = false;
  let painted = new Set();
  let target = new Set();
  let strokes = [];             // undo history: [{ added: [ids], removed: [ids] }]
  let stroke = null;            // the stroke in progress
  let cursor = -1;              // keyboard cursor cell
  const activePointers = new Set();

  const notify = () => onChange({ count: painted.size });
  const pathFor = (ids) => { let d = ""; for (const id of ids) d += cellPath(id); return d; };

  function render() {
    if (!g) return;
    const both = [], mine = [], theirs = [];
    for (const id of painted) (target.has(id) ? both : mine).push(id);
    for (const id of target) if (!painted.has(id)) theirs.push(id);
    g.select("#cells-mine").attr("d", pathFor(mine));
    g.select("#cells-target").attr("d", pathFor(theirs));
    g.select("#cells-both").attr("d", pathFor(both));
    g.select("#cell-cursor").attr("d", cursor >= 0 ? cellPath(cursor) : "").attr("visibility", cursor >= 0 ? "visible" : "hidden");
  }

  function applyCursorStyle() {
    const painting = !locked && mode !== "move" && !spaceHeld;
    container.style.cursor = painting ? "crosshair" : "grab";
  }

  function setCell(id, on) {
    if (id < 0 || painted.has(id) === on) return;
    if (on) painted.add(id); else painted.delete(id);
    if (stroke) (on ? stroke.added : stroke.removed).push(id);
  }

  function endStroke() {
    if (stroke && (stroke.added.length || stroke.removed.length)) {
      strokes.push(stroke);
      notify();
    }
    stroke = null;
  }

  function cancelStroke() {
    if (!stroke) return;
    for (const id of stroke.added) painted.delete(id);
    for (const id of stroke.removed) painted.add(id);
    stroke = null;
    render();
  }

  function fitBox(minX, minY, maxX, maxY, duration = 500, pad = 0.75) {
    if (!svg) return;
    const scale = Math.max(1, Math.min(MAX_ZOOM, pad / Math.max((maxX - minX) / MAP_W, (maxY - minY) / MAP_H, 0.02)));
    const t = zoomIdentity.translate(MAP_W / 2 - scale * (minX + maxX) / 2, MAP_H / 2 - scale * (minY + maxY) / 2).scale(scale);
    svg.transition().duration(duration).call(zoomBehavior.transform, t);
  }

  function fitToCells(ids, duration) {
    if (ids.length === 0) return;
    const xs = ids.map(id => cells[id].x), ys = ids.map(id => cells[id].y);
    fitBox(Math.min(...xs) - HEX_R, Math.min(...ys) - HEX_R, Math.max(...xs) + HEX_R, Math.max(...ys) + HEX_R, duration, 0.6);
  }

  function keepCursorInView() {
    if (cursor < 0 || !svg) return;
    const t = zoomTransform(svgEl);
    const sx = cells[cursor].x * t.k + t.x, sy = cells[cursor].y * t.k + t.y;
    const margin = 40;
    if (sx < margin || sx > MAP_W - margin || sy < margin || sy > MAP_H - margin) {
      const next = zoomIdentity.translate(MAP_W / 2 - t.k * cells[cursor].x, MAP_H / 2 - t.k * cells[cursor].y).scale(t.k);
      svg.transition().duration(200).call(zoomBehavior.transform, next);
    }
  }

  function describeCursor() {
    if (cursor < 0) return "";
    const state = locked
      ? (target.has(cursor) && painted.has(cursor) ? "your range and the true range"
        : target.has(cursor) ? "true range" : painted.has(cursor) ? "your range" : "empty")
      : (painted.has(cursor) ? "painted" : "not painted");
    return `${placeName(cursor)}, ${describePosition(cursor)}, ${state}`;
  }

  function moveCursor(direction) {
    if (cursor < 0) cursor = cellAtLatLng(10, 20);
    else cursor = step(cursor, direction);
    render();
    keepCursorInView();
    announce(describeCursor());
  }

  function toggleCursorCell() {
    if (locked || cursor < 0) return;
    stroke = { added: [], removed: [] };
    setCell(cursor, !painted.has(cursor));
    endStroke();
    render();
    announce(describeCursor());
  }

  function init({ savedCells = [], isLocked = false, targetCells = [] }) {
    painted = new Set(savedCells.filter(id => id >= 0 && id < cells.length));
    locked = isLocked;
    target = new Set(isLocked ? targetCells : []);
    strokes = [];
    stroke = null;
    cursor = -1;
    k = 1;

    svg = select(svgEl).attr("viewBox", `0 0 ${MAP_W} ${MAP_H}`).attr("preserveAspectRatio", "xMidYMid meet");
    svg.selectAll("*").remove();
    svg.on(".zoom", null);

    const path = geoPath().projection(projection);
    g = svg.append("g");
    g.append("path").datum({ type: "Sphere" }).attr("d", path).attr("fill", "#cfe4ec");
    g.append("path").datum(geoGraticule10()).attr("d", path)
      .attr("fill", "none").attr("stroke", "#b7d3df").attr("stroke-width", 0.6)
      .attr("vector-effect", "non-scaling-stroke");
    g.append("g").selectAll("path").data(countries.features).enter().append("path")
      .attr("d", path).attr("fill", "#e9e2d0").attr("stroke", "#a89b82").attr("stroke-width", 0.6)
      .attr("vector-effect", "non-scaling-stroke");
    // The cell mesh is drawn once; it fades in as the player zooms.
    g.append("path").attr("id", "cell-mesh").attr("d", pathFor(cells.map(c => c.id)))
      .attr("fill", "none").attr("stroke", "#6b5d48").attr("stroke-width", 0.5).attr("stroke-opacity", 0.16)
      .attr("vector-effect", "non-scaling-stroke").attr("pointer-events", "none");
    const layer = (id, fill, strokeColor, dash) => g.append("path").attr("id", id)
      .attr("fill", fill).attr("stroke", strokeColor).attr("stroke-width", 1.2)
      .attr("stroke-dasharray", dash || null)
      .attr("vector-effect", "non-scaling-stroke").attr("pointer-events", "none");
    layer("cells-target", "rgba(16, 185, 129, 0.45)", "#065f46", "4,3");
    layer("cells-mine", "rgba(217, 119, 6, 0.5)", "#b45309");
    layer("cells-both", "rgba(21, 94, 60, 0.78)", "#064e3b");
    g.append("path").attr("id", "cell-cursor").attr("fill", "none").attr("stroke", "#1d4ed8").attr("stroke-width", 3)
      .attr("vector-effect", "non-scaling-stroke").attr("pointer-events", "none").attr("visibility", "hidden");

    // One finger (or the left mouse button) paints; two fingers, the wheel,
    // right-drag, Space-drag or Move mode pan and zoom.
    zoomBehavior = d3zoom()
      .scaleExtent([1, MAX_ZOOM])
      .extent([[0, 0], [MAP_W, MAP_H]])
      .translateExtent([[-60, -40], [MAP_W + 60, MAP_H + 40]])
      .filter((event) => {
        if (event.type === "wheel") return true;
        if (locked || mode === "move" || spaceHeld) return true;
        return event.button === 2 || (event.touches && event.touches.length > 1);
      })
      .on("zoom", (event) => {
        k = event.transform.k;
        g.attr("transform", event.transform);
        g.select("#cell-mesh").attr("stroke-opacity", Math.min(0.5, 0.1 + 0.07 * k));
      });
    svg.call(zoomBehavior).on("dblclick.zoom", null);
    svg.on("contextmenu", (e) => e.preventDefault());

    const cellFrom = (event) => {
      const [x, y] = pointer(event, g.node());
      return cellAt(x, y);
    };
    const canPaint = () => !locked && mode !== "move" && !spaceHeld;

    svg.on("pointerdown", (event) => {
      activePointers.add(event.pointerId);
      // A second finger means the player is moving the map, not painting.
      if (activePointers.size > 1) { cancelStroke(); return; }
      if (!canPaint() || event.button !== 0) return;
      const id = cellFrom(event);
      if (id < 0) return;
      // In paint mode, starting on a painted cell erases instead: tap again to undo a cell.
      const on = mode === "erase" ? false : !painted.has(id);
      stroke = { added: [], removed: [], on };
      setCell(id, on);
      try { svgEl.setPointerCapture(event.pointerId); } catch { /* not supported */ }
      render();
    });
    svg.on("pointermove", (event) => {
      if (!stroke || activePointers.size > 1) return;
      const id = cellFrom(event);
      if (id < 0) return;
      setCell(id, stroke.on);
      render();
    });
    const endPointer = (event) => {
      activePointers.delete(event.pointerId);
      endStroke();
    };
    svg.on("pointerup", endPointer);
    svg.on("pointercancel", endPointer);

    applyCursorStyle();
    render();
    notify();
    if (locked) fitToCells([...target, ...painted], 0);
  }

  return {
    init,
    getCells: () => [...painted].sort((a, b) => a - b),
    getMode: () => mode,
    setMode(next) { mode = next; applyCursorStyle(); },
    setSpaceHeld(held) { spaceHeld = held; applyCursorStyle(); },
    undo() {
      if (locked) return;
      const last = strokes.pop();
      if (!last) return;
      for (const id of last.added) painted.delete(id);
      for (const id of last.removed) painted.add(id);
      render();
      notify();
    },
    clear() {
      if (locked || painted.size === 0) return;
      strokes.push({ added: [], removed: [...painted] });
      painted = new Set();
      render();
      notify();
    },
    reveal(targetCells) {
      locked = true;
      stroke = null;
      target = new Set(targetCells);
      applyCursorStyle();
      render();
      notify();
      fitToCells([...target, ...painted]);
    },
    zoomBy(factor) { if (svg) svg.transition().duration(250).call(zoomBehavior.scaleBy, factor); },
    panBy(dx, dy) { if (svg) svg.transition().duration(220).call(zoomBehavior.translateBy, dx / k, dy / k); },
    reset() { if (svg) svg.transition().duration(300).call(zoomBehavior.transform, zoomIdentity); },
    showRegion(name) {
      const box = REGIONS[name];
      if (!box) { this.reset(); return; }
      const [w, s, e, n] = box;
      const pts = [];
      for (let lng = w; lng <= e; lng += (e - w) / 8) for (const lat of [s, (s + n) / 2, n]) pts.push(projection([lng, lat]));
      const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
      fitBox(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys), 450, 0.95);
    },
    /** Keyboard control. Returns true when the key was used. */
    handleKey(event) {
      const arrows = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" };
      if (arrows[event.key]) { moveCursor(arrows[event.key]); return true; }
      if (event.key === " " || event.key === "Enter") { toggleCursorCell(); return true; }
      if (event.key === "+" || event.key === "=") { this.zoomBy(1.6); return true; }
      if (event.key === "-" || event.key === "_") { this.zoomBy(0.625); return true; }
      if (event.key === "0") { this.reset(); return true; }
      return false;
    },
    blurCursor() { cursor = -1; render(); }
  };
}
