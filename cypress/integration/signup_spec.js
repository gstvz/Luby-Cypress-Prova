import { existingUser, url } from "../support/";

describe("User Sign Up", () => {
  const { name, email, password } = existingUser;
  beforeEach(() => {
    cy.visit(`${url}/auth/register`);
  });

  it("Should register user.", () => {
    cy.intercept("POST", "**/user/create").as("register");

    cy.signup(name, email, password);

    cy.wait("@register").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(200);
    });
  });

  it("Should not register user already registered.", () => {
    cy.intercept("POST", "**/user/create").as("register");

    cy.signup(name, email, password);

    cy.wait("@register").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(400);
    });
  });
});
