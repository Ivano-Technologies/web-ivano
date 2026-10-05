import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

type LegalPageProps = {
  title: string;
  path: string;
  children: ReactNode;
};

export function legalMetadata(title: string, path: string) {
  return createMetadata({
    title,
    description: `${title} for ${SITE.name}.`,
    path,
  });
}

export function LegalPage({ title, children }: Omit<LegalPageProps, "path">) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        lede={`Light v1 stub — ownership of ${SITE.name} legal copy is still TBD.`}
      />
      <section>
        <div className="wrap legal-prose">{children}</div>
      </section>
    </>
  );
}
