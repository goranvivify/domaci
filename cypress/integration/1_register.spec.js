/// <reference types="cypress" />
import loginPage from "../fixtures/loginPage.json";
import registerPage from "../fixtures/registerPage.json";
import data from "../fixtures/data.json";
import validationGetters from "../fixtures/validationGetters.json";
import validations from "../fixtures/validations.json";
import navigation from "../fixtures/navigation.json";
import sidebar from "../fixtures/sidebar.json";
import myAccountPage from "../fixtures/myAccountPage.json";
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
  before("Visit register page", () => {
    cy.visit("/");
    cy.get(loginPage.signUpButton).click();
    cy.get(registerPage.chooseStarter).click({
      force: true,
    });
  });
  after("Logout", () => {
    cy.get(navigation.myAccountBtn).click({ force: true });
    cy.get(sidebar.myAccountButton).click();
    cy.get(myAccountPage.logoutBtn).click();
  });
  it("visit register page", () => {
    cy.intercept("/api/v2/pricing-plans/**").as("register");
    cy.reload();
    cy.wait("@register").then((res) => {
      expect(res.response.statusCode).to.eq(200);
    });
  });
  context("Email input test", () => {
    it("empty email", () => {
      cy.get(registerPage.showPasswordButton).click();
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.newUser.newPasswordValid, { force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("only spaces in email", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.negativData.email.onlySpaces);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.user.password, { force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("no body in email", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.negativData.email.noBodyEmail);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.user.password, { force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("no @ in email", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.negativData.email.noMonkeySignEmail);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.user.password, { force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("no '.com' in email", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.negativData.email.noExtEmailDot);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.user.password, { force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("no 'com' in email", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.negativData.email.noExtEmail);
      cy
        .get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.user.password, { force: true }),
        cy
          .get(registerPage.numberOfUsers)
          .clear({ force: true })
          .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.email).should(
        "have.text",
        validations.registerAndLoginPage.email.validEmail
      );
    });
    it("already taken email", () => {
      cy.intercept("/api/v2/register").as("takenEmail");
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.user.email);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.user.password, { force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
      cy.get(registerPage.emailAlreadyTakenModal)
        .should("be.visible")
        .and("have.text", "User with that email already exists");
      cy.wait("@takenEmail").then((res) => {
        expect(res.request.body.email).to.eq(data.user.email);
        expect(res.request.body.finished_registration).to.eq(true);
        expect(res.request.body.agreed_to_terms).to.eq(true);
        expect(res.request.body.password).to.eq(data.user.password);
        expect(res.request.body.plan_id).to.eq("1");
        expect(res.request.body.plan_type).to.eq("yearly");
        expect(res.request.body.referal).to.eq(null);
        expect(res.request.body.repeatpassword).to.eq(data.user.password);
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
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput).clear({ force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.password).should(
        "have.text",
        validations.registerAndLoginPage.password.passwordRequired
      );
    });
    it("only spaces in password", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.newUser.newEmailValid);
      cy
        .get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.negativData.password.onlySpacesPassword, { force: true }),
        cy
          .get(registerPage.numberOfUsers)
          .clear({ force: true })
          .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.password).should(
        "have.text",
        validations.registerAndLoginPage.password.passwordRequired
      );
    });
    it("only one letter in password", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.negativData.password.oneLetterPassword, { force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.password).should(
        "have.text",
        validations.registerAndLoginPage.password.atLeast5Characters
      );
    });
    it("4 characters in password", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.negativData.password.FourCharactersPassword, {
          force: true,
        });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.password).should(
        "have.text",
        validations.registerAndLoginPage.password.atLeast5Characters
      );
    });
  });
  context("number of users input test", () => {
    it("empty number of users", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.newUser.newPasswordValid, { force: true });
      cy.get(registerPage.numberOfUsers).clear({ force: true });
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.numberOfUsers).should(
        "have.text",
        validations.registerAndLoginPage.numberOfUsers.required
      );
    });
    it("letters instead of numbers in number of users", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.newUser.newPasswordValid, { force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.negativData.numberOfUsers.letters);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.numberOfUsers).should(
        "have.text",
        validations.registerAndLoginPage.numberOfUsers.mustBeInteger
      );
    });
    it("zero of users", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.newUser.newPasswordValid, { force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.negativData.numberOfUsers.zero);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.numberOfUsers).should(
        "have.text",
        validations.registerAndLoginPage.numberOfUsers.from1to10
      );
    });
    it("more than ten number of users", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.newUser.newPasswordValid, { force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.negativData.numberOfUsers.moreThanTen);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.numberOfUsers).should(
        "have.text",
        validations.registerAndLoginPage.numberOfUsers.from1to10
      );
    });
    it("negative number of users", () => {
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(data.newUser.newEmailValid);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.newUser.newPasswordValid, { force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.negativData.numberOfUsers.negativeNumber);
      cy.get(registerPage.startTrialButton).click();
      cy.get(validationGetters.registerPage.numberOfUsers).should(
        "have.text",
        validations.registerAndLoginPage.numberOfUsers.from1to10
      );
    });
  });
  context("All input fileds empty", () => {
    it("empty input fields", () => {
      cy.get(registerPage.emailInput).clear({ force: true });
      cy.get(registerPage.passwordInput).clear({ force: true });
      cy.get(registerPage.numberOfUsers).clear({ force: true });
      cy.get(registerPage.startTrialButton).click();
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
      cy.get(registerPage.emailInput)
        .clear({ force: true })
        .type(`goran.pobric+${randomString(5)}@gmail.com`);
      cy.get(registerPage.passwordInput)
        .clear({ force: true })
        .type(data.newUser.newPasswordValid, { force: true });
      cy.get(registerPage.numberOfUsers)
        .clear({ force: true })
        .type(data.newUser.numberOfUsersValid);
      cy.get(registerPage.startTrialButton).click();
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
