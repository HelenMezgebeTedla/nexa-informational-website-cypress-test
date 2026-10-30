Cypress.Commands.add("visitHome", () => {
  cy.visit("/");
});

Cypress.Commands.add("assertMainSections", () => {
  cy.get("section#home").should("be.visible");
  cy.get("section#about").should("be.visible");
  cy.get("section#product").should("be.visible");
  cy.get("section#team").should("be.visible");
  cy.get("section#contact").should("be.visible");
});
