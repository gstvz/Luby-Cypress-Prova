import { existingUser, url } from "../support/";

describe("Betting Flow.", () => {
  const { email, password } = existingUser;

  beforeEach(() => {
    cy.visit(url);
    cy.signin(email, password, 200, "User logged 👌");
    cy.get(".sc-cidDSM").click();
  });

  it("Should change game informations when game changes.", () => {
    cy.get(".sc-jeraig>button").each((button) => {
      cy.get(button).click();
    });
  });

  it("Should not allow to save bet with cart value below 10.", () => {
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

  it("Should save bet with cart value above 10.", () => {
    cy.intercept("POST", "**/bet/new-bet").as("newBet");

    for (let index = 0; index < 4; index++) {
      cy.get(".sc-clIzBv > :nth-child(1)").click();
      cy.get(".sc-Galmp").click();
      cy.contains("Game added to cart!").should("be.visible");
    }

    cy.get(".sc-cZMNgc").click();
    cy.wait("@newBet").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(200);
    });
    cy.contains("Bet saved! 👌").should("be.visible");
  });
});
