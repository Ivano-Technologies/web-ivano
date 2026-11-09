/** Live Kompleet origin after the www cutover. */
export const KOMPLEET_ORIGIN = "https://kompleet.techivano.com";

/**
 * Old Kompleet app prefixes that now 404 on www.ivanotechnologies.com.
 * `/reset-password` and `/forgot-password` exist on Kompleet, so they are included.
 */
export const KOMPLEET_LEGACY_PREFIXES = [
  "/login",
  "/signup",
  "/dashboard",
  "/app",
  "/reset-password",
  "/forgot-password",
] as const;

export type KompleetRedirect = {
  source: string;
  destination: string;
  permanent: true;
};

function normalizePathname(pathname: string): string {
  const pathOnly = pathname.split("?")[0] ?? "";
  if (pathOnly.length > 1 && pathOnly.endsWith("/")) {
    return pathOnly.slice(0, -1);
  }
  return pathOnly;
}

function formatSearch(search: string): string {
  if (!search) {
    return "";
  }
  return search.startsWith("?") ? search : `?${search}`;
}

/** Next.js `permanent: true` is a 308 and forwards the request query string. */
export function kompleetRedirects(): KompleetRedirect[] {
  return KOMPLEET_LEGACY_PREFIXES.map((prefix) => ({
    source: `${prefix}/:path*`,
    destination: `${KOMPLEET_ORIGIN}${prefix}/:path*`,
    permanent: true,
  }));
}

export function isKompleetLegacyPath(pathname: string): boolean {
  const normalized = normalizePathname(pathname);
  return KOMPLEET_LEGACY_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  );
}

/**
 * Destination for a leftover Kompleet path, preserving subpath and query.
 * Returns null for marketing pages so those routes cannot be shadowed.
 */
export function kompleetRedirectDestination(
  pathname: string,
  search = "",
): string | null {
  if (!isKompleetLegacyPath(pathname)) {
    return null;
  }
  return `${KOMPLEET_ORIGIN}${normalizePathname(pathname)}${formatSearch(search)}`;
}
