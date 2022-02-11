import { existingUser, url } from "../support/";

describe("Reset Password Validations Flow.", () => {
  const { email } = existingUser;
  beforeEach(() => {
    cy.visit(`${url}/auth/reset`);
  });

  it("Should not allow empty email field.", () => {
    cy.intercept("POST", "**/reset").as("reset");

    cy.get(".sc-iJKOTD").click();
  });

  it("Should send link to authorized user but not allow empty password field.", () => {
    cy.resetPassword(email, 200, "Link sent");

    cy.get(".sc-iJKOTD").click();
  });

  it("Should send link to authorized user but not allow a password with more than 6 characters.", () => {
    cy.resetPassword(email, 200, "Link sent");

    cy.get("#password").type("1111111");
    cy.get(".sc-iJKOTD").click();
    cy.contains("Must have a maximum of 6 characters.").should("be.visible");
  });
});
