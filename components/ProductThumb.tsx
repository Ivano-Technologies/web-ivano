type ThumbVariant = "t1" | "t2" | "t3" | "client";

type ProductThumbProps = {
  variant: ThumbVariant;
};

export function ProductThumb({ variant }: ProductThumbProps) {
  return (
    <div className={`thumb-media ${variant}`} aria-hidden="true">
      {variant === "t1" ? (
        <div className="mini-ui mini-dashboard">
          <div className="mini-side" />
          <div className="mini-main">
            <div className="mini-topbar">
              <span />
              <span />
              <span />
            </div>
            <div className="mini-kpis">
              <span className="mini-kpi on">
                <i />
              </span>
              <span className="mini-kpi">
                <i />
              </span>
              <span className="mini-kpi">
                <i />
              </span>
            </div>
            <div className="mini-chart">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      ) : null}
      {variant === "t2" ? (
        <div className="mini-ui mini-list">
          <div className="mini-row">
            <span className="mini-status ok" />
            <span className="mini-line wide" />
          </div>
          <div className="mini-row">
            <span className="mini-status wait" />
            <span className="mini-line" />
          </div>
          <div className="mini-row">
            <span className="mini-status ok" />
            <span className="mini-line mid" />
          </div>
          <div className="mini-row">
            <span className="mini-status" />
            <span className="mini-line" />
          </div>
        </div>
      ) : null}
      {variant === "t3" ? (
        <div className="mini-ui mini-grid">
          <span className="on" />
          <span />
          <span />
          <span />
          <span className="on" />
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : null}
      {variant === "client" ? (
        <div className="mini-ui mini-doc">
          <div className="mini-doc-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="mini-doc-page">
            <span className="mini-line wide" />
            <span className="mini-line" />
            <span className="mini-line mid" />
            <span className="mini-line" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
