/// <reference types="cypress" />
import loginPage from "../fixtures/loginPage.json";
import data from "../fixtures/data.json";
import activeOrganizationMainBoard from "../fixtures/activeOrganizationsMainBoard.json";
import commonData from "../fixtures/commonData.json";
import navigation from "../fixtures/navigation.json";
describe("Test of Organizations", () => {
  context("Add new organization test", () => {
    it("Login to app", () => {
      cy.visit("/");
      cy.get(loginPage.emailInput).clear().type(data.user.email);
      cy.get(loginPage.passwordInput).clear().type(data.user.password);
      cy.get(loginPage.loginButton).click();
      cy.wait(3000);
    });
    it("no name new organization", () => {
      cy.get(activeOrganizationMainBoard.addNewOrganization).click();
      cy.get(activeOrganizationMainBoard.buttonNext).click({ force: true });
    });
    it("only spaces in new organization name input", () => {
      cy.get(activeOrganizationMainBoard.newOrganizationNameInput)
        .clear()
        .type(commonData.negativeData.onlySpaces);
      cy.get(activeOrganizationMainBoard.buttonNext).click({ force: true });
    });
    it("257 character in new organization name input", () => {
      cy.get(activeOrganizationMainBoard.newOrganizationNameInput)
        .clear()
        .type(commonData.negativeData.tooLongString257);
      cy.get(activeOrganizationMainBoard.buttonNext).click();
      if (activeOrganizationMainBoard.buttonPrevious != "disabled") {
        cy.get(activeOrganizationMainBoard.buttonPrevious).click({
          force: true,
        });
      }
    });
    it("script code in new organization name input", () => {
      cy.get(activeOrganizationMainBoard.newOrganizationNameInput)
        .clear()
        .type(commonData.negativeData.scriptCodeInjection);
      cy.get(activeOrganizationMainBoard.buttonNext).click({ force: true });
    });
    it("valid new organization create", () => {
      if (activeOrganizationMainBoard.buttonPrevious != "disabled") {
        cy.get(activeOrganizationMainBoard.buttonPrevious).click();
        cy.get(activeOrganizationMainBoard.addNewOrganization).click({
          force: true,
        });
      }
      cy.get(activeOrganizationMainBoard.newOrganizationNameInput)
        .clear()
        .type(commonData.validData.testName);
      cy.get(activeOrganizationMainBoard.buttonNext).click();
      cy.get(activeOrganizationMainBoard.buttonNext).click();
      if (activeOrganizationMainBoard.okButton != "disabled") {
        cy.get(activeOrganizationMainBoard.okButton).click();
      }
    });
  });
  context("Edit created organization", () => {
    it("change organization name", () => {
      cy.get(navigation.siteLogoButton).click();
      cy.get(activeOrganizationMainBoard.editOrganization).click();
      cy.get(activeOrganizationMainBoard.editOrganizationNameInput)
        .clear()
        .type(commonData.validData.editedName);
      cy.get(activeOrganizationMainBoard.confirmOrgNameEdit).click();
    });
  });
  context("Delete created/edited organization", () => {
    it("archive organization", () => {
      cy.get(activeOrganizationMainBoard.archiveMyOrganizationButton).click({
        force: true,
      });
      cy.get(
        activeOrganizationMainBoard.confirmDeleteMyOrganizationButton
      ).click();
    });
    it("delete organization", () => {
      cy.get(activeOrganizationMainBoard.deleteOrganizationButton).click({
        force: true,
      });
      cy.get(activeOrganizationMainBoard.passwordConfirmForDeleteInput).type(
        data.user.password
      );
      cy.get(
        activeOrganizationMainBoard.passwordConfirmForDeleteButton
      ).click();
    });
  });
});
