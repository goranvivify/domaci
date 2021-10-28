/// <reference types="cypress" />
import loginPage from "../fixtures/loginPage.json";
import data from "../fixtures/data.json";
import activeOrganizationMainBoard from "../fixtures/activeOrganizationsMainBoard.json";
import commonData from "../fixtures/commonData.json";
import navigation from "../fixtures/navigation.json";
import dataFromRegister from "../fixtures/dataFromRegister.json";
describe("Test of Organizations", () => {
  before("Login to app", () => {
    cy.intercept("/api/v2/common").as("login");
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(dataFromRegister.newUserEmail);
    cy.get(loginPage.passwordInput).clear().type(data.newUser.newPasswordValid);
    cy.get(loginPage.loginButton).click();
    cy.wait("@login").then((res) => {
      expect(res.response.statusCode).to.eq(200);
    });
  });
  context("Add new organization test", () => {
    it("no name new organization", () => {
      cy.get(activeOrganizationMainBoard.addNewOrganization).click();
      cy.get(activeOrganizationMainBoard.buttonNext).should("be.disabled");
      cy.get(activeOrganizationMainBoard.buttonNext).click({ force: true });
    });
    it("only spaces in new organization name input", () => {
      cy.get(activeOrganizationMainBoard.newOrganizationNameInput)
        .clear()
        .type(commonData.negativeData.onlySpaces);
      cy.get(activeOrganizationMainBoard.buttonNext).should("be.disabled");
      cy.get(activeOrganizationMainBoard.buttonNext).click({ force: true });
    });
    it("257 character in new organization name input", () => {
      cy.get(activeOrganizationMainBoard.newOrganizationNameInput)
        .clear()
        .type(commonData.negativeData.tooLongString257);
      cy.get(activeOrganizationMainBoard.buttonNext).should("be.disabled");
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
      cy.get(activeOrganizationMainBoard.buttonNext).should("be.disabled");
      cy.get(activeOrganizationMainBoard.buttonNext).click({ force: true });
    });
    it("valid new organization create", () => {
      cy.intercept("/api/v2/organizations").as("createOrganization");
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
      cy.wait("@createOrganization").then((res) => {
        expect(res.response.statusCode).to.eq(200);
        expect(res.response.body.owner_id).to.eq(dataFromRegister.ownerId);
        expect(res.response.body.users[0].company_name).to.eq(
          data.newUser.companyName
        );
        expect(res.response.body.users[0].email).to.eq(
          dataFromRegister.newUserEmail
        );
        expect(res.response.body.users[0].full_name).to.eq(
          data.newUser.full_name
        );
        var newOrganizationId = res.response.body.id;
        cy.writeFile("cypress/fixtures/dataFromCreate.json", {
          newOrganizationId: newOrganizationId,
        });
      });
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
        data.newUser.newPasswordValid
      );
      cy.get(
        activeOrganizationMainBoard.passwordConfirmForDeleteButton
      ).click();
    });
  });
});
