import { existingUser, url } from "../support/";

describe("User Account Update Validations Flow.", () => {
  const { email, password } = existingUser;
  beforeEach(() => {
    cy.visit(url);
    cy.signin(email, password, 200, "User logged 👌");
    cy.get(":nth-child(1) > .sc-crHmcD").click();
  });

  it("Should not allow empty fields.", () => {
    cy.get(".sc-iJKOTD").click();
    cy.get('[for="name"] > .sc-cxpSdN')
      .contains("Required field.")
      .should("be.visible");
    cy.get('[for="email"] > .sc-cxpSdN')
      .contains("Required field.")
      .should("be.visible");
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
});
