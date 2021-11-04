import commonData from "../fixtures/commonData.json";
import data from "../fixtures/data.json";
module.exports = {
  get addNewOrganization() {
    return cy.get(
      ".not-sortable.vs-c-my-organization.vs-c-my-organization--add-new"
    );
  },
  get buttonNext() {
    return cy.get("button[name='next_btn']");
  },
  get newOrganizationNameInput() {
    return cy.get("input[name='name']");
  },
  get buttonPrevious() {
    return cy.get(".dialog-footer > button[name='prev_btn']");
  },
  get okButton() {
    return cy.get(".vs-c-modal--features-button > .vs-c-btn");
  },
  get siteLogoButton() {
    return cy.get(".vs-l-project__header > .vs-c-site-logo");
  },
  get editOrganizationButton() {
    return cy.get("span[title='Edit Organization']");
  },
  get editOrganizationNameInput() {
    return cy.get("input[name='change-organization-name']");
  },
  get confirmOrgNameEdit() {
    return cy.get("button[name='change-organization-name'] > .el-icon-check");
  },
  get archiveMyOrganizationButton() {
    return cy.get("span[title='Archive Organization']");
  },
  get confirmDeleteMyOrganizationButton() {
    return cy.get("button[name='save-btn']");
  },
  get deleteOrganizationButton() {
    return cy.get(".vs-c-btn.vs-c-btn--spaced.vs-c-btn--warning");
  },
  get passwordConfirmForDeleteInput() {
    return cy.get(".el-input__inner");
  },
  get passwordConfirmForDeleteButton() {
    return cy.get(".el-button--success");
  },
  get okButton() {
    return cy.get(".vs-c-modal--features-button > .vs-c-btn");
  },
  get siteLogoButton() {
    return cy.get(".vs-c-site-logo");
  },
  get configurationButton() {
    return cy.get("li:nth-of-type(8) > span > div > .vs-c-site-logo");
  },
  get organizationFooter() {
    return cy.get("div:nth-child(1) > div.vs-c-my-organization__footer > ul");
  },
  get deleteOrgBtn() {
    return cy.get("div.vs-c-my-organization__header > span.vs-c-icon--remove");
  },
  createOrganization({ name = commonData.validData.testName }) {
    if (name == "") {
      this.buttonNext.click();
      this.buttonNext.click();
    }
    cy.intercept("/api/v2/organizations").as("createOrganization");
    this.addNewOrganization.should("be.visible").click();
    this.newOrganizationNameInput.should("be.visible").type(name);
    this.buttonNext.should("be.visible").click();
    this.buttonNext.should("be.visible").click();
    cy.wait("@createOrganization").then((res) => {
      expect(res.response.statusCode).to.eq(200);
    });
  },
  editOrganization({ name = commonData.validData.editedName }) {
    this.siteLogoButton.click();
    this.editOrganizationButton.click();
    this.editOrganizationNameInput.type(name);
    this.confirmOrgNameEdit.click();
  },
  archiveOrganization() {
    this.archiveMyOrganizationButton.click({ force: true });
    this.confirmDeleteMyOrganizationButton.click();
  },
  deleteOrganization({ password = data.newUser.newPasswordValid }) {
    // this.organizationFooter.click();
    // cy.get("body").then(($body) => {
    //   if (
    //     $body.find(
    //       ".vs-c-btn.vs-c-btn--lg.vs-c-btn--primary.vs-c-modal--features-confirm-button.vs-u-font-sm"
    //     ).length > 0
    //   ) {
    //     //evaluates as true
    //     cy.get(
    //       ".vs-c-btn.vs-c-btn--lg.vs-c-btn--primary.vs-c-modal--features-confirm-button.vs-u-font-sm"
    //     ).click();
    //   }
    // });
    // this.configurationButton.click({ force: true });
    // this.deleteOrganizationButton.click({ force: true });
    this.deleteOrgBtn.click({ force: true });
    this.passwordConfirmForDeleteInput.type(password);
    this.passwordConfirmForDeleteButton.click();
  },
};
