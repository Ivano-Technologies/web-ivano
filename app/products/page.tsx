import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { createMetadata } from "@/lib/metadata";
import { PRODUCTS } from "@/lib/products";

export const metadata = createMetadata({
  title: "Products",
  description:
    "Our product family and selected client systems, each hosted on its own domain.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Product family"
        lede="Software we build and run, plus selected client systems. Each product opens on its own site."
      />
      <section>
        <div className="wrap">
          <div className="bento">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                featured={product.featured === true}
                showThumb
              />
            ))}
          </div>
          <div className="cta-band" style={{ marginTop: "2.75rem" }}>
            <h2>Partner with us</h2>
            <p>Building something in our space? Let’s talk.</p>
            <Link className="btn btn-primary" href="/contact">
              Talk to Ivano
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
