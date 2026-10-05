import worldLand from "@/lib/worldLand.json";

const DEG = Math.PI / 180;

export const GLOBE_CENTER_LON = 18;
export const GLOBE_CENTER_LAT = 2;
/** Wall-clock milliseconds for one 360° longitude revolution (~8°/s). */
export const GLOBE_PERIOD_FALLBACK_MS = 45_000;
export const GLOBE_TURN_DEG = 360;
/** Cap rAF gaps so scroll/tab stalls cannot burst the spin. */
export const GLOBE_MAX_FRAME_MS = 48;

const LAND_FILL = "#84909E";
const LAND_DARK = "#5C6673";
const LAND_LIGHT = "#9AA3AE";
const GRID_STROKE = "rgba(154, 163, 174, 0.28)";
const MARKER_FILL = "rgba(224, 68, 46, 0.92)";
const MARKER_RING = "rgba(224, 68, 46, 0.45)";
const RIM_STROKE = "rgba(154, 163, 174, 0.16)";

const MARKERS: ReadonlyArray<readonly [number, number]> = [
  [7.51, 9.1],
  [3.39, 6.5],
  [36.81, -1.3],
  [-46.62, -23.51],
  [28.01, 41.01],
  [55.3, 25.19],
];

const DENSIFY_STEP_RAD = 2.5 * DEG;
const VISIBLE_EPS = 1e-5;
const ARC_STEP_RAD = 3 * DEG;

type LandFile = {
  polygons: number[][][];
};

type Vec = {
  x: number;
  y: number;
  z: number;
  lon: number;
  lat: number;
};

type Point = { x: number; y: number };

const land = worldLand as LandFile;

/** Parse a CSS duration token (`45s`, `45000ms`, or unitless seconds). */
export function parseCssDurationMs(raw: string, fallbackMs: number): number {
  const value = raw.trim().toLowerCase();
  if (!value) {
    return fallbackMs;
  }
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n) || n <= 0) {
    return fallbackMs;
  }
  if (value.endsWith("ms")) {
    return n;
  }
  if (value.endsWith("s")) {
    return n * 1000;
  }
  return n <= 180 ? n * 1000 : n;
}

export function globePeriodMs(): number {
  if (typeof window === "undefined") {
    return GLOBE_PERIOD_FALLBACK_MS;
  }
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--motion-globe")
    .trim();
  const parsed = parseCssDurationMs(raw, GLOBE_PERIOD_FALLBACK_MS);
  if (parsed < 8_000 || parsed > 120_000) {
    return GLOBE_PERIOD_FALLBACK_MS;
  }
  return parsed;
}

export function wrapLon(lon: number): number {
  let value = lon;
  while (value > 180) {
    value -= 360;
  }
  while (value < -180) {
    value += 360;
  }
  return value;
}

function xyz(lonDeg: number, latDeg: number): Vec {
  const lambda = lonDeg * DEG;
  const phi = latDeg * DEG;
  const cosPhi = Math.cos(phi);
  return {
    x: cosPhi * Math.cos(lambda),
    y: cosPhi * Math.sin(lambda),
    z: Math.sin(phi),
    lon: lonDeg,
    lat: latDeg,
  };
}

function lonLatFromXyz(
  x: number,
  y: number,
  z: number,
): { lon: number; lat: number } {
  return {
    lon: Math.atan2(y, x) / DEG,
    lat: Math.asin(Math.max(-1, Math.min(1, z))) / DEG,
  };
}

function normalize(x: number, y: number, z: number): Vec {
  const n = Math.hypot(x, y, z) || 1;
  const nx = x / n;
  const ny = y / n;
  const nz = z / n;
  const ll = lonLatFromXyz(nx, ny, nz);
  return { x: nx, y: ny, z: nz, lon: ll.lon, lat: ll.lat };
}

