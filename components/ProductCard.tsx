import type { ReactNode } from "react";
import Link from "next/link";
import { ProductThumb } from "@/components/ProductThumb";
import { isExternalHref, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  featured?: boolean;
  showThumb?: boolean;
  afterCta?: ReactNode;
};

export function ProductCard({
  product,
  featured = false,
  showThumb = false,
  afterCta,
}: ProductCardProps) {
  const badgeClass =
    product.badge === "client" ? "badge badge-client" : "badge badge-product";
  const hasSecondary =
    Boolean(product.secondaryCta) && Boolean(product.secondaryHref);
  // Featured buy CTAs stay a primary button. A secondary link means this is
  // not a buy action, so both links stay text.
  const useButtonCta = featured && !hasSecondary;

  return (
    <article
      className={featured ? "card featured product-offer" : "card"}
      data-highlight={product.highlight}
      data-reveal
    >
      <span className={badgeClass}>{product.badgeLabel}</span>
      {showThumb || product.badge === "client" ? (
        <ProductThumb src={product.image} alt="" />
      ) : null}
      <h3>{product.name}</h3>
      <p className="card-desc">{product.description}</p>
      {product.price ? (
        <p className="product-price">{product.price}</p>
      ) : null}
      {product.priceNote ? (
        <p className="product-price-note">{product.priceNote}</p>
      ) : null}
      {product.includes && product.includes.length > 0 ? (
        <>
          {product.includesLabel ? (
            <p className="product-includes-label">{product.includesLabel}</p>
          ) : null}
          <ul className="product-includes">
            {product.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}
      {product.pricingOnRequest ? (
        <p className="product-pricing-request">
          Pricing on request. <Link href="/contact">Contact us</Link>
        </p>
      ) : null}
      <div className="cta-row">
        <a
          className={useButtonCta ? "btn btn-primary" : undefined}
          href={product.href}
          {...(isExternalHref(product.href)
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {product.cta}
          {useButtonCta ? null : (
            <>
              {" "}
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </>
          )}
        </a>
        {product.secondaryCta && product.secondaryHref ? (
          <a
            href={product.secondaryHref}
            {...(isExternalHref(product.secondaryHref)
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {product.secondaryCta}{" "}
            <span className="cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
        ) : null}
      </div>
      {afterCta}
    </article>
  );
}
