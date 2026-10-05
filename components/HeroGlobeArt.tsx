import { readFile } from "node:fs/promises";
import path from "node:path";
import { HeroGlobe } from "@/components/HeroGlobe";

function globeMarkup(svg: string): string {
  return svg.replace(/^\uFEFF?<\?xml[\s\S]*?\?>\s*/u, "");
}

export async function HeroGlobeArt() {
  const svg = await readFile(
    path.join(process.cwd(), "public/art/globe-map.svg"),
    "utf8",
  );

  return <HeroGlobe markup={globeMarkup(svg)} />;
}
