import Link from "next/link";
import { HeroChips } from "@/components/HeroChips";
import { HeroGlobeArt } from "@/components/HeroGlobeArt";
import { ProductCard } from "@/components/ProductCard";
import { ProductThumb } from "@/components/ProductThumb";
import { createMetadata } from "@/lib/metadata";
import {
  HOME_CLIENT_CARDS,
  HOME_PRODUCT_THUMBS,
  isExternalHref,
} from "@/lib/products";
import { HERO_TAGLINE, SITE } from "@/lib/site";

export const metadata = createMetadata({
  title: SITE.name,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy" data-reveal>
            <h1>{SITE.name}</h1>
            <p className="lede">{HERO_TAGLINE}</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/contact">
                Talk to us
              </Link>
              <Link className="btn btn-secondary" href="/products">
                See products
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <HeroGlobeArt />
            <HeroChips />
          </div>
        </div>
      </section>

      <section id="products">
        <div className="wrap">
          <div className="section-head">
            <h2>Products and systems</h2>
          </div>
          <div className="thumb-grid">
            {HOME_PRODUCT_THUMBS.map((product) => (
              <article
                className="thumb-card"
                data-highlight={product.highlight}
                data-reveal
                key={product.name}
              >
                <ProductThumb src={product.image} />
                <div className="cap">
                  <h3>{product.name}</h3>
                  <p>{product.homeDescription}</p>
                  <div className="cta-row">
                    <a
                      href={product.href}
                      {...(isExternalHref(product.href)
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {product.cta}{" "}
                      <span className="cta-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="card-grid cols-2 cols-3" style={{ marginTop: "1.15rem" }}>
            {HOME_CLIENT_CARDS.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="trust">
            IVANO TECHNOLOGIES LTD · RC 9326735 · Incorporated 27 January 2026 ·{" "}
            {SITE.location}
          </p>
          <div className="cta-band">
            <h2>Ready to work with Ivano?</h2>
            <p>Partnerships, product enquiries and project briefs. We read every message.</p>
            <Link className="btn btn-primary" href="/contact">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
