import { existingUser, url } from "../support/";

describe("User Sign Up Flow.", () => {
  const { name, email, password } = existingUser;
  beforeEach(() => {
    cy.visit(`${url}/auth/register`);
  });

  it("Should register user.", () => {
    cy.signup("dasd", "dasds@dsad.com", "123456", 200, "User registered! 👌");
  });

  it("Should not register user already registered.", () => {
    cy.signup(
      name,
      email,
      password,
      400,
      "Request failed with status code 400"
    );
  });
});
