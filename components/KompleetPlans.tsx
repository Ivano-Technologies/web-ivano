import Link from "next/link";
import { ProductThumb } from "@/components/ProductThumb";
import {
  KOMPLEET_LOGIN_HREF,
  KOMPLEET_PLANS,
  KOMPLEET_PLANS_INTRO,
  KOMPLEET_PLANS_UPGRADE_NOTE,
  KOMPLEET_PRICING_HREF,
} from "@/lib/kompleetPlans";
import { isExternalHref, KOMPLEET_HREF, KOMPLEET_SEE_CTA, type Product } from "@/lib/products";

type KompleetPlansProps = {
  product: Product;
};

function externalLinkProps(href: string) {
  return isExternalHref(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

export function KompleetPlans({ product }: KompleetPlansProps) {
  return (
    <article
      className="card featured product-offer kompleet-offer"
      data-highlight={product.highlight}
      data-reveal
    >
      <span className="badge badge-product">{product.badgeLabel}</span>
      <ProductThumb src={product.image} alt="" />
      <h3>{product.name}</h3>
      <p className="card-desc">{product.description}</p>
      <p className="kompleet-plans-intro">{KOMPLEET_PLANS_INTRO}</p>
      <div className="plan-grid">
        {KOMPLEET_PLANS.map((plan) => (
          <article key={plan.id} className="plan-card" data-plan={plan.id}>
            <h4>{plan.name}</h4>
            <p className="plan-price">{plan.priceLabel}</p>
            <p className="plan-subline">{plan.priceSubline}</p>
            <div className="plan-features">
              {plan.everythingIn ? (
                <p className="plan-everything-in">{plan.everythingIn}</p>
              ) : null}
              <ul>
                {plan.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <a
              className={plan.primary ? "btn btn-primary" : "btn btn-secondary"}
              href={plan.href}
              {...externalLinkProps(plan.href)}
            >
              {plan.cta}
            </a>
          </article>
        ))}
      </div>
      <div className="product-fineprint">
        <p>{KOMPLEET_PLANS_UPGRADE_NOTE}</p>
        <p>
          Already have an account?{" "}
          <a href={KOMPLEET_LOGIN_HREF} {...externalLinkProps(KOMPLEET_LOGIN_HREF)}>
            Sign in
          </a>
          .
        </p>
        <p>
          See our <Link href="/terms">Terms of Service</Link> and{" "}
          <Link href="/refunds">Refund Policy</Link>.
        </p>
        <p className="kompleet-fineprint-links">
          <a href={KOMPLEET_HREF} {...externalLinkProps(KOMPLEET_HREF)}>
            {KOMPLEET_SEE_CTA}
          </a>
          <a href={KOMPLEET_PRICING_HREF} {...externalLinkProps(KOMPLEET_PRICING_HREF)}>
            See plans and prices
          </a>
        </p>
      </div>
    </article>
  );
}
