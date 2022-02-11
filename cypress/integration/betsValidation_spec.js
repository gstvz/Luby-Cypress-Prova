import { existingUser, url } from "../support/";

describe("Betting Validations Flow.", () => {
  const { email, password } = existingUser;

  it("Should not allow to save bet with cart value below 10.", () => {
    cy.visit(url);
    cy.signin(email, password, 200, "User logged 👌");
    cy.get(".sc-cidDSM").click();

    for (let index = 0; index < 3; index++) {
      cy.get(".sc-clIzBv > :nth-child(1)").click();
      cy.get(".sc-Galmp").click();
      cy.contains("Game added to cart!").should("be.visible");
    }

    cy.get(".sc-cZMNgc").click();
    cy.contains("The cart hasnt reached the minimun value of R$ 10,00!").should(
      "be.visible"
    );
  });
});
