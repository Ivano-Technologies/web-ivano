type PageHeroProps = {
  eyebrow: string;
  title: string;
  lede: string;
};

export function PageHero({ eyebrow, title, lede }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{lede}</p>
      </div>
    </section>
  );
}