function dot(a: Vec, b: Vec): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function slerp(a: Vec, b: Vec, t: number): Vec {
  const clamped = Math.max(-1, Math.min(1, dot(a, b)));
  const ang = Math.acos(clamped);
  const sinAng = Math.sin(ang);
  if (sinAng < 1e-6) {
    return normalize(
      a.x + (b.x - a.x) * t,
      a.y + (b.y - a.y) * t,
      a.z + (b.z - a.z) * t,
    );
  }
  const wa = Math.sin((1 - t) * ang) / sinAng;
  const wb = Math.sin(t * ang) / sinAng;
  return normalize(a.x * wa + b.x * wb, a.y * wa + b.y * wb, a.z * wa + b.z * wb);
}

function ringAt(ring: number[], index: number): { lon: number; lat: number } | null {
  const n = ring.length / 2;
  if (n < 1) {
    return null;
  }
  const i = ((index % n) + n) % n;
  const lon = ring[i * 2];
  const lat = ring[i * 2 + 1];
  if (lon === undefined || lat === undefined) {
    return null;
  }
  return { lon, lat };
}

function shortestDLon(lon1: number, lon2: number): number {
  let d = lon2 - lon1;
  if (d > 180) {
    d -= 360;
  } else if (d < -180) {
    d += 360;
  }
  return d;
}

function canonicalizeAntimeridian(ring: number[]): number[] {
  const out = ring.slice();
  for (let i = 0; i < out.length; i += 2) {
    if (out[i] === 180) {
      out[i] = -180;
    }
  }
  return out;
}

function isDatelineJump(lon1: number, lon2: number): boolean {
  const d = shortestDLon(lon1, lon2);
  if (Math.abs(d) < 1e-4) {
    return false;
  }
  return Math.abs(lon2 - lon1) > 180;
}

function cutLat(lon1: number, lat1: number, lon2: number, lat2: number): number {
  const d = shortestDLon(lon1, lon2);
  const dest = lon1 + d;
  const cutLon = dest > 0 ? 180 : -180;
  const t = Math.abs(d) < 1e-9 ? 0 : (cutLon - lon1) / d;
  return lat1 + (lat2 - lat1) * Math.max(0, Math.min(1, t));
}

/** Split rings that jump ±180° so fill never spans the date line as a chord. */
export function splitClosedRing(ring: number[]): number[][] {
  if (ring.length < 6) {
    return [];
  }
  const canon = canonicalizeAntimeridian(ring);
  const n = canon.length / 2;
  const jumps: number[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = ringAt(canon, i);
    const b = ringAt(canon, i + 1);
    if (a && b && isDatelineJump(a.lon, b.lon)) {
      jumps.push(i);
    }
  }
  if (jumps.length === 0) {
    return [canon];
  }

  const rings: number[][] = [];
  for (let j = 0; j < jumps.length; j += 1) {
    const jumpStart = jumps[j];
    const nextJump = jumps[(j + 1) % jumps.length];
    if (jumpStart === undefined || nextJump === undefined) {
      continue;
    }
    const start = (jumpStart + 1) % n;
    const enter = ringAt(canon, jumpStart);
    const enterNext = ringAt(canon, jumpStart + 1);
    const first = ringAt(canon, start);
    const exitPt = ringAt(canon, nextJump);
    const exitNext = ringAt(canon, nextJump + 1);
    if (!enter || !enterNext || !first || !exitPt || !exitNext) {
      continue;
    }
    const enterLon = first.lon >= 0 ? 180 : -180;
    const exitLon = exitPt.lon >= 0 ? 180 : -180;
    const out: number[] = [
      enterLon,
      cutLat(enter.lon, enter.lat, enterNext.lon, enterNext.lat),
    ];
    let i = start;
    let guard = 0;
    while (guard <= n) {
      const pt = ringAt(canon, i);
      if (!pt) {
        break;
      }
      out.push(pt.lon, pt.lat);
      if (i === nextJump) {
        break;
      }
      i = (i + 1) % n;
      guard += 1;
    }
    out.push(exitLon, cutLat(exitPt.lon, exitPt.lat, exitNext.lon, exitNext.lat));
    if (out.length >= 6 && ringLonSpan(out) >= 0.05) {
      rings.push(out);
    }
  }
  return rings.length > 0 ? rings : [canon];
}

