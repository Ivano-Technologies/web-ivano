import { ProductThumb } from "@/components/ProductThumb";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  featured?: boolean;
  showThumb?: boolean;
};

export function ProductCard({
  product,
  featured = false,
  showThumb = false,
}: ProductCardProps) {
  const badgeClass =
    product.badge === "client" ? "badge badge-client" : "badge badge-product";
  const thumbVariant = showThumb
    ? product.thumb
    : product.badge === "client"
      ? "client"
      : undefined;

  return (
    <article
      className={featured ? "card featured" : "card"}
      data-highlight={product.highlight}
      data-reveal
    >
      <span className={badgeClass}>{product.badgeLabel}</span>
      {thumbVariant ? <ProductThumb variant={thumbVariant} /> : null}
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="cta-row">
        <a href={product.href} target="_blank" rel="noopener noreferrer">
          {product.cta} →
        </a>
      </div>
    </article>
  );
}
