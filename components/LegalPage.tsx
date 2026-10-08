import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

type LegalPageProps = {
  title: string;
  path: string;
  /** Hero sub line. Pages without final copy keep the v1 default. */
  lede?: string;
  children: ReactNode;
};

export function legalMetadata(title: string, path: string) {
  return createMetadata({
    title,
    description: `${title} for ${SITE.name}.`,
    path,
  });
}

const DEFAULT_LEDE = `Light v1 stub. Ownership of ${SITE.name} legal copy is still TBD.`;

export function LegalPage({
  title,
  lede = DEFAULT_LEDE,
  children,
}: Omit<LegalPageProps, "path">) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lede={lede} />
      <section>
        <div className="wrap legal-prose">{children}</div>
      </section>
    </>
  );
}
