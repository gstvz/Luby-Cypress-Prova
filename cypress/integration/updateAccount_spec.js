import { existingUser, url } from "../support/";

describe("User Account Update", () => {
  const { name, email, password } = existingUser;
  beforeEach(() => {
    cy.visit(url);
    cy.signin(email, password, 200, "User logged 👌");
    cy.get(":nth-child(1) > .sc-crHmcD").click();
  });

  it("Should update user account.", () => {
    cy.intercept("PUT", "**/user/update").as("updateAccount");

    cy.get("#name").type(name);
    cy.get("#email").type(email);

    cy.get(".sc-iJKOTD").click();
    cy.wait("@updateAccount").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(200);
    });
    cy.contains("User updated! 👌").should("be.visible");
  });
});