function ringLonSpan(ring: number[]): number {
  let minLon = 180;
  let maxLon = -180;
  for (let i = 0; i < ring.length; i += 2) {
    const lon = ring[i];
    if (lon === undefined) {
      continue;
    }
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
  }
  return maxLon - minLon;
}

function holeInOuter(outer: number[], hole: number[]): boolean {
  const lon = hole[0];
  const lat = hole[1];
  if (lon === undefined || lat === undefined) {
    return false;
  }
  let minLon = 180;
  let maxLon = -180;
  let minLat = 90;
  let maxLat = -90;
  for (let i = 0; i < outer.length; i += 2) {
    const olon = outer[i];
    const olat = outer[i + 1];
    if (olon === undefined || olat === undefined) {
      continue;
    }
    minLon = Math.min(minLon, olon);
    maxLon = Math.max(maxLon, olon);
    minLat = Math.min(minLat, olat);
    maxLat = Math.max(maxLat, olat);
  }
  return lon >= minLon && lon <= maxLon && lat >= minLat && lat <= maxLat;
}

function preprocessLand(polygons: number[][][]): number[][][] {
  const out: number[][][] = [];
  for (const polygon of polygons) {
    const outer = polygon[0];
    if (!outer) {
      continue;
    }
    const splitOuters = splitClosedRing(outer)
      .map(densifyRing)
      .filter((piece) => piece.length >= 6 && ringLonSpan(piece) >= 0.05);
    const splitHoles = polygon
      .slice(1)
      .flatMap((hole) => splitClosedRing(hole))
      .map(densifyRing);
    for (const piece of splitOuters) {
      const holes = splitHoles.filter((hole) => holeInOuter(piece, hole));
      out.push([piece, ...holes]);
    }
  }
  return out;
}

function densifyRing(ring: number[]): number[] {
  if (ring.length < 6) {
    return ring.slice();
  }
  const n = ring.length / 2;
  const out: number[] = [];
  for (let i = 0; i < n; i += 1) {
    const lon1 = ring[i * 2];
    const lat1 = ring[i * 2 + 1];
    const lon2 = ring[((i + 1) % n) * 2];
    const lat2 = ring[((i + 1) % n) * 2 + 1];
    if (
      lon1 === undefined ||
      lat1 === undefined ||
      lon2 === undefined ||
      lat2 === undefined
    ) {
      continue;
    }
    out.push(lon1, lat1);
    const a = xyz(lon1, lat1);
    const b = xyz(lon2, lat2);
    const ang = Math.acos(Math.max(-1, Math.min(1, dot(a, b))));
    const steps = Math.ceil(ang / DENSIFY_STEP_RAD);
    for (let s = 1; s < steps; s += 1) {
      const p = slerp(a, b, s / steps);
      out.push(p.lon, p.lat);
    }
  }
  return out;
}

const densifiedPolygons: number[][][] = preprocessLand(land.polygons);

function interpolateHorizon(a: Vec, b: Vec, view: Vec): Vec {
  const da = dot(a, view);
  const db = dot(b, view);
  const denom = da - db;
  const t = Math.abs(denom) < 1e-9 ? 0.5 : da / denom;
  return normalize(
    a.x + (b.x - a.x) * t,
    a.y + (b.y - a.y) * t,
    a.z + (b.z - a.z) * t,
  );
}

