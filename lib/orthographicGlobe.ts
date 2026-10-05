import worldLand from "@/lib/worldLand.json";

const DEG = Math.PI / 180;

export const GLOBE_CENTER_LON = 18;
export const GLOBE_CENTER_LAT = 2;
export const GLOBE_PERIOD_FALLBACK_MS = 32_000;

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

type LandFile = {
  polygons: number[][][];
};

const land = worldLand as LandFile;

export function globePeriodMs(): number {
  if (typeof window === "undefined") {
    return GLOBE_PERIOD_FALLBACK_MS;
  }
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--motion-globe")
    .trim();
  const seconds = Number.parseFloat(raw);
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return GLOBE_PERIOD_FALLBACK_MS;
  }
  return seconds * 1000;
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
): { x: number; y: number } | null {
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

function lerpLonLat(
  aLon: number,
  aLat: number,
  bLon: number,
  bLat: number,
  t: number,
): readonly [number, number] {
  let dLon = bLon - aLon;
  if (dLon > 180) {
    dLon -= 360;
  } else if (dLon < -180) {
    dLon += 360;
  }
  return [aLon + dLon * t, aLat + (bLat - aLat) * t];
}

function horizonPoint(
  visLon: number,
  visLat: number,
  hidLon: number,
  hidLat: number,
  lambda0: number,
  phi0: number,
  cx: number,
  cy: number,
  radius: number,
): { x: number; y: number } | null {
  let loLon = visLon;
  let loLat = visLat;
  let hiLon = hidLon;
  let hiLat = hidLat;
  for (let i = 0; i < 10; i += 1) {
    const [midLon, midLat] = lerpLonLat(loLon, loLat, hiLon, hiLat, 0.5);
    if (cosineToCenter(midLon, midLat, lambda0, phi0) >= 0) {
      loLon = midLon;
      loLat = midLat;
    } else {
      hiLon = midLon;
      hiLat = midLat;
    }
  }
  return project(loLon, loLat, lambda0, phi0, cx, cy, radius);
}

function traceRing(
  ctx: CanvasRenderingContext2D,
  ring: number[],
  lambda0: number,
  phi0: number,
  cx: number,
  cy: number,
  radius: number,
): boolean {
  if (ring.length < 6) {
    return false;
  }

  let started = false;
  let prevLon = ring[0];
  let prevLat = ring[1];
  if (prevLon === undefined || prevLat === undefined) {
    return false;
  }
  let prevPt = project(prevLon, prevLat, lambda0, phi0, cx, cy, radius);

  const firstLon = prevLon;
  const firstLat = prevLat;
  const firstPt = prevPt;

  const move = (x: number, y: number): void => {
    if (started) {
      ctx.lineTo(x, y);
      return;
    }
    ctx.moveTo(x, y);
    started = true;
  };

  for (let i = 2; i <= ring.length; i += 2) {
    const wrap = i === ring.length;
    const lon = wrap ? firstLon : ring[i];
    const lat = wrap ? firstLat : ring[i + 1];
    if (lon === undefined || lat === undefined) {
      continue;
    }

    let dLon = lon - prevLon;
    if (dLon > 180) {
      dLon -= 360;
    } else if (dLon < -180) {
      dLon += 360;
    }
    if (Math.abs(dLon) > 90) {
      prevLon = lon;
      prevLat = lat;
      prevPt = wrap
        ? firstPt
        : project(lon, lat, lambda0, phi0, cx, cy, radius);
      continue;
    }

    const pt = wrap
      ? firstPt
      : project(lon, lat, lambda0, phi0, cx, cy, radius);

    if (pt && prevPt) {
      if (
        Math.hypot(pt.x - prevPt.x, pt.y - prevPt.y) >
        radius * 1.15
      ) {
        prevLon = lon;
        prevLat = lat;
        prevPt = pt;
        continue;
      }
      move(pt.x, pt.y);
    } else if (pt && !prevPt) {
      const edge = horizonPoint(
        lon,
        lat,
        prevLon,
        prevLat,
        lambda0,
        phi0,
        cx,
        cy,
        radius,
      );
      if (edge) {
        move(edge.x, edge.y);
      }
      move(pt.x, pt.y);
    } else if (!pt && prevPt) {
      const edge = horizonPoint(
        prevLon,
        prevLat,
        lon,
        lat,
        lambda0,
        phi0,
        cx,
        cy,
        radius,
      );
      if (edge) {
        move(edge.x, edge.y);
      }
    }

    prevLon = lon;
    prevLat = lat;
    prevPt = pt;
  }

  if (started) {
    ctx.closePath();
  }
  return started;
}

function drawLand(
  ctx: CanvasRenderingContext2D,
  lambda0: number,
  phi0: number,
  cx: number,
  cy: number,
  radius: number,
): void {
  for (const polygon of land.polygons) {
    if (!polygon || polygon.length === 0) {
      continue;
    }
    ctx.beginPath();
    let any = false;
    for (const ring of polygon) {
      any = traceRing(ctx, ring, lambda0, phi0, cx, cy, radius) || any;
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
    let prev: { x: number; y: number } | null = null;
    for (let lat = -90; lat <= 90; lat += step) {
      const pt = project(lon, lat, lambda0, phi0, cx, cy, radius);
      if (!pt) {
        drawing = false;
        prev = null;
        continue;
      }
      if (
        prev &&
        Math.hypot(pt.x - prev.x, pt.y - prev.y) > radius * 0.2
      ) {
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
    let prev: { x: number; y: number } | null = null;
    for (let lon = -180; lon <= 180; lon += step) {
      const pt = project(lon, lat, lambda0, phi0, cx, cy, radius);
      if (!pt) {
        drawing = false;
        prev = null;
        continue;
      }
      if (
        prev &&
        Math.hypot(pt.x - prev.x, pt.y - prev.y) > radius * 0.2
      ) {
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
  drawLand(ctx, lambda0, phi0, cx, cy, radius);
  drawMarkers(ctx, lambda0, phi0, cx, cy, radius);

  ctx.restore();
}
