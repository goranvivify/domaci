/// <reference types="cypress" />
import data from "../fixtures/data.json";
import loginPage from "../fixtures/loginPage.json";
import activeOrganizationMainBoard from "../fixtures/activeOrganizationsMainBoard.json";
import commonData from "../fixtures/commonData.json";
import activeBoardMainPanel from "../fixtures/activeBoardMainPanel.json";
import boardPanel from "../fixtures/boardPanel.json";
import tasks from "../fixtures/tasks.json";
import boardSettingsMenu from "../fixtures/boardSettingsMenu.json";
import organizationSettingsMenu from "../fixtures/organizationSettingsMenu.json";
import navigation from "../fixtures/navigation.json";

context("New board", () => {
  it("log in and visit My Organization", () => {
    cy.visit("/");
    cy.get(loginPage.emailInput).clear().type(data.user.email);
    cy.get(loginPage.passwordInput).clear().type(data.user.password);
    cy.get(loginPage.loginButton).click();
    cy.wait(3000);
  });
  it("create organization", () => {
    cy.get(activeOrganizationMainBoard.addNewOrganization).click({
      force: true,
    });
    cy.get(activeOrganizationMainBoard.newOrganizationNameInput)
      .clear()
      .type(commonData.validData.testName);
    cy.get(activeOrganizationMainBoard.buttonNext).click();
    cy.get(activeOrganizationMainBoard.buttonNext).click();
    if (activeOrganizationMainBoard.okButton != "disabled") {
      cy.get(activeOrganizationMainBoard.okButton).click();
    }
  });
  context("Test New Board Creation - name", () => {
    it("only spaces in name", () => {
      cy.get(activeOrganizationMainBoard.addNewBoardButton).click();
      cy.get(
        activeBoardMainPanel.newBoardCreatePanel.organizationDropDownMenu
      ).click({ force: true });
      cy.get(
        activeBoardMainPanel.newBoardCreatePanel
          .organizationDropDownMenuChoiceOne
      ).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.boardTitleNameInput)
        .clear()
        .type(commonData.negativeData.onlySpaces);
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click({
        force: true,
      });
    });
    it("script code in name", () => {
      cy.get(activeBoardMainPanel.newBoardCreatePanel.boardTitleNameInput)
        .clear()
        .type(commonData.negativeData.scriptCodeInjection);
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click({
        force: true,
      });
      cy.get(activeBoardMainPanel.newBoardCreatePanel.backButton).click();
    });
    it("257 character in name", () => {
      cy.get(activeBoardMainPanel.newBoardCreatePanel.boardTitleNameInput)
        .clear()
        .type(commonData.negativeData.tooLongString257);
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click({
        force: true,
      });
      cy.get(activeBoardMainPanel.newBoardCreatePanel.backButton).click();
    });
    it("valid name + scrum", () => {
      cy.get(activeBoardMainPanel.newBoardCreatePanel.boardTitleNameInput)
        .clear()
        .type(commonData.validData.testName);
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.chooseSrcumCheck).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click();
    });
  });
  context("Test created board", () => {
    it("Delete example task", () => {
      cy.get(boardPanel.firstBacklogTask.footer).trigger("mouseover");
      cy.get(
        boardPanel.firstBacklogTask.moreTaskOptions.threeDotsMoreButton
      ).click({ force: true });
      cy.get(boardPanel.firstBacklogTask.moreTaskOptions.delete).click();
      cy.get(boardPanel.firstBacklogTask.moreTaskOptions.confirmDelete).click();
    });
    it("create new task", () => {
      cy.get(boardPanel.backlogColumn.emptyColumnBody).trigger("mouseover");
      cy.get(boardPanel.backlogColumn.emptyColumnAddNewTaskButton).click({
        force: true,
      });
      cy.get(tasks.newTaskTitleInput)
        .clear()
        .type(commonData.validData.testName);
      cy.get(tasks.saveTaskTitleButton).click();
    });
    it("assign myself to task", () => {
      cy.get(boardPanel.firstBacklogTask.managePerformers).click();
      cy.get(boardPanel.firstBacklogTask.assignTaskToMyself).click({
        //here I get 404 on POST method (console) ... issue still unsolved
        force: true,
      });
      cy.wait(1000);
    });
    it("edit task title", () => {
      cy.get(boardPanel.firstBacklogTask.footer).trigger("mouseover");
      cy.get(boardPanel.firstBacklogTask.editItemTitle).click({ force: true });
      cy.get(tasks.newTaskTitleInput)
        .clear()
        .type(commonData.validData.editedName);
      cy.get(tasks.saveEditedTaskTitleButton).click();
    });
    it("change task type to bug", () => {
      cy.get(boardPanel.firstBacklogTask.typeOfTask).click();
      cy.get(tasks.typeOfTask.bug).click();
    });
    it("delete created task", () => {
      cy.get(boardPanel.firstBacklogTask.footer).trigger("mouseover");
      cy.get(
        boardPanel.firstBacklogTask.moreTaskOptions.threeDotsMoreButton
      ).click({ force: true });
      cy.get(boardPanel.firstBacklogTask.moreTaskOptions.delete).click();
      cy.get(tasks.confirmTaskDelete).click();
    });
    it("delete created board", () => {
      cy.get(boardPanel.sideNav.configureBoard).click({ force: true });
      cy.get(boardSettingsMenu.details.delete).click();
      cy.get(boardSettingsMenu.details.confirmDelete).click();
    });
    it("archive created organization", () => {
      cy.get(navigation.siteLogoButton).click();
      if (activeOrganizationMainBoard.okButton != "disabled") {
        cy.get(activeOrganizationMainBoard.okButton).click();
      }
      cy.get(activeOrganizationMainBoard.sideNav.configuration).click({
        force: true,
      });
      cy.wait(1000);
      cy.get(organizationSettingsMenu.delete).click();
      cy.get(organizationSettingsMenu.confirmDeleteInput)
        .clear()
        .type(data.user.password);
      cy.get(organizationSettingsMenu.confirmDelete).click();
    });
  });
});
