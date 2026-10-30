import "./impact-mission.css";

export default function ImpactMission() {
  return (
    <section className="impact-mission-section">
      <div className="impact-mission-container">
        <article className="info-card">
          <div className="info-icon">
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path
                d="M16 32V24M24 32V17M32 32V21"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M13 35H35"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="info-card-content">
            <h3>Our impact</h3>

            <p>
              We aim to reduce inefficient truck movements by making freight
              opportunities easier to evaluate and act on.
            </p>
          </div>
        </article>

        <article className="info-card">
          <div className="info-icon">
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle
                cx="24"
                cy="24"
                r="12"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle
                cx="24"
                cy="24"
                r="5"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M27 21L37 11M32 11H37V16"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="info-card-content">
            <h3>Our mission</h3>

            <p>
              To design a trusted, user-centered platform that brings clarity,
              structure, and transparency to freight planning.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
