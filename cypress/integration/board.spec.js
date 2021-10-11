/// <reference types="cypress" />
import data from "../fixtures/data.json";
import loginPage from "../fixtures/loginPage.json";
import activeOrganizationMainBoard from "../fixtures/activeOrganizationsMainBoard.json";
import commonData from "../fixtures/commonData.json";
import activeBoardMainPanel from "../fixtures/activeBoardMainPanel.json";

context("New board", () => {
  it("log in and visit My Organization", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.user.email);
    cy.get(loginPage.passwordInput).clear().type(data.user.password);
    cy.get(loginPage.loginButton).click();
  });
  it("create organization", () => {
    cy.get(activeOrganizationMainBoard.addNewOrganization).click({
      force: true,
    });
    cy.get(activeOrganizationMainBoard.newOrganizationNameInput)
      .clear()
      .type(commonData.validData.testName);
    cy.get(activeOrganizationMainBoard.buttonNext).click();
    cy.get(activeOrganizationMainBoard.buttonNext).click();
    if (activeOrganizationMainBoard.okButton != "disabled") {
      cy.get(activeOrganizationMainBoard.okButton).click();
    }
  });
  context("Test New Board Creation - name", () => {
    it("only spaces in name", () => {
      cy.get(activeOrganizationMainBoard.addNewBoardButton).click();
      cy.get(
        activeBoardMainPanel.newBoardCreatePanel.organizationDropDownMenu
      ).click({ force: true });
      cy.get(
        activeBoardMainPanel.newBoardCreatePanel
          .organizationDropDownMenuChoiceOne
      ).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.boardTitleNameInput)
        .clear()
        .type(commonData.negativeData.onlySpaces);
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click({
        force: true,
      });
    });
    it("script code in name", () => {
      cy.get(activeBoardMainPanel.newBoardCreatePanel.boardTitleNameInput)
        .clear()
        .type(commonData.negativeData.scriptCodeInjection);
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click({
        force: true,
      });
      cy.get(activeBoardMainPanel.newBoardCreatePanel.backButton).click();
    });
    it("1001 character in name", () => {
      cy.get(activeBoardMainPanel.newBoardCreatePanel.boardTitleNameInput)
        .clear()
        .type(commonData.negativeData.tooLongString1001);
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click({
        force: true,
      });
      cy.get(activeBoardMainPanel.newBoardCreatePanel.backButton).click();
    });
    it("valid name + scrum", () => {
      cy.get(activeBoardMainPanel.newBoardCreatePanel.boardTitleNameInput)
        .clear()
        .type(commonData.validData.testName);
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.chooseSrcumCheck).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click();
    });
  });
});
