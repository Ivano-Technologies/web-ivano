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

  return (
    <article
      className={featured ? "card featured" : "card"}
      data-highlight={product.highlight}
      data-reveal
    >
      <span className={badgeClass}>{product.badgeLabel}</span>
      {showThumb || product.badge === "client" ? (
        <ProductThumb src={product.image} alt="" />
      ) : null}
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
