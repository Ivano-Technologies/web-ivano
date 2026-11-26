import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { KompleetPlans } from "@/components/KompleetPlans";
import { ProductCard } from "@/components/ProductCard";
import { createMetadata } from "@/lib/metadata";
import { HOME_CLIENT_CARDS, SALE_PRODUCTS } from "@/lib/products";
import { softwareApplicationsJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = createMetadata({
  title: "Products and pricing",
  description:
    "Software we build and run. Payments are processed securely by Paystack.",
  path: "/products",
});

const featuredProducts = SALE_PRODUCTS.filter(
  (product) => product.featured === true,
);
const listedProducts = SALE_PRODUCTS.filter(
  (product) => product.featured !== true,
);

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={softwareApplicationsJsonLd(SALE_PRODUCTS)} />
      <PageHero
        eyebrow="Products"
        title="Products and pricing"
        lede="Software we build and run. Payments are processed securely by Paystack."
      />
      <section>
        <div className="wrap">
          {featuredProducts.map((product) => (
            <KompleetPlans key={product.name} product={product} />
          ))}
          <div className="sale-grid">
            {listedProducts.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                showThumb
              />
            ))}
          </div>
          <div className="section-head client-work-head">
            <h2>Selected client work (not for sale)</h2>
            <p>
              Systems we built for clients. Shown as examples of our work; not
              products sold on this site.
            </p>
          </div>
          <div className="bento">
            {HOME_CLIENT_CARDS.map((product) => (
              <ProductCard key={product.name} product={product} showThumb />
            ))}
          </div>
          <div className="cta-band" style={{ marginTop: "2.75rem" }}>
            <h2>Need something custom?</h2>
            <p>
              Software development and technology services are quoted per
              project under a written agreement.
            </p>
            <Link className="btn btn-primary" href="/contact">
              Talk to Ivano
            </Link>
          </div>
          <p className="trust products-legal-line">
            Ivano Technologies Ltd · {SITE.rc} · Payments by Paystack
          </p>
        </div>
      </section>
    </>
  );
}
