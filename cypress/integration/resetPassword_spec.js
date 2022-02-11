import { existingUser, url } from "../support";

describe("Reset Password Flow.", () => {
  const { email, password } = existingUser;
  beforeEach(() => {
    cy.visit(`${url}/auth/reset`);
  });

  it("Should not send link to unauthorized user.", () => {
    cy.resetPassword(
      "unauthorized@unauthorized.com",
      404,
      "Request failed with status code 404"
    );
  });

  it("Should send link to authorized user and reset password.", () => {
    cy.resetPassword(email, 200, "Link sent");

    cy.intercept("POST", "**/reset/**").as("resetToken");
    cy.get("#password").type(password);

    cy.get(".sc-iJKOTD").click();
    cy.wait("@resetToken").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(200);
    });
    cy.contains("Password reset").should("be.visible");
  });
});
