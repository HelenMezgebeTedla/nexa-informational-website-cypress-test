describe("Nexa informational website", () => {
  beforeEach(() => {
    cy.visitHome();
  });

  it("loads the homepage and key sections", () => {
    cy.contains("Smarter Freight").should("be.visible");
    cy.assertMainSections();
  });

  it("shows the navigation links and contact CTA", () => {
    cy.contains("Home").should("be.visible");
    cy.contains("About us").should("be.visible");
    cy.contains("Product").should("be.visible");
    cy.contains("Team").should("be.visible");
    cy.contains("Contact Us").should("be.visible");
    cy.contains("Get Started").should("be.visible");
  });

  it("has a reachable contact form", () => {
    cy.get("section#contact")
      .scrollIntoView()
      .within(() => {
        cy.get("form").should("exist");
        cy.contains("Get in touch").should("be.visible");
      });
  });
});