function clipRingToHemisphere(ring: number[], view: Vec): number[][] {
  const n = ring.length / 2;
  if (n < 3) {
    return [];
  }
  const pts: Vec[] = [];
  for (let i = 0; i < n; i += 1) {
    const lon = ring[i * 2];
    const lat = ring[i * 2 + 1];
    if (lon === undefined || lat === undefined) {
      return [];
    }
    pts.push(xyz(lon, lat));
  }
  const vis = pts.map((p) => dot(p, view) >= -VISIBLE_EPS);
  const chains: number[][] = [];
  let chain: number[] | null = null;

  const push = (target: number[], p: Vec): void => {
    const lastLon = target[target.length - 2];
    const lastLat = target[target.length - 1];
    if (
      lastLon !== undefined &&
      lastLat !== undefined &&
      Math.abs(lastLon - p.lon) < 1e-6 &&
      Math.abs(lastLat - p.lat) < 1e-6
    ) {
      return;
    }
    target.push(p.lon, p.lat);
  };

  for (let i = 0; i < n; i += 1) {
    const a = pts[i];
    const b = pts[(i + 1) % n];
    const aIn = vis[i];
    const bIn = vis[(i + 1) % n];
    if (!a || !b || aIn === undefined || bIn === undefined) {
      continue;
    }
    if (aIn && bIn) {
      if (!chain) {
        chain = [];
        push(chain, a);
      }
      push(chain, b);
    } else if (aIn && !bIn) {
      if (!chain) {
        chain = [];
        push(chain, a);
      }
      push(chain, interpolateHorizon(a, b, view));
      chains.push(chain);
      chain = null;
    } else if (!aIn && bIn) {
      chain = [];
      push(chain, interpolateHorizon(a, b, view));
      push(chain, b);
    }
  }

  if (chain) {
    if (chains.length > 0 && vis[0]) {
      const first = chains[0];
      if (first) {
        chains[0] = chain.concat(first);
      }
    } else {
      chains.push(chain);
    }
  }

  return chains.filter((c) => c.length >= 6);
}

function cosineToCenter(
  lonDeg: number,
  latDeg: number,
  lambda0: number,
  phi0: number,
): number {
  const lambda = lonDeg * DEG;
  const phi = latDeg * DEG;
  const dLambda = lambda - lambda0;
  return (
    Math.sin(phi0) * Math.sin(phi) +
    Math.cos(phi0) * Math.cos(phi) * Math.cos(dLambda)
  );
}

function project(
  lonDeg: number,
  latDeg: number,
  lambda0: number,
  phi0: number,
  cx: number,
  cy: number,
  radius: number,
): Point | null {
  const lambda = lonDeg * DEG;
  const phi = latDeg * DEG;
  const dLambda = lambda - lambda0;
  const cosc =
    Math.sin(phi0) * Math.sin(phi) +
    Math.cos(phi0) * Math.cos(phi) * Math.cos(dLambda);
  if (cosc < -0.0008) {
    return null;
  }
  const x = radius * Math.cos(phi) * Math.sin(dLambda);
  const y =
    radius *
    (Math.cos(phi0) * Math.sin(phi) -
      Math.sin(phi0) * Math.cos(phi) * Math.cos(dLambda));
  return { x: cx + x, y: cy - y };
}

function nearLimb(pt: Point, cx: number, cy: number, radius: number): boolean {
  return Math.abs(Math.hypot(pt.x - cx, pt.y - cy) - radius) < radius * 0.04;
}

function sampleArc(
  from: Point,
  to: Point,
  cx: number,
  cy: number,
  radius: number,
  longWay: boolean,
): Point[] {
  const a0 = Math.atan2(from.y - cy, from.x - cx);
  const a1 = Math.atan2(to.y - cy, to.x - cx);
  let delta = a1 - a0;
  if (delta > Math.PI) {
    delta -= 2 * Math.PI;
  } else if (delta < -Math.PI) {
    delta += 2 * Math.PI;
  }
  if (longWay) {
    delta += delta > 0 ? -2 * Math.PI : 2 * Math.PI;
  }
  if (Math.abs(delta) < 0.01) {
    return [];
  }
  const steps = Math.max(1, Math.ceil(Math.abs(delta) / ARC_STEP_RAD));
  const pts: Point[] = [];
  for (let i = 1; i <= steps; i += 1) {
    const a = a0 + (delta * i) / steps;
    pts.push({
      x: cx + radius * Math.cos(a),
      y: cy + radius * Math.sin(a),
    });
  }
  return pts;
}

function pathContains(
  points: readonly Point[],
  x: number,
  y: number,
): boolean {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
    const pi = points[i];
    const pj = points[j];
    if (!pi || !pj) {
      continue;
    }
    const denom = pj.y - pi.y;
    if ((pi.y > y) !== (pj.y > y) && denom !== 0) {
      const xInt = ((pj.x - pi.x) * (y - pi.y)) / denom + pi.x;
      if (x < xInt) {
        inside = !inside;
      }
    }
  }
  return inside;
}

