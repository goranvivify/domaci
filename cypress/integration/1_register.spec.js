/// <reference types="cypress" />
import loginPage from "../fixtures/loginPage.json";
import registerPage from "../fixtures/registerPage.json";
import data from "../fixtures/data.json";
describe("Register new user", () => {
  it("visit register page", () => {
    cy.visit("/");
    cy.get(loginPage.signUpButton).click();
  });
  it("Choose Starter", () => {
    cy.get(registerPage.chooseStarter).click({
      force: true,
    });
  });
  context("Email input test", () => {
    it("empty email", () => {
      cy.get(registerPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
    });
    it("only spaces in email", () => {
      cy.get(registerPage.emailInput)
        .clear()
        .type(data.negativData.email.onlySpaces);
      cy.get(registerPage.passwordInput).clear().type(data.user.password);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
    });
    it("no body in email", () => {
      cy.get(registerPage.emailInput)
        .clear()
        .type(data.negativData.email.noBodyEmail);
      cy.get(registerPage.passwordInput).clear().type(data.user.password);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
    });
    it("no @ in email", () => {
      cy.get(registerPage.emailInput)
        .clear()
        .type(data.negativData.email.noMonkeySignEmail);
      cy.get(registerPage.passwordInput).clear().type(data.user.password);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
    });
    it("no '.com' in email", () => {
      cy.get(registerPage.emailInput)
        .clear()
        .type(data.negativData.email.noExtEmailDot);
      cy.get(registerPage.passwordInput).clear().type(data.user.password);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
    });
    it("no 'com' in email", () => {
      cy.get(registerPage.emailInput)
        .clear()
        .type(data.negativData.email.noExtEmail);
      cy.get(registerPage.passwordInput).clear().type(data.user.password);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
    });
    it("non valid email", () => {
      cy.get(registerPage.emailInput)
        .clear()
        .type(data.negativData.email.nonValidEmail);
      cy.get(registerPage.passwordInput).clear().type(data.user.password);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
    });
  });
  context("Password input test", () => {
    it("empty password", () => {
      cy.get(registerPage.emailInput).clear().type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput).clear();
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
    });
    it("only spaces in password", () => {
      cy.get(registerPage.emailInput).clear().type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear()
        .type(data.negativData.password.onlySpacesPassword);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
    });
    it("only one letter in password", () => {
      cy.get(registerPage.emailInput).clear().type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear()
        .type(data.negativData.password.oneLetterPassword);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
    });
    it("4 characters in password", () => {
      cy.get(registerPage.emailInput).clear().type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear()
        .type(data.negativData.password.FourCharactersPassword);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
    });
  });
  context("number of users input test", () => {
    it("empty number of users", () => {
      cy.get(registerPage.emailInput).clear().type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(registerPage.numberOfUsers).clear();
      cy.get(registerPage.startTrialButton).click();
    });
    it("letters instead of numbers in number of users", () => {
      cy.get(registerPage.emailInput).clear().type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.negativData.numberOfUsers.letters);
      cy.get(registerPage.startTrialButton).click();
    });
    it("zero of users", () => {
      cy.get(registerPage.emailInput).clear().type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.negativData.numberOfUsers.zero);
      cy.get(registerPage.startTrialButton).click();
    });
    it("more than ten number of users", () => {
      cy.get(registerPage.emailInput).clear().type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.negativData.numberOfUsers.moreThanTen);
      cy.get(registerPage.startTrialButton).click();
    });
    it("negative number of users", () => {
      cy.get(registerPage.emailInput).clear().type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.negativData.numberOfUsers.negativeNumber);
      cy.get(registerPage.startTrialButton).click();
    });
  });
  context("All input fileds empty", () => {
    it("empty input fileds", () => {
      cy.get(registerPage.emailInput).clear();
      cy.get(registerPage.passwordInput).clear();
      cy.get(registerPage.numberOfUsers).clear();
      cy.get(registerPage.startTrialButton).click();
    });
  });
  // Valid register is skipped
  context("Valid register", () => {
    it.skip("register new user", () => {
      cy.get(registerPage.emailInput).clear().type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(registerPage.numberOfUsers)
        .clear()
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
    });
  });
});
