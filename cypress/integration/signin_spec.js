import { existingUser, url } from "../support/";

describe("User Sign In and Log Out Flow.", () => {
  const { email, password } = existingUser;
  beforeEach(() => {
    cy.visit(url);
  });

  it("Should not authenticate unauthorized user.", () => {
    cy.signin(
      "unauthorized@email.com",
      "123456",
      401,
      "Invalid email or password."
    );
  });

  it("Should authenticate user and then logout.", () => {
    cy.signin(email, password, 200, "User logged 👌");

    cy.get(":nth-child(2) > .sc-crHmcD").click();
  });
});