function chainWinding(
  points: readonly Point[],
  cx: number,
  cy: number,
): number {
  let sum = 0;
  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    if (!a || !b) {
      continue;
    }
    const a0 = Math.atan2(a.y - cy, a.x - cx);
    const a1 = Math.atan2(b.y - cy, b.x - cx);
    let delta = a1 - a0;
    if (delta > Math.PI) {
      delta -= 2 * Math.PI;
    } else if (delta < -Math.PI) {
      delta += 2 * Math.PI;
    }
    sum += delta;
  }
  return sum;
}

function closedChain(
  chainPts: Point[],
  cx: number,
  cy: number,
  radius: number,
): Point[] {
  const first = chainPts[0];
  const last = chainPts[chainPts.length - 1];
  if (!first || !last) {
    return chainPts;
  }
  if (Math.hypot(first.x - last.x, first.y - last.y) < radius * 0.004) {
    return chainPts;
  }
  if (!nearLimb(first, cx, cy, radius) || !nearLimb(last, cx, cy, radius)) {
    return chainPts;
  }

  const wantCenterInside = Math.abs(chainWinding(chainPts, cx, cy)) > Math.PI;
  const shortArc = sampleArc(last, first, cx, cy, radius, false);
  const longArc = sampleArc(last, first, cx, cy, radius, true);
  const shortPath = chainPts.concat(shortArc);
  const longPath = chainPts.concat(longArc);
  const shortHasCenter = pathContains(shortPath, cx, cy);
  const longHasCenter = pathContains(longPath, cx, cy);

  if (shortHasCenter === wantCenterInside && longHasCenter !== wantCenterInside) {
    return shortPath;
  }
  if (longHasCenter === wantCenterInside && shortHasCenter !== wantCenterInside) {
    return longPath;
  }
  return wantCenterInside
    ? shortHasCenter
      ? shortPath
      : longPath
    : shortHasCenter
      ? longPath
      : shortPath;
}

function traceChain(
  ctx: CanvasRenderingContext2D,
  chain: number[],
  lambda0: number,
  phi0: number,
  cx: number,
  cy: number,
  radius: number,
): boolean {
  const pts: Point[] = [];
  for (let i = 0; i < chain.length; i += 2) {
    const lon = chain[i];
    const lat = chain[i + 1];
    if (lon === undefined || lat === undefined) {
      continue;
    }
    const pt = project(lon, lat, lambda0, phi0, cx, cy, radius);
    if (!pt) {
      continue;
    }
    const prev = pts[pts.length - 1];
    if (prev && Math.hypot(pt.x - prev.x, pt.y - prev.y) < 0.15) {
      continue;
    }
    pts.push(pt);
  }
  if (pts.length < 3) {
    return false;
  }
  const closed = closedChain(pts, cx, cy, radius);
  const start = closed[0];
  if (!start) {
    return false;
  }
  ctx.moveTo(start.x, start.y);
  for (let i = 1; i < closed.length; i += 1) {
    const pt = closed[i];
    if (pt) {
      ctx.lineTo(pt.x, pt.y);
    }
  }
  ctx.closePath();
  return true;
}

function drawLand(
  ctx: CanvasRenderingContext2D,
  lambda0: number,
  phi0: number,
  cx: number,
  cy: number,
  radius: number,
  centerLonDeg: number,
  centerLatDeg: number,
): void {
  const view = xyz(centerLonDeg, centerLatDeg);

  for (const polygon of densifiedPolygons) {
    if (!polygon || polygon.length === 0) {
      continue;
    }
    ctx.beginPath();
    let any = false;
    for (const ring of polygon) {
      const chains = clipRingToHemisphere(ring, view);
      for (const chain of chains) {
        any =
          traceChain(ctx, chain, lambda0, phi0, cx, cy, radius) || any;
      }
    }
    if (!any) {
      continue;
    }

    const sample = polygon[0];
    const sampleLat = sample?.[1] ?? 0;
    if (sampleLat > 55) {
      ctx.fillStyle = LAND_LIGHT;
    } else if (sampleLat < -20) {
      ctx.fillStyle = LAND_DARK;
    } else {
      ctx.fillStyle = LAND_FILL;
    }
    ctx.fill("evenodd");
  }
}

