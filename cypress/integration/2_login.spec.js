/// <reference types="cypress" />
import loginPage from "../fixtures/loginPage.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";
import navigation from "../fixtures/navigation.json";
import myAccountPage from "../fixtures/myAccountPage.json";
import dataFromRegister from "../fixtures/dataFromRegister.json";
import validationGetters from "../fixtures/validationGetters.json";
import validations from "../fixtures/validations.json";

describe("Login tests", () => {
  before("visit login page", () => {
    cy.visit("/");
  });
  after("logout", () => {
    cy.intercept("/api/v2/logout").as("logout");
    cy.get(navigation.myAccountBtn).click();
    cy.get(sidebar.myAccountButton).click();
    cy.get(myAccountPage.logoutBtn).click();
    cy.wait("@logout").then((res) => {
      expect(res.response.body.message).to.eq("Successfully logged out");
    });
  });
  context("Email input test", () => {
    it("empty email", () => {
      cy.get(loginPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(loginPage.loginButton).click();
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("only spaces in email", () => {
      cy.get(loginPage.emailInput)
        .clear()
        .type(data.negativData.email.onlySpaces);
      cy.get(loginPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(loginPage.loginButton).click();
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("no body in email", () => {
      cy.get(loginPage.emailInput)
        .clear()
        .type(data.negativData.email.noBodyEmail);
      cy.get(loginPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(loginPage.loginButton).click();
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("no @sign in email", () => {
      cy.get(loginPage.emailInput)
        .clear()
        .type(data.negativData.email.noMonkeySignEmail);
      cy.get(loginPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(loginPage.loginButton).click();
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it('no ".com" in emal', () => {
      cy.get(loginPage.emailInput)
        .clear()
        .type(data.negativData.email.noExtEmailDot);
      cy.get(loginPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(loginPage.loginButton).click();
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it('no "com" in email', () => {
      cy.get(loginPage.emailInput)
        .clear()
        .type(data.negativData.email.noExtEmail);
      cy.get(loginPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(loginPage.loginButton).click();
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("non valid email", () => {
      cy.get(loginPage.emailInput)
        .clear()
        .type(data.negativData.email.nonValidEmail);
      cy.get(loginPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(loginPage.loginButton).click();
      cy.get(validationGetters.loginPage.loginButton).should(
        "have.text",
        validations.registerAndLoginPage.loginButton
      );
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
      cy.intercept("/api/v2/common").as("login");
      cy.get(loginPage.emailInput).clear().type(dataFromRegister.newUserEmail);
      cy.get(loginPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(loginPage.loginButton).click();
      cy.intercept("/api/v2/organizations-data").as("afterLogin");
      cy.wait("@afterLogin").then((res) => {
        console.log("AFTER LOGIN RESPONSE");
        console.log(res);
      });
      cy.get(loginPage.finishRegisterAfterLoginModal.firstNameInput)
        .should("be.visible")
        .clear()
        .type(data.newUser.firstName);

      cy.get(loginPage.finishRegisterAfterLoginModal.lastNameInput)
        .should("be.visible")
        .clear()
        .type(data.newUser.lastName);

      cy.get(loginPage.finishRegisterAfterLoginModal.companyNameInput)
        .should("be.visible")
        .clear()
        .type(data.newUser.companyName);

      cy.get(loginPage.finishRegisterAfterLoginModal.organizationNameInput)
        .should("be.visible")
        .clear()
        .type(data.newUser.organizationName);

      cy.get(loginPage.finishRegisterAfterLoginModal.finishRegistrationButton)
        .should("be.visible")
        .click({ force: true });

      cy.wait("@login").then((res) => {
        expect(res.response.body.active_user.email).to.eq(
          dataFromRegister.newUserEmail
        );
        expect(res.response.body.active_user.id).to.eq(
          dataFromRegister.ownerId
        );
        expect(res.response.statusCode).to.eq(200);
      });
    });
  });
});
