"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  function handleNavigation(section) {
    setActiveLink(section);
    setMenuOpen(false);
  }

  useEffect(() => {
    const sections = ["home", "about", "product", "team", "contact"];

    function updateActiveSection() {
      const scrollPosition = window.scrollY + 180;
      let currentSection = "home";

      sections.forEach((section) => {
        const element = document.getElementById(section);

        if (element && element.offsetTop <= scrollPosition) {
          currentSection = section;
        }
      });

      setActiveLink(currentSection);
    }

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link
          href="/#home"
          className="site-logo"
          onClick={() => handleNavigation("home")}
        >
          <Image
            src="/logos/nexa.png"
            alt="Nexa"
            width={126}
            height={82}
            priority
          />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={menuOpen ? "site-nav-links is-open" : "site-nav-links"}>
          <Link
            href="/#home"
            className={activeLink === "home" ? "active-link" : ""}
            onClick={() => handleNavigation("home")}
          >
            Home
          </Link>

          <Link
            href="/#about"
            className={activeLink === "about" ? "active-link" : ""}
            onClick={() => handleNavigation("about")}
          >
            About us
          </Link>

          <Link
            href="/#product"
            className={activeLink === "product" ? "active-link" : ""}
            onClick={() => handleNavigation("product")}
          >
            Product
          </Link>

          <Link
            href="/#team"
            className={activeLink === "team" ? "active-link" : ""}
            onClick={() => handleNavigation("team")}
          >
            Team
          </Link>

          <Link
            href="/#contact"
            className={activeLink === "contact" ? "active-link" : ""}
            onClick={() => handleNavigation("contact")}
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  );
}
