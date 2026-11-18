import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CONSENT_VERSION,
  parseStoredConsent,
  readConsent,
} from "./consent.ts";

test("reads a stored accept or decline choice", () => {
  assert.equal(
    parseStoredConsent(
      JSON.stringify({
        v: CONSENT_VERSION,
        analytics: "granted",
        at: "x",
      }),
    ),
    "granted",
  );
  assert.equal(
    parseStoredConsent(
      JSON.stringify({
        v: CONSENT_VERSION,
        analytics: "denied",
        at: "x",
      }),
    ),
    "denied",
  );
});

test("treats missing, malformed or old records as no choice", () => {
  assert.equal(parseStoredConsent(null), null);
  assert.equal(parseStoredConsent(""), null);
  assert.equal(parseStoredConsent("granted"), null);
  assert.equal(
    parseStoredConsent(JSON.stringify({ v: 0, analytics: "granted" })),
    null,
  );
  assert.equal(
    parseStoredConsent(
      JSON.stringify({ v: CONSENT_VERSION, analytics: "yes" }),
    ),
    null,
  );
});

test("server render never reports consent", () => {
  assert.equal(readConsent(), "pending");
});
