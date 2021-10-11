/// <reference types="cypress" />
import loginPage from "../fixtures/loginPage.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";
import navigation from "../fixtures/navigation.json";
import myAccountPage from "../fixtures/myAccountPage.json";
describe("First Cypress block", () => {
  context("Email input test", () => {
    it("visit login page", () => {
      cy.visit("/");
    });
    it("empty email", () => {
      cy.get(loginPage.passwordInput).clear().type(data.user.password);
      cy.get(loginPage.loginButton).click();
    });
    it("only spaces in email", () => {
      cy.get(loginPage.emailInput)
        .clear()
        .type(data.negativData.email.onlySpaces);
      cy.get(loginPage.passwordInput).clear().type(data.user.password);
      cy.get(loginPage.loginButton).click();
    });
    it("no body in email", () => {
      cy.get(loginPage.emailInput)
        .clear()
        .type(data.negativData.email.noBodyEmail);
      cy.get(loginPage.passwordInput).clear().type(data.user.password);
      cy.get(loginPage.loginButton).click();
    });
    it("no @sign in email", () => {
      cy.get(loginPage.emailInput)
        .clear()
        .type(data.negativData.email.noMonkeySignEmail);
      cy.get(loginPage.passwordInput).clear().type(data.user.password);
      cy.get(loginPage.loginButton).click();
    });
    it('no ".com" in emal', () => {
      cy.get(loginPage.emailInput)
        .clear()
        .type(data.negativData.email.noExtEmailDot);
      cy.get(loginPage.passwordInput).clear().type(data.user.password);
      cy.get(loginPage.loginButton).click();
    });
    it('no "com" in email', () => {
      cy.get(loginPage.emailInput)
        .clear()
        .type(data.negativData.email.noExtEmail);
      cy.get(loginPage.passwordInput).clear().type(data.user.password);
      cy.get(loginPage.loginButton).click();
    });
    it("non valid email", () => {
      cy.get(loginPage.emailInput)
        .clear()
        .type(data.negativData.email.nonValidEmail);
      cy.get(loginPage.passwordInput).clear().type(data.user.password);
      cy.get(loginPage.loginButton).click();
    });
  });
  context("Password input test", () => {
    it("visit login page", () => {
      cy.visit("/");
    });
    it("only spaces in password", () => {
      cy.get(loginPage.emailInput).clear().type(data.user.email);
      cy.get(loginPage.passwordInput)
        .clear()
        .type(data.negativData.password.onlySpacesPassword);
      cy.get(loginPage.loginButton).click();
    });
    it("non valid password", () => {
      cy.get(loginPage.emailInput).clear().type(data.user.email);
      cy.get(loginPage.passwordInput)
        .clear()
        .type(data.negativData.password.nonValidPassword);
      cy.get(loginPage.loginButton).click();
    });
    it("switch letter case in password", () => {
      cy.get(loginPage.emailInput).clear().type(data.user.email);
      cy.get(loginPage.passwordInput)
        .clear()
        .type(data.negativData.password.upperCaseLetterSwitchPassword);
      cy.get(loginPage.loginButton).click();
    });
  });
  context("Valid login + logout", () => {
    it("Valid login", () => {
      cy.get(loginPage.emailInput).clear().type(data.user.email);
      cy.get(loginPage.passwordInput).clear().type(data.user.password);
      cy.get(loginPage.loginButton).click();
    });
    it("logout", () => {
      cy.get(navigation.myAccountBtn).click();
      cy.get(sidebar.myAccountButton).click();
      cy.get(myAccountPage.logoutBtn).click();
    });
  });
});
