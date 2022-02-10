import { url } from "../support";

describe("User Sign Up Fields Validation", () => {
  beforeEach(() => {
    cy.visit(`${url}/auth/register`);
  });

  it("Should not allow empty fields.", () => {
    cy.get(".sc-iJKOTD").click();
    cy.get('[for="name"]').contains("Required field.").should("be.visible");
    cy.get('[for="email"]').contains("Required field.").should("be.visible");
    cy.get('[for="password"]').contains("Required field.").should("be.visible");
  });

  it("Should receive only letters, acentuation and spaces on name.", () => {
    cy.get("#name").type("1#%_456");
    cy.get(".sc-iJKOTD").click();
    cy.contains("Must contain only letters, acentuation and spaces.").should(
      "be.visible"
    );
  });

  it("Should not accept invalid email.", () => {
    cy.get("#email").type("invalid email");
    cy.get(".sc-iJKOTD").click();
    cy.contains("Invalid email.").should("be.visible");
  });

  it("Should not accept password with more than 6 characters.", () => {
    cy.get("#password").type("1111111");
    cy.get(".sc-iJKOTD").click();
    cy.contains("Must have a maximum of 6 characters.").should("be.visible");
  });
});
