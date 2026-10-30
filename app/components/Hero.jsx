import Image from "next/image";
import Link from "next/link";
import "./hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <Image
        className="hero-truck"
        src="/images/hero/hero.png"
        alt="ZamLine freight truck on the road"
        fill
        priority
        sizes="100vw"
      />

      <div className="hero-content">
        <h1>
          <span>Smarter Freight</span>
          <span>Planning For Better</span>
          <span className="hero-heading-highlight">Truck Utilization</span>
        </h1>

        <p>
          ZamLine helps verified shippers and fleet companies connect around
          real freight opportunities, and make faster more informed decisions.
        </p>

        <Link href="/#product" className="hero-cta">
          <span>Get Started</span>
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12H19M13.5 6.5L19 12L13.5 17.5"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <svg
        className="hero-wave"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 118C136 99 264 76 389 77C526 77 603 106 716 108C826 110 891 81 973 64C1052 48 1122 45 1200 59V120H0Z" />
      </svg>
    </section>
  );
}
