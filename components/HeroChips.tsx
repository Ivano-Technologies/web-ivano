"use client";

const CHIPS = [
  { id: "kompleet", label: "Kompleet", targets: ["kompleet"] },
  { id: "ops", label: "PMS · EAM", targets: ["pms", "nrcs"] },
  { id: "client", label: "Client systems", targets: ["client"] },
] as const;

function highlightTargets(targets: readonly string[]): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const section = document.getElementById("products");
  section?.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });

  const nodes = targets.flatMap((target) =>
    Array.from(document.querySelectorAll(`[data-highlight="${target}"]`)),
  );
  window.setTimeout(() => {
    for (const node of nodes) {
      node.classList.add("is-highlight");
    }
    window.setTimeout(() => {
      for (const node of nodes) {
        node.classList.remove("is-highlight");
      }
    }, 750);
  }, reduce ? 0 : 280);
}

export function HeroChips() {
  return (
    <div className="hero-art-overlay">
      <p className="label">Systems</p>
      <div className="chips">
        {CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className="chip"
            onClick={() => highlightTargets(chip.targets)}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
