import data from "../fixtures/data.json";
import dataFromRegister from "../fixtures/dataFromRegister.json";

module.exports = {
  get signUpButton() {
    return cy.get("[data-cy=login-sign-up-link]");
  },
  get chooseStarter() {
    return cy.get(
      ".vsp-c-pricing-plan-list--annual > :nth-child(1) > .vsp-c-btn"
    );
  },
  get showPasswordBtn() {
    return cy.get(".vs-c-btn--icon.vs-u-color--modal-body-text");
  },
  get emailInput() {
    return cy.get("input[data-cy='sign-up-email-input']");
  },
  get passwordInput() {
    return cy.get(
      "div:nth-child(2) > div.el-form-item__content > div > input:nth-child(1)"
    );
  },
  get numberOfUsers() {
    return cy.get("input[data-cy='sign-up-number-of-users-input']");
  },
  get startTrialBtn() {
    return cy.get("button[data-cy='sign-up-submit-button']");
  },
  get myAccountBtnNav() {
    return cy.get("span[class='el-dropdown-link']");
  },
  get myAccountBtnSidebar() {
    return cy.get("li:nth-of-type(4) > span > div > .vs-c-site-logo");
  },
  get logoutBtn() {
    return cy.get(".vs-c-btn.vs-c-btn--danger.vs-c-btn--link > span");
  },
  goToRegister() {
    cy.intercept("/api/v2/pricing-plans/1").as("goToRegister");
    cy.visit("/");
    this.signUpButton.click();
    this.chooseStarter.click({ force: true });
    cy.wait("@goToRegister").then((res) => {
      expect(res.response.statusCode).to.eq(200);
    });
  },
  register({
    email = dataFromRegister.newUserEmail,
    password = data.newUser.newPasswordValid,
    numberOfUsers = data.newUser.numberOfUsersValid,
  }) {
    if (email == "" || password == "" || numberOfUsers == "") {
      this.startTrialBtn.click();
    } else {
      cy.intercept("POST", "**api/v2//api/v2/pricing-plans/**").as("register");
      this.emailInput.should("be.visible").type(email);
      this.passwordInput.should("be.visible").type(password);
      this.numberOfUsers.should("be.visible").type(numberOfUsers);
      this.startTrialBtn.click();
      if (
        email == dataFromRegister.newUserEmail &&
        password == data.newUser.newPasswordValid &&
        numberOfUsers == data.newUser.numberOfUsersValid
      ) {
        cy.wait("@register").then((res) => {
          expect(res.response.statusCode).to.eq(200);
        });
      }
    }
  },
  logout() {
    this.myAccountBtnNav.should("be.visible").click();
    this.myAccountBtnSidebar.should("be.visible").click();
    this.logoutBtn.should("be.visible").click();
  },
};
