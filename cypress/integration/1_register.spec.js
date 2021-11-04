/// <reference types="cypress" />

import registerPage from "../fixtures/registerPage.json";
import data from "../fixtures/data.json";
import validationGetters from "../fixtures/validationGetters.json";
import validations from "../fixtures/validations.json";
import authRegister from "../models/registerModule";
import faker from "faker";
function randomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe("Register new user", () => {
  beforeEach("Visit register page", () => {
    authRegister.goToRegister();
  });
  after("Logout", () => {
    authRegister.logout();
  });
  // it("visit register page", () => {
  //   cy.intercept("/api/v2/pricing-plans/**").as("register");
  //   cy.reload();
  //   cy.wait("@register").then((res) => {
  //     expect(res.response.statusCode).to.eq(200);
  //   });
  // });
  context("Email input test", () => {
    it("empty email", () => {
      authRegister.register({
        email: "",
      });
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("only spaces in email", () => {
      authRegister.register({
        email: data.negativeData.email.onlySpaces,
      });
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("no body in email", () => {
      authRegister.register({
        email: data.negativeData.email.noBodyEmail,
      });
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("no @ in email", () => {
      authRegister.register({
        email: data.negativeData.email.noMonkeySignEmail,
      });
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("no '.com' in email", () => {
      authRegister.register({
        email: data.negativeData.email.noExtEmailDot,
      });
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("no 'com' in email", () => {
      authRegister.register({
        email: data.negativeData.email.noExtEmail,
      });
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("already taken email", () => {
      cy.intercept("/api/v2/register").as("takenEmail");
      authRegister.register({ email: data.user.email });
      cy.get(registerPage.emailAlreadyTakenModal)
        .should("be.visible")
        .and("have.text", "User with that email already exists");
      cy.wait("@takenEmail").then((res) => {
        expect(res.request.body.email).to.eq(data.user.email);
        expect(res.request.body.finished_registration).to.eq(true);
        expect(res.request.body.agreed_to_terms).to.eq(true);
        expect(res.request.body.password).to.eq(data.newUser.newPasswordValid);
        expect(res.request.body.plan_id).to.eq("1");
        expect(res.request.body.plan_type).to.eq("yearly");
        expect(res.request.body.referal).to.eq(null);
        expect(res.request.body.repeatpassword).to.eq(
          data.newUser.newPasswordValid
        );
        expect(res.response.statusCode).to.eq(401);
        expect(res.response.body.message.email[0]).to.eq(
          "User with this email already has an account."
        );
        expect(res.response.statusMessage).to.eq("Unauthorized");
      });
    });
  });
  context("Password input test", () => {
    it("empty password", () => {
      authRegister.register({ password: "" });
      cy.get(validationGetters.registerPage.password).should(
        "have.text",
        validations.registerAndLoginPage.passwordRequired
      );
    });
    it("only spaces in password", () => {
      authRegister.register({
        password: data.negativeData.password.onlySpacesPassword,
      });
      cy.get(validationGetters.registerPage.password).should(
        "have.text",
        validations.registerAndLoginPage.password.passwordRequired
      );
    });
    it("only one letter in password", () => {
      authRegister.register({
        password: data.negativeData.password.oneLetterPassword,
      });
      cy.get(validationGetters.registerPage.password).should(
        "have.text",
        validations.registerAndLoginPage.password.atLeast5Characters
      );
    });
    it("4 characters in password", () => {
      authRegister.register({
        password: data.negativeData.password.FourCharactersPassword,
      });
      cy.get(validationGetters.registerPage.password).should(
        "have.text",
        validations.registerAndLoginPage.password.atLeast5Characters
      );
    });
  });
  context("number of users input test", () => {
    it("empty number of users", () => {
      authRegister.register({
        numberOfUsers: "",
      });
      cy.get(validationGetters.registerPage.numberOfUsers).should(
        "have.text",
        validations.registerAndLoginPage.numberOfUsers.required
      );
    });
    it("letters instead of numbers in number of users", () => {
      authRegister.register({
        numberOfUsers: data.negativeData.numberOfUsers.letters,
      });
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.numberOfUsers).should(
        "have.text",
        validations.registerAndLoginPage.numberOfUsers.mustBeInteger
      );
    });
    it("zero of users", () => {
      authRegister.register({
        numberOfUsers: data.negativeData.numberOfUsers.zero,
      });
      cy.get(validationGetters.registerPage.numberOfUsers).should(
        "have.text",
        validations.registerAndLoginPage.numberOfUsers.from1to10
      );
    });
    it("more than ten number of users", () => {
      authRegister.register({
        numberOfUsers: data.negativeData.numberOfUsers.moreThanTen,
      });
      cy.get(validationGetters.registerPage.numberOfUsers).should(
        "have.text",
        validations.registerAndLoginPage.numberOfUsers.from1to10
      );
    });
    it("negative number of users", () => {
      authRegister.register({
        numberOfUsers: data.negativeData.numberOfUsers.negativeNumber,
      });
      cy.get(validationGetters.registerPage.numberOfUsers).should(
        "have.text",
        validations.registerAndLoginPage.numberOfUsers.from1to10
      );
    });
  });
  context("All input fileds empty", () => {
    it("empty input fields", () => {
      authRegister.register({
        email: "",
        password: "",
        numberOfUsers: "",
      });
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
      cy.get(validationGetters.registerPage.password).should(
        "have.text",
        validations.registerAndLoginPage.password.passwordRequired
      );
      cy.get(validationGetters.registerPage.numberOfUsers).should(
        "have.text",
        validations.registerAndLoginPage.numberOfUsers.required
      );
    });
  });
  context("Valid register", () => {
    it("register new user", () => {
      cy.intercept("/api/v2/organizations-data").as("validReg");
      authRegister.register({
        email: `goran.pobric+${randomString(5)}@gmail.com`,
      });
      cy.wait("@validReg").then((res) => {
        expect(res.response.statusCode).to.eq(200);
        expect(res.response.statusMessage).to.eq("OK");
        var ownerId = res.response.body[0].owner_id;
        var userId = res.response.body[0].id;
        var createdUserEmail = res.response.body[0].users[0].email;
        cy.writeFile("cypress/fixtures/dataFromRegister.json", {
          userId: userId,
          ownerId: ownerId,
          newUserEmail: createdUserEmail,
        });
      });
    });
  });
});
