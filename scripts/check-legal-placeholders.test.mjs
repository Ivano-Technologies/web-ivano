import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEGAL_ROUTES = [
  "terms",
  "privacy",
  "refunds",
  "cookies",
  "contact",
  "products",
];

const SOURCE_PAGES = LEGAL_ROUTES.map((route) =>
  path.join(ROOT, "app", route, "page.tsx"),
);

const FORBIDDEN_STRINGS = ["LAWYER REVIEW", "DPO NAME", "DRAFT"];
const PLACEHOLDER_BRACKETS = /\[[A-Z][A-Z0-9 /.,'’‘–—_-]{1,}\]/g;
const PRICE_AMOUNT = /₦\s*[\d,]+|\bNGN\s*[\d,]+|\b5,000\b|\b5000\b/;
const NO_PRICE_ROUTES = ["terms", "refunds", "products"];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function stripScriptsAndStyles(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ");
}

function collectHits(text) {
  const hits = [];
  for (const token of FORBIDDEN_STRINGS) {
    if (text.includes(token)) {
      hits.push(token);
    }
  }
  const brackets = text.match(PLACEHOLDER_BRACKETS);
  if (brackets) {
    hits.push(...brackets);
  }
  return hits;
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) {
    return acc;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, acc);
      continue;
    }
    acc.push(full);
  }
  return acc;
}

function builtLegalFiles() {
  const serverApp = path.join(ROOT, ".next", "server", "app");
  if (!fs.existsSync(serverApp)) {
    return [];
  }
  const allowed = new Set(LEGAL_ROUTES);
  return walk(serverApp).filter((file) => {
    const rel = path.relative(serverApp, file).replaceAll(path.sep, "/");
    const route = rel.split("/")[0]?.replace(/\.(html|rsc|js)$/, "");
    if (!route || !allowed.has(route)) {
      return false;
    }
    return (
      file.endsWith(".html") ||
      file.endsWith(".rsc") ||
      file.endsWith("page.js")
    );
  });
}

test("legal page source has no placeholder markers", () => {
  const missing = SOURCE_PAGES.filter((file) => !fs.existsSync(file));
  assert.equal(missing.length, 0, `missing page files: ${missing.join(", ")}`);

  const failures = [];
  for (const file of SOURCE_PAGES) {
    const hits = collectHits(read(file));
    if (hits.length > 0) {
      failures.push(`${path.relative(ROOT, file)}: ${hits.join(", ")}`);
    }
  }
  assert.equal(failures.length, 0, failures.join("\n"));
});

test("terms, refunds and products source have no published price amounts", () => {
  const failures = [];
  for (const route of NO_PRICE_ROUTES) {
    const file = path.join(ROOT, "app", route, "page.tsx");
    const text = read(file);
    if (PRICE_AMOUNT.test(text)) {
      failures.push(path.relative(ROOT, file));
    }
  }
  assert.equal(failures.length, 0, failures.join(", "));
});

test("built legal pages have no placeholder markers", () => {
  const files = builtLegalFiles();
  assert.ok(
    files.length > 0,
    "No built legal pages found under .next/server/app. Run npm run build first.",
  );

  const failures = [];
  for (const file of files) {
    const raw = read(file);
    const text = file.endsWith(".html") ? stripScriptsAndStyles(raw) : raw;
    const hits = collectHits(text);
    if (hits.length > 0) {
      failures.push(`${path.relative(ROOT, file)}: ${hits.join(", ")}`);
    }
  }
  assert.equal(failures.length, 0, failures.join("\n"));
});

test("built terms, refunds and products pages have no published price amounts", () => {
  const files = builtLegalFiles().filter((file) => {
    const rel = path
      .relative(path.join(ROOT, ".next", "server", "app"), file)
      .replaceAll(path.sep, "/");
    const route = rel.split("/")[0]?.replace(/\.(html|rsc|js)$/, "");
    return NO_PRICE_ROUTES.includes(route);
  });
  assert.ok(
    files.length > 0,
    "No built /terms, /refunds or /products pages found. Run npm run build first.",
  );

  const failures = [];
  for (const file of files) {
    const raw = read(file);
    const text = file.endsWith(".html") ? stripScriptsAndStyles(raw) : raw;
    if (PRICE_AMOUNT.test(text)) {
      failures.push(path.relative(ROOT, file));
    }
  }
  assert.equal(failures.length, 0, failures.join("\n"));
});
