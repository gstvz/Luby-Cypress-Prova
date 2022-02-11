import { existingUser, url } from "../support";

describe("Games filtering", () => {
  const { email, password } = existingUser;

  beforeEach(() => {
    cy.visit(url);
    cy.signin(email, password, 200, "User logged 👌");
  });
  
  it.skip('Should filter each game type.', () => {
    cy.get('.sc-bBHHxi>button').each((button) => {
      cy.get(button).click();
      cy.get(button).click();
    })
  });

  it('Should filter more than one game type.', () => {
    cy.get('.sc-bBHHxi>button').each((button) => {
      cy.get(button).click();
    })
  });
})