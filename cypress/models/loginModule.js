import data from "../fixtures/data.json";
import dataFromRegister from "../fixtures/dataFromRegister.json";
module.exports = {
  get forgotPasswordLink() {
    return cy.get("a[href='/forgot-password']");
  },
  get emailInput() {
    return cy.get("input[name='email']");
  },
  get passwordInput() {
    return cy.get("input[type='password']");
  },
  get loginButton() {
    return cy.get("button[type='submit']");
  },
  get myAccountBtnNav() {
    return cy.get(".el-dropdown-link > .vs-c-user-name");
  },
  get myAccountBtnSidebar() {
    return cy.get("li:nth-of-type(4) > span > div > .vs-c-site-logo");
  },
  get logoutBtn() {
    return cy.get(".vs-c-btn.vs-c-btn--danger.vs-c-btn--link > span");
  },
  get finishRegisterAfterLogin() {
    return cy.get(".vs-c-auth-modal__body");
  },
  get firstNameInput() {
    return cy.get("input[data-vv-as='first name']");
  },
  get lastNameInput() {
    return cy.get("input[data-vv-as='last name']");
  },
  get companyNameInput() {
    return cy.get("input[data-vv-as='company name']");
  },
  get organizationNameInput() {
    return cy.get("input[data-vv-as='organization name']");
  },
  get finishRegistrationButton() {
    return cy.get("div > button[type='submit']");
  },
  get cancelFinishingRegistrationButton() {
    return cy.get(".vs-c-btn--danger");
  },
  login({
    email = dataFromRegister.newUserEmail,
    password = data.newUser.newPasswordValid,
  }) {
    if (email == "" || password == "") {
      this.loginButton.click();
    } else {
      cy.intercept("POST", "**api/v2/login").as("login");
      this.emailInput.should("be.visible").type(email);
      this.passwordInput.should("be.visible").type(password);
      this.loginButton.click();
      if (
        email == dataFromRegister.newUserEmail &&
        password == data.newUser.newPasswordValid
      ) {
        cy.wait("@login").then((res) => {
          expect(res.response.statusCode).to.eq(200);
        });
      }
    }
  },
  finishRegistration({
    firstName = data.newUser.firstName,
    lastName = data.newUser.lastName,
    companyName = data.newUser.companyName,
    organizationName = data.newUser.organizationName,
  }) {
    cy.intercept("PUT", "**api/v2/users").as("finish");
    cy.wait(500);
    this.firstNameInput
      .should("be.visible")
      .type(firstName, { force: true })
      .and("have.value", "Goran");
    cy.wait(500);
    this.lastNameInput.should("be.visible").type(lastName, { force: true });
    cy.wait(500);
    this.companyNameInput
      .should("be.visible")
      .type(companyName, { force: true });
    cy.wait(500);
    this.organizationNameInput
      .should("be.visible")
      .type(organizationName, { force: true });
    cy.wait(500);
    this.finishRegistrationButton.should("be.visible").click();
    cy.wait("@finish").then((res) => {
      expect(res.response.statusCode).to.eq(200);
    });
  },
  cancelRegFinish() {
    this.cancelFinishingRegistrationButton.click();
  },
  logout() {
    cy.intercept("/api/v2/logout").as("logout");
    this.myAccountBtnNav.click({ force: true });
    this.myAccountBtnSidebar.click();
    this.logoutBtn.click();
    cy.wait("@logout").then((res) => {
      expect(res.response.body.message).to.eq("Successfully logged out");
    });
  },
};
