import Image from "next/image";
import Link from "next/link";
import { HeroChips } from "@/components/HeroChips";
import { HeroGlobeArt } from "@/components/HeroGlobeArt";
import { ProductCard } from "@/components/ProductCard";
import { ProductThumb } from "@/components/ProductThumb";
import { createMetadata } from "@/lib/metadata";
import { HOME_CLIENT_CARDS, HOME_PRODUCT_THUMBS } from "@/lib/products";
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
          <div className="section-head row">
            <div>
              <h2>Products and systems</h2>
            </div>
            <p>
              Our product family and selected client platforms, each on its
              own host.
            </p>
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
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.cta} →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="card-grid cols-2" style={{ marginTop: "1.15rem" }}>
            {HOME_CLIENT_CARDS.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="explore">
        <div className="wrap">
          <div className="section-head">
            <h2>Explore</h2>
            <p>How we work, and what we deliver beyond the product family.</p>
          </div>
          <div className="explore-panels">
            <div className="explore-panel warm" data-reveal>
              <h3>How we work</h3>
              <p>Your brand leads. Ours stays quiet on the work we deliver.</p>
            </div>
            <div className="explore-panel cool" data-reveal>
              <h3>Services</h3>
              <p>
                Build, secure and run, advise, grow and supply. Products and
                services under one company.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-band">
        <div className="wrap">
          <div className="section-head">
            <h2>Principles</h2>
            <p>Three commitments behind every product and engagement.</p>
          </div>
          <div className="principles">
            <div className="principle" data-reveal>
              <div className="ico" />
              <h3>Craft over theatre</h3>
              <p>
                Designed around how businesses actually operate: clear
                systems, real constraints.
              </p>
            </div>
            <div className="principle" data-reveal>
              <div className="ico" />
              <h3>Ship honest product</h3>
              <p>Clear tools and real systems, built for daily use.</p>
            </div>
            <div className="principle" data-reveal>
              <div className="ico" />
              <h3>Your brand comes first</h3>
              <p>
                Work we deliver carries only a small Ivano credit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="clients">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <h2>Selected clients</h2>
            <p className="muted">Organisations we’ve built for.</p>
          </div>
          <div className="clients-row">
            <div className="client-tile client-tile--mark">
              <Image
                src="/clients/juo-mark-mono-white.png"
                alt="John Upan Odey Campaign"
                width={62}
                height={44}
              />
            </div>
            <div className="client-tile">
              NMDPRA
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="trust">
            IVANO TECHNOLOGIES LTD · RC 8736090 · Incorporated 27 January 2026 ·{" "}
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
