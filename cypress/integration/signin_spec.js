import { existingUser, url } from "../support/";

describe("User Sign In and Log Out", () => {
  const { email, password } = existingUser;
  beforeEach(() => {
    cy.visit(url);
  });

  it("Should not authenticate unauthorized user.", () => {
    cy.intercept("POST", "**/login").as("login");

    cy.signin("unauthorized@email.com", "123456");

    cy.wait("@login").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(401);
    });
    cy.contains('Invalid email or password.').should('be.visible');
  });

  it("Should authenticate user and then logout.", () => {
    cy.intercept("POST", "**/login").as("login");

    cy.signin(email, password);

    cy.wait("@login").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(200);
    });
    cy.contains('User logged').should('be.visible');

    cy.get(':nth-child(2) > .sc-crHmcD').click();
  });
});
