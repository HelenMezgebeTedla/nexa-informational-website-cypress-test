import "./product.css";

export default function Product() {
  return (
    <section id="product" className="product-section">
      <div className="product-content">
        <h2>Our Product</h2>

        <div className="product-introduction">
          <h3>ZamLine</h3>
          <h4>Connect. Compare. Move forward</h4>

          <p>
            ZamLine helps businesses find the right freight opportunities and
            make data-informed decisions with route-aware cost estimates and
            verified users.
          </p>
        </div>

        <div className="product-features">
          <div className="product-feature">
            <div className="product-feature-icon">
              <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path
                  d="M24 5L38 10V20C38 29 32.2 37.1 24 41C15.8 37.1 10 29 10 20V10L24 5Z"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 23L22 27L30 18"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h5>
              Verified Business
              <span>Onboarding</span>
            </h5>
          </div>

          <div className="product-feature">
            <div className="product-feature-icon">
              <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path
                  d="M24 5C17.4 5 12 10.4 12 17C12 25.4 24 35 24 35C24 35 36 25.4 36 17C36 10.4 30.6 5 24 5Z"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
                <circle
                  cx="24"
                  cy="17"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2.8"
                />
                <path
                  d="M16 32C10.8 33.2 7 35.5 7 38C7 41.3 14.6 44 24 44C33.4 44 41 41.3 41 38C41 35.5 37.2 33.2 32 32"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h5>
              Route &amp; Cost
              <span>Estimation</span>
            </h5>
          </div>

          <div className="product-feature">
            <div className="product-feature-icon">
              <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path d="M7 14H31V34H7V14Z" fill="currentColor" />
                <path d="M31 21H37L42 27V34H31V21Z" fill="currentColor" />
                <circle cx="15" cy="36" r="4" fill="currentColor" />
                <circle cx="35" cy="36" r="4" fill="currentColor" />
              </svg>
            </div>

            <h5>
              Smart Shipment
              <span>Matching</span>
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
}
