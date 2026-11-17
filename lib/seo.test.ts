import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { KOMPLEET_ORIGIN } from "./kompleetRedirects.ts";
import { KOMPLEET_HREF, PRODUCTS } from "./products.ts";
import {
  CANONICAL_ORIGIN,
  ORGANIZATION_ID,
  ORGANIZATION_JSON_LD_NAME,
  ORGANIZATION_LOGO_PATH,
  ORGANIZATION_POSTAL_ADDRESS,
  canonicalUrl,
  organizationJsonLd,
  softwareApplicationsJsonLd,
} from "./seo.ts";
import { SITE, SOCIAL_LINKS } from "./site.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FORBIDDEN_KOMPLEET_HOSTS = [
  "kompleet.techivano.com",
  "www.getkompleet.com",
  "/api/kompleet",
];
const FORBIDDEN_JSON_LD = /\boffers\b|\bprice\b|\bfree\b|₦0|\bNGN\s*0\b/i;

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === ".git") {
      continue;
    }
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full, acc);
      continue;
    }
    if (/\.(ts|tsx|js|jsx|mjs|md)$/.test(name)) {
      acc.push(full);
    }
  }
  return acc;
}

function roundTrip(data: Record<string, unknown>): Record<string, unknown> {
  const parsed: unknown = JSON.parse(JSON.stringify(data));
  assert.equal(typeof parsed, "object");
  assert.notEqual(parsed, null);
  return parsed as Record<string, unknown>;
}

function graphNodes(
  data: Record<string, unknown>,
): Record<string, unknown>[] {
  const parsed = roundTrip(data);
  const graph = parsed["@graph"];
  assert.ok(Array.isArray(graph), "JSON-LD must use @graph");
  return graph as Record<string, unknown>[];
}

function nodeOfType(
  nodes: Record<string, unknown>[],
  type: string,
  name?: string,
): Record<string, unknown> {
  const match = nodes.find((node) => {
    if (node["@type"] !== type) {
      return false;
    }
    if (name === undefined) {
      return true;
    }
    return node.name === name;
  });
  assert.ok(match, `missing ${type}${name ? ` named ${name}` : ""}`);
  return match;
}

describe("SEO structured data and Kompleet links", () => {
  it("parses Organization JSON-LD with logo, address, identifier and social sameAs", () => {
    const nodes = graphNodes(organizationJsonLd());
    const organization = nodeOfType(nodes, "Organization");
    const website = nodeOfType(nodes, "WebSite");
    const sameAs = SOCIAL_LINKS.map((link) => link.href);

    assert.equal(organization["@id"], ORGANIZATION_ID);
    assert.equal(organization.name, ORGANIZATION_JSON_LD_NAME);
    assert.equal(organization.legalName, SITE.legalName);
    assert.equal(organization.url, "https://www.ivanotechnologies.com");
    assert.equal(organization.url, CANONICAL_ORIGIN);
    assert.equal(
      organization.logo,
      canonicalUrl(ORGANIZATION_LOGO_PATH),
    );
    assert.match(String(organization.logo), /^https:\/\//);
    assert.equal(organization.identifier, "RC 9326735");
    assert.deepEqual(organization.address, {
      ...ORGANIZATION_POSTAL_ADDRESS,
    });
    assert.deepEqual(organization.sameAs, sameAs);
    assert.deepEqual(website.sameAs, sameAs);
    assert.deepEqual(website.publisher, { "@id": ORGANIZATION_ID });

    const serialized = JSON.stringify(organizationJsonLd());
    assert.equal(FORBIDDEN_JSON_LD.test(serialized), false);
    JSON.parse(serialized);
  });

  it("parses SoftwareApplication JSON-LD for Kompleet and Ivano PMS with no offers", () => {
    const nodes = graphNodes(softwareApplicationsJsonLd(PRODUCTS));
    const kompleet = nodeOfType(nodes, "SoftwareApplication", "Kompleet");
    const pms = nodeOfType(nodes, "SoftwareApplication", "Ivano PMS");

    assert.equal(kompleet.url, "https://getkompleet.com");
    assert.equal(kompleet.applicationCategory, "BusinessApplication");
    assert.equal(kompleet.operatingSystem, "Web");
    assert.equal("offers" in kompleet, false);
    assert.equal("price" in kompleet, false);
    assert.equal("sameAs" in kompleet, false);
    assert.deepEqual(kompleet.publisher, { "@id": ORGANIZATION_ID });

    assert.equal(pms.url, "https://pms.techivano.com");
    assert.equal(pms.applicationCategory, "BusinessApplication");
    assert.equal(pms.operatingSystem, "Web");
    assert.equal("offers" in pms, false);
    assert.equal("price" in pms, false);
    assert.equal("sameAs" in pms, false);
    assert.deepEqual(pms.publisher, { "@id": ORGANIZATION_ID });

    const names = nodes.map((node) => node.name);
    assert.deepEqual(names, ["Kompleet", "Ivano PMS"]);

    const serialized = JSON.stringify(softwareApplicationsJsonLd(PRODUCTS));
    assert.equal(FORBIDDEN_JSON_LD.test(serialized), false);
    JSON.parse(serialized);
  });

  it("sets twitter:site from the existing X handle", () => {
    assert.equal(SITE.socialHandle, "@techivano");
    const metadata = readFileSync(join(ROOT, "lib/metadata.ts"), "utf8");
    const layout = readFileSync(join(ROOT, "app/layout.tsx"), "utf8");
    assert.match(metadata, /site:\s*SITE\.socialHandle/);
    assert.match(layout, /site:\s*SITE\.socialHandle/);
  });

  it("uses a services-first default meta description under 155 characters", () => {
    assert.ok(SITE.description.length < 155);
    assert.equal(SITE.description.includes("Electric cars"), false);
    assert.equal(SITE.description.includes("green tech"), false);
    assert.match(SITE.description, /Software, IT and consultancy/);
    assert.equal(/\bfree\b/i.test(SITE.description), false);
    assert.equal(/₦|\bNGN\b/.test(SITE.description), false);
  });

  it("points live Kompleet links at the getkompleet.com apex", () => {
    assert.equal(KOMPLEET_HREF, "https://getkompleet.com");
    assert.equal(KOMPLEET_ORIGIN, "https://getkompleet.com");

    const failures: string[] = [];
    for (const file of walk(ROOT)) {
      const rel = relative(ROOT, file).replaceAll("\\", "/");
      if (rel.endsWith(".test.ts") || rel.endsWith(".test.mjs")) {
        continue;
      }
      const text = readFileSync(file, "utf8");
      for (const token of FORBIDDEN_KOMPLEET_HOSTS) {
        if (text.includes(token)) {
          failures.push(`${rel}: ${token}`);
        }
      }
    }
    assert.equal(failures.length, 0, failures.join("\n"));
  });
});
