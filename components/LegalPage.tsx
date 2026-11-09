import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/metadata";
import { LEGAL_LAST_UPDATED, SITE } from "@/lib/site";

type LegalPageProps = {
  title: string;
  path: string;
  /** Optional hero sub line under the page title. */
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

export function MailLink({ address }: { address: string }) {
  return <a href={`mailto:${address}`}>{address}</a>;
}

export function LegalUpdated() {
  return <p>Last updated: {LEGAL_LAST_UPDATED}</p>;
}

export function LegalPage({
  title,
  lede,
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
