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
        cy.get('input[name="companyWebsite"]').should("have.attr", "tabindex", "-1");
        cy.get('input[name="companyWebsite"]').should("have.attr", "autocomplete", "off");
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
    cy.get("section#contact h2, section#contact h3").should("have.length.at.least", 1);
    cy.get("main, section, nav, footer").should("have.length.greaterThan", 1);
  });

  it("runs over HTTPS and exposes secure response headers", () => {
    cy.location("protocol").should("eq", "https:");

    cy.request("https://nexa-informational-website.vercel.app/").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("text/html");
      expect(response.headers["strict-transport-security"]).to.include("max-age");
    });
  });
});