function drawGraticule(
  ctx: CanvasRenderingContext2D,
  lambda0: number,
  phi0: number,
  cx: number,
  cy: number,
  radius: number,
): void {
  ctx.strokeStyle = GRID_STROKE;
  ctx.lineWidth = Math.max(0.7, radius * 0.0023);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const step = 2;

  for (let lon = -180; lon < 180; lon += 30) {
    ctx.beginPath();
    let drawing = false;
    let prev: Point | null = null;
    for (let lat = -90; lat <= 90; lat += step) {
      const pt = project(lon, lat, lambda0, phi0, cx, cy, radius);
      if (!pt) {
        drawing = false;
        prev = null;
        continue;
      }
      if (prev && Math.hypot(pt.x - prev.x, pt.y - prev.y) > radius * 0.2) {
        drawing = false;
      }
      if (drawing) {
        ctx.lineTo(pt.x, pt.y);
      } else {
        ctx.moveTo(pt.x, pt.y);
        drawing = true;
      }
      prev = pt;
    }
    ctx.stroke();
  }

  for (let lat = -60; lat <= 60; lat += 30) {
    ctx.beginPath();
    let drawing = false;
    let prev: Point | null = null;
    for (let lon = -180; lon <= 180; lon += step) {
      const pt = project(lon, lat, lambda0, phi0, cx, cy, radius);
      if (!pt) {
        drawing = false;
        prev = null;
        continue;
      }
      if (prev && Math.hypot(pt.x - prev.x, pt.y - prev.y) > radius * 0.2) {
        drawing = false;
      }
      if (drawing) {
        ctx.lineTo(pt.x, pt.y);
      } else {
        ctx.moveTo(pt.x, pt.y);
        drawing = true;
      }
      prev = pt;
    }
    ctx.stroke();
  }
}

function drawMarkers(
  ctx: CanvasRenderingContext2D,
  lambda0: number,
  phi0: number,
  cx: number,
  cy: number,
  radius: number,
): void {
  const core = Math.max(2.8, radius * (6 / 372));
  const ring = Math.max(5.8, radius * (12.5 / 372));
  ctx.lineWidth = Math.max(1, radius * (1.2 / 372));

  for (const [lon, lat] of MARKERS) {
    const pt = project(lon, lat, lambda0, phi0, cx, cy, radius);
    if (!pt) {
      continue;
    }
    if (cosineToCenter(lon, lat, lambda0, phi0) < 0.12) {
      continue;
    }
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, ring, 0, Math.PI * 2);
    ctx.strokeStyle = MARKER_RING;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, core, 0, Math.PI * 2);
    ctx.fillStyle = MARKER_FILL;
    ctx.fill();
  }
}

function drawOcean(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
): void {
  const gradient = ctx.createRadialGradient(
    cx - radius * 0.18,
    cy - radius * 0.22,
    radius * 0.08,
    cx,
    cy,
    radius,
  );
  gradient.addColorStop(0, "#1A2432");
  gradient.addColorStop(0.5, "#141B26");
  gradient.addColorStop(1, "#0F141C");

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.strokeStyle = RIM_STROKE;
  ctx.lineWidth = Math.max(1, radius * 0.0032);
  ctx.stroke();
}

export function drawOrthographicGlobe(
  ctx: CanvasRenderingContext2D,
  size: number,
  centerLonDeg: number,
  centerLatDeg: number,
): void {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.465;
  const lambda0 = centerLonDeg * DEG;
  const phi0 = centerLatDeg * DEG;

  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();

  drawOcean(ctx, cx, cy, radius);
  drawGraticule(ctx, lambda0, phi0, cx, cy, radius);
  drawLand(
    ctx,
    lambda0,
    phi0,
    cx,
    cy,
    radius,
    wrapLon(centerLonDeg),
    centerLatDeg,
  );
  drawMarkers(ctx, lambda0, phi0, cx, cy, radius);

  ctx.restore();
}
