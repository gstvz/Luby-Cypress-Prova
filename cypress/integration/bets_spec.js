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

  it("Should delete game from cart.", () => {
    for (let index = 0; index < 5; index++) {
      cy.get(".sc-clIzBv > :nth-child(1)").click();
      cy.get(".sc-Galmp").click();
      cy.contains("Game added to cart!").should("be.visible");
    }
    cy.get(".sc-ZOtfp > :nth-child(1) > button").click();
    cy.get(".swal2-confirm").click();
    cy.get(".swal2-confirm").click();
  });
});
