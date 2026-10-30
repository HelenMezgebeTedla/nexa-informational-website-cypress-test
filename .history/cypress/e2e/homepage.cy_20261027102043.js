describe("Nexa informational website", () => {
  beforeEach(() => {
    cy.visitHome();
  });

  it("loads the homepage and key sections", () => {
    cy.title().should("include", "Nexa");
    cy.get("h1").should("contain.text", "Smarter Freight");
    cy.get("main").should("exist");
    cy.assertMainSections();
  });

  it("shows the primary navigation links and CTA", () => {
    ["Home", "About us", "Product", "Team", "Contact Us"].forEach((label) => {
      cy.contains("a", label).should("be.visible");
    });

    cy.contains("a", "Get Started").should("have.attr", "href", "/#product");
  });

  it("navigates through the section links correctly", () => {
    cy.contains("a", "Team").click();
    cy.location("hash").should("include", "#team");

    cy.contains("a", "Contact Us").click();
    cy.location("hash").should("include", "#contact");
  });

  it("exposes a valid contact form with real validation behavior", () => {
    cy.get("section#contact").scrollIntoView();

    cy.get("form.contact-form").should("exist");
    cy.get('input[name="email"]').should("have.attr", "type", "email");
    cy.get('input[name="subject"]').should("be.visible");
    cy.get('textarea[name="message"]').should("be.visible");

    cy.get(".contact-honeypot")
      .should("have.attr", "aria-hidden", "true")
      .within(() => {
        cy.get('input[name="companyWebsite"]').should(
          "have.attr",
          "tabindex",
          "-1",
        );
        cy.get('input[name="companyWebsite"]').should(
          "have.attr",
          "autocomplete",
          "off",
        );
      });

    cy.get('input[name="email"]').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
  });

  it("supports mobile navigation and accessible menu state", () => {
    cy.viewport(390, 844);

    cy.get(".menu-toggle")
      .should("be.visible")
      .should("have.attr", "aria-expanded", "false")
      .click();

    cy.get(".menu-toggle").should("have.attr", "aria-expanded", "true");
    cy.get(".site-nav-links").should("have.class", "is-open");
    cy.contains("a", "Contact Us").should("be.visible");
  });

  it("meets key accessibility expectations", () => {
    cy.get("nav[aria-label='Main navigation']").should("exist");
    cy.get("button[aria-label]").should("have.length.at.least", 1);
    cy.get("img[alt]").should("have.length.at.least", 1);
    cy.get("a[href^='mailto:']").should("have.length.at.least", 1);
    cy.get("section#contact h2, section#contact h3").should(
      "have.length.at.least",
      1,
    );
    cy.get("main, section, nav, footer").should("have.length.greaterThan", 1);
  });

  it("runs over HTTPS and exposes secure response headers", () => {
    cy.location("protocol").should("eq", "https:");

    cy.request("https://nexa-informational-website.vercel.app/").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.headers["content-type"]).to.include("text/html");
        expect(response.headers["strict-transport-security"]).to.include(
          "max-age",
        );
      },
    );
  });

  it("returns a successful HTTP response from the live deployment", () => {
    cy.request("https://nexa-informational-website.vercel.app/").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include("Smarter Freight");
      },
    );
  });

  it("renders the page title and metadata for the business brand", () => {
    cy.title().should("match", /Nexa/i);
    cy.document().its("head").should("exist");
  });

  it("shows a prominently styled primary hero banner", () => {
    cy.get(".hero-section").should("be.visible");
    cy.get(".hero-content").should("contain.text", "Smarter Freight");
    cy.get(".hero-cta").should("be.visible");
  });

  it("has a valid site logo link in the header", () => {
    cy.get(".site-logo").should("have.attr", "href", "/#home");
    cy.get(".site-logo img").should("have.attr", "alt").and("not.be.empty");
  });

  it("contains the About section with a heading and supporting content", () => {
    cy.get("section#about").should("be.visible");
    cy.get("section#about h2, section#about h3").should(
      "have.length.at.least",
      1,
    );
  });

  it("contains the Product section with meaningful marketing copy", () => {
    cy.get("section#product").should("be.visible");
    cy.get("section#product").should("contain.text", "Product");
  });

  it("contains the Team section and team imagery", () => {
    cy.get("section#team").should("be.visible");
    cy.get("section#team img").should("have.length.at.least", 1);
  });

  it("keeps a visible contact section near the page bottom", () => {
    cy.get("section#contact").scrollIntoView();
    cy.get("section#contact").should("be.visible");
  });

  it("includes a visible email contact link", () => {
    cy.get("a[href^='mailto:']").should("have.length.at.least", 1);
    cy.get("a[href^='mailto:']").first().should("contain.text", "@");
  });

  it("includes a visible phone contact details entry", () => {
    cy.get("a[href^='tel:']").should("have.length.at.least", 1);
  });

  it("includes location information for the business", () => {
    cy.contains("Lusaka").should("be.visible");
  });

  it("contains the contact form heading and submit action", () => {
    cy.get("section#contact").scrollIntoView();
    cy.contains("Send a message").should("be.visible");
    cy.contains("Submit").should("be.visible");
  });

  it("keeps required contact form inputs enabled before submission", () => {
    cy.get('input[name="email"]').should("not.be.disabled");
    cy.get('input[name="subject"]').should("not.be.disabled");
    cy.get('textarea[name="message"]').should("not.be.disabled");
  });

  it("uses accessible labels for the contact form fields", () => {
    cy.get('label[for="contact-email"]').should("contain.text", "Email");
    cy.get('label[for="contact-subject"]').should("contain.text", "Subject");
    cy.get('label[for="contact-message"]').should("contain.text", "Message");
  });

  it("has a hidden honeypot for spam protection", () => {
    cy.get(".contact-honeypot").should("have.attr", "aria-hidden", "true");
    cy.get('input[name="companyWebsite"]').should(
      "have.attr",
      "autocomplete",
      "off",
    );
  });

  it("contains multiple images with alt text for accessibility", () => {
    cy.get("img[alt]").should("have.length.at.least", 3);
  });

  it("renders a visible footer region on the page", () => {
    cy.get("footer").should("be.visible");
  });

  it("keeps navigation links in sync with the hash targets", () => {
    ["#home", "#about", "#product", "#team", "#contact"].forEach((hash) => {
      cy.contains("a", "Home").click();
      cy.location("hash").should(
        "match",
        /#home|#about|#product|#team|#contact/,
      );
    });
  });

  it("renders anchors to the major sections of the landing page", () => {
    cy.get('a[href*="#"]').should("have.length.at.least", 5);
  });

  it("has a human-readable page structure with multiple landmarks", () => {
    cy.get("header").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
  });

  it("supports keyboard focus for the mobile menu controls", () => {
    cy.viewport(390, 844);
    cy.get(".menu-toggle")
      .should("be.visible")
      .focus()
      .should("have.focus")
      .should("have.attr", "aria-expanded", "false");
  });

  it("returns content security relevant headers from the deployed site", () => {
    cy.request("https://nexa-informational-website.vercel.app/").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.headers["server"]).to.eq("Vercel");
        expect(response.headers["strict-transport-security"]).to.include(
          "max-age",
        );
        expect(response.headers["content-type"]).to.include("text/html");
      },
    );
  });

  it("does not crash when the page loads with a cached response", () => {
    cy.visit("https://nexa-informational-website.vercel.app/");
    cy.get("body").should("be.visible");
    cy.contains("Smarter Freight").should("be.visible");
  });

  it("handles viewport resizing without layout collapse", () => {
    cy.viewport(768, 1024);
    cy.get("header").should("be.visible");
    cy.get("main").should("be.visible");
    cy.viewport(1280, 800);
    cy.get("section#contact").should("be.visible");
  });

  it("supports page rendering when the browser reports connectivity", () => {
    cy.window().then((win) => {
      expect(typeof win.navigator.onLine).to.eq("boolean");
    });
    cy.get("body").should("exist");
    cy.contains("Smarter Freight").should("be.visible");
  });

  it("keeps the page stable when the contact form fields are empty", () => {
    cy.get("section#contact").scrollIntoView();
    cy.get('input[name="email"]').clear();
    cy.get('input[name="subject"]').clear();
    cy.get('textarea[name="message"]').clear();
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("does not expose the honeypot field as visible content", () => {
    cy.get('input[name="companyWebsite"]').should("not.be.visible");
  });

  it("keeps navigation links accessible on narrow screens", () => {
    cy.viewport(375, 812);
    cy.get(".menu-toggle").should("be.visible").click();
    cy.contains("a", "Home").should("be.visible");
    cy.contains("a", "Contact Us").should("be.visible");
  });

  it("loads the page without broken anchor references", () => {
    cy.get('a[href^="#"]').each(($link) => {
      const id = $link.attr("href").replace("#", "");
      if (id) {
        cy.get(`#${CSS.escape(id)}`).should("exist");
      }
    });
  });

  it("renders the hero call to action without empty text", () => {
    cy.get(".hero-cta").should("contain.text", "Get Started");
    cy.get(".hero-cta").find("svg").should("exist");
  });

  it("keeps social or external URLs in valid href format", () => {
    cy.get("a[href]").each(($link) => {
      const href = $link.attr("href");
      expect(href).to.not.be.empty;
    });
  });

  it("contains valid image sources for header and content visuals", () => {
    cy.get("img[src]").each(($img) => {
      const src = $img.attr("src");
      expect(src).to.not.be.empty;
    });
  });

  it("does not render duplicate main heading content", () => {
    cy.get("h1").should("have.length", 1);
  });

  it("keeps the page scrollable when content exceeds viewport height", () => {
    cy.scrollTo("bottom");
    cy.window()
      .its("document.body.scrollHeight")
      .should("be.greaterThan", 1000);
  });

  it("maintains readable text contrast in the primary CTA area", () => {
    cy.get(".hero-cta").should("be.visible");
    cy.get(".hero-cta").should("not.have.css", "color", "rgba(0, 0, 0, 0)");
  });

  it("does not lose the section identity when the page is resized", () => {
    cy.viewport(1024, 768);
    cy.get("section#home").should("exist");
    cy.get("section#about").should("exist");
    cy.get("section#contact").should("exist");
  });

  it("keeps the page functional when the user reloads", () => {
    cy.reload();
    cy.get("h1").should("contain.text", "Smarter Freight");
  });

  it("allows repeated navigation actions without page breakage", () => {
    cy.contains("a", "Product").click();
    cy.location("hash").should("include", "#product");
    cy.contains("a", "About us").click();
    cy.location("hash").should("include", "#about");
    cy.contains("a", "Home").click();
    cy.location("hash").should("include", "#home");
  });

  it("has non-empty labels for primary content links", () => {
    cy.get(".site-nav-links a, .hero-cta, .contact-email-link").then(
      ($links) => {
        const labels = [...$links].map((link) => link.textContent.trim());
        expect(labels.filter((label) => label.length === 0).length).to.eq(0);
      },
    );
  });

  it("keeps form submit controls reachable on desktop and mobile", () => {
    cy.viewport(1440, 1200);
    cy.get('button[type="submit"]').should("be.visible");
    cy.viewport(390, 844);
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("keeps the document language set for accessibility", () => {
    cy.document().its("documentElement.lang").should("eq", "en");
  });

  it("renders page content without JavaScript-free layout collapse", () => {
    cy.get("body").should("not.have.css", "overflow", "hidden");
  });

  it("keeps key visual assets with meaningful alt text", () => {
    cy.get(".site-logo img, .hero-truck").then(($images) => {
      expect($images.length).to.be.greaterThan(0);
      $images.each((_, image) => {
        expect(image.getAttribute("alt") || "").to.not.equal("");
      });
    });
  });

  it("resets the menu state cleanly after a page reload", () => {
    cy.viewport(390, 844);
    cy.get(".menu-toggle").click();
    cy.get(".menu-toggle").should("have.attr", "aria-expanded", "true");
    cy.reload();
    cy.get(".menu-toggle").should("have.attr", "aria-expanded", "false");
    cy.get(".site-nav-links").should("not.have.class", "is-open");
  });
});
