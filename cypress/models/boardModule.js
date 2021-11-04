import commonData from "../fixtures/commonData.json";
import data from "../fixtures/data.json";

module.exports = {
  get addNewOrganization() {
    return cy.get(
      ".vs-c-my-organization--add-new .vs-c-my-organization__avatar"
    );
  },
  get newOrganizationNameInput() {
    return cy.get("input[name='name']");
  },
  get buttonNext() {
    return cy.get("button[name='next_btn']");
  },
  get okButton() {
    return cy.get(".vs-c-modal--features-button > .vs-c-btn");
  },

  get addNewBoardButton() {
    return cy.get(
      "ul.vs-c-my-organization__list.vs-c-my-organization__boards > li"
    );
  },
  get organizationDropDownMenu() {
    return cy.get(".el-icon-caret-top.el-input__icon");
  },
  get organizationDropDownMenuChoiceOne() {
    cy.get(".el-scrollbar__view.el-select-dropdown__list > li:nth-of-type(1)");
  },
  get boardTitleNameInput() {
    cy.get("input[name='name']");
  },
  get nextButton() {
    cy.get(".dialog-footer > button[name='next_btn']");
  },
  get backButton() {
    cy.get(".dialog-footer > button[name='prev_btn']");
  },
  get chooseSrcumCheck() {
    cy.get("span[name='type_scrum']");
  },
  get firstBacklogTaskFooter() {
    cy.get(".vs-c-item-card__footer");
  },
  get threeDotsMoreButton() {
    cy.get("div:nth-of-type(4) > div[title='More']");
  },
  get moreTaskOptionsDelete() {
    return cy.get("a:nth-of-type(2) > span");
  },
  get moreTaskOptionsConfirmDelete() {
    return cy.get("button[name='save-btn']");
  },
  get emptyColumnBody() {
    return cy.get(".not-sortable.vs-c-col > .vs-c-task-list.vs-is-empty");
  },
  get emptyColumnAddNewTaskButton() {
    return cy.get(
      ".not-sortable.vs-c-col > .vs-c-task-list.vs-is-empty > .vs-add-new-task.vs-c-btn.vs-c-btn--round.vs-c-btn--sm.vs-c-btn--themify-primary"
    );
  },
  get newTaskTitleInput() {
    return cy.get("textarea[type='textarea']");
  },
  get saveTaskTitleButton() {
    return cy.get("button[name='new_item_save'] > span");
  },
  get managePerformers() {
    return cy.get("div[class='vs-c-new-assignee-icon vs-u-img--round']");
  },
  get assignTaskToMyself() {
    return cy.get(
      "div:nth-child(1) > div > div.vs-c-assignee-wrapper > div > span.el-dropdown-link.vs-c-avatar > img"
    );
  },
  get editItemTitle() {
    return cy.get(
      "a[class='vs-c-task-card__not-selectable vs-task-card__title-edit']"
    );
  },
  get saveEditedTaskTitleButton() {
    cy.get("button[name='update_item_title']");
  },
  get typeOfTask() {
    cy.get(
      "span[class='vs-c-task-card-task-type__icon-inner vs-u-task--story']"
    );
  },
  get typeOfTaskBug() {
    cy.get("div.vs-c-task-dropdown__body > a:nth-child(3)");
  },
  get configureBoard() {
    cy.get(":nth-child(10) > span > div > .vs-c-site-logo");
  },
  get detailsDelete() {
    return cy.get(
      "div:nth-child(8) > div > div.vs-c-settings-section-form.vs-c-settings-section-form--limited.vs-c-settings-section-attention-wrapper > button"
    );
  },
  get detailsConfirmDelete() {
    return cy.get(
      "div.vs-c-modal__footer > div > button[type='button'].el-button.el-button--success"
    );
  },
  get siteLogoButton() {
    return cy.get(".vs-l-project__header > .vs-c-site-logo");
  },
  get configuration() {
    return cy.get("li:nth-child(8) > span > div > a");
  },
  get deleteOrg() {
    return cy.get(".vs-c-btn.vs-c-btn--spaced.vs-c-btn--warning");
  },
  get confirmDeleteInput() {
    return cy.get(".el-dialog__body .el-form .el-input__inner");
  },
  get confirmDelete() {
    return cy.get("button[name='save-btn']");
  },
  createBoard({ name = commonData.validData.testName }) {
    this.addNewBoardButton.should("be.visible").click({ force: true });
    // this.organizationDropDownMenu.click();
    // this.organizationDropDownMenuChoiceOne.click();
    this.boardTitleNameInput.should("be.visible").type(name);
    this.nextButton.should("be.visible").click();
  },
};
