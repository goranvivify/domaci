/// <reference types="cypress" />
import data from "../fixtures/data.json";
import validationGetters from "../fixtures/validationGetters.json";
import validations from "../fixtures/validations.json";
import loginModule from "../models/loginModule";

describe("Login tests", () => {
  beforeEach("visit login page", () => {
    cy.visit("/");
  });
  after("logout", () => {
    loginModule.logout();
  });
  context("Email input test", () => {
    it("empty email", () => {
      loginModule.login({ email: "" });
      cy.get(validationGetters.loginPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
      cy.get(validationGetters.loginPage.password).should(
        "have.text",
        validations.registerAndLoginPage.password.passwordRequired
      );
    });
    it("only spaces in email", () => {
      loginModule.login({ email: data.negativeData.email.onlySpaces });
      cy.get(validationGetters.loginPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("no body in email", () => {
      loginModule.login({ email: data.negativeData.email.noBodyEmail });
      cy.get(validationGetters.loginPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("no @sign in email", () => {
      loginModule.login({ email: data.negativeData.email.noMonkeySignEmail });
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it('no ".com" in emal', () => {
      loginModule.login({ email: data.negativeData.email.noExtEmailDot });
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it('no "com" in email', () => {
      loginModule.login({ email: data.negativeData.email.noExtEmail });
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("non valid email", () => {
      loginModule.login({ email: data.negativeData.email.nonValidEmail });
      cy.get(validationGetters.loginPage.loginButton).should(
        "have.text",
        validations.registerAndLoginPage.loginButton
      );
    });
  });
  context("Password input test", () => {
    it("only spaces in password", () => {
      loginModule.login({
        password: data.negativeData.password.onlySpacesPassword,
      });
      cy.get(validationGetters.loginPage.password).should(
        "have.text",
        validations.registerAndLoginPage.password.passwordRequired
      );
    });
    it("non valid password", () => {
      loginModule.login({
        password: data.negativeData.password.nonValidPassword,
      });
      cy.get(validationGetters.loginPage.loginButton).should(
        "have.text",
        validations.registerAndLoginPage.loginButton
      );
    });
    it("switch letter case in password", () => {
      loginModule.login({
        password: data.negativeData.password.upperCaseLetterSwitchPassword,
      });
      cy.get(validationGetters.loginPage.loginButton).should(
        "have.text",
        validations.registerAndLoginPage.loginButton
      );
    });

    context("Valid login + logout", () => {
      it("Valid login", () => {
        cy.login();
        loginModule.cancelRegFinish();
        // loginModule.finishRegistration();
      });
    });
  });
});
