import { existingUser, url } from "../support/";

describe("Betting games", () => {
  const { email, password } = existingUser;

  beforeEach(() => {
    cy.visit(url);
    cy.signin(email, password, 200, "User logged 👌");
    cy.get(".sc-cidDSM").click();
  });

  it("Should change game informations.", () => {
    cy.get(".sc-jeraig>button").each((button) => {
      cy.get(button).click();
    });
  });

  it("Should not allow to save bet with cart value smaller than 10.", () => {
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

  it("Should save bet.", () => {
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
