/// <reference types="cypress" />
import authLogin from "../models/loginModule";
import authCreateOrg from "../models/organizationModule";
import authBoard from "../models/boardModule";
import commonData from "../fixtures/commonData.json";
import data from "../fixtures/data.json";
import dataFromRegister from "../fixtures/dataFromRegister.json";

describe("New board", () => {
  beforeEach("Login to app", () => {
    cy.intercept("/api/v2/common").as("login");
    cy.visit("/");
    authLogin.login({});
    cy.wait("@login").then((res) => {
      expect(res.response.statusCode).to.eq(200);
    });
  });

  it("valid new organization create", () => {
    cy.intercept("/api/v2/organizations").as("createOrganization");
    authCreateOrg.createOrganization({});
    cy.wait("@createOrganization").then((res) => {
      expect(res.response.statusCode).to.eq(200);
      expect(res.response.body.users[0].email).to.eq(
        dataFromRegister.newUserEmail
      );
    });
  });

  context("Test New Board Creation - name", () => {
    it("only spaces in name", () => {
      // cy.get(".vs-c-my-organization__body > p:nth-of-type(2)").click();
      authBoard.createBoard({ name: commonData.negativeData.onlySpaces });
    });
    it("script code in name", () => {
      authBoard.createBoard({
        name: commonData.negativeData.scriptCodeInjection,
      });
    });
    it("256 character in name", () => {
      authBoard.createBoard({ name: commonData.negativeData.tooLongString256 });
    });
    it("valid name + scrum", () => {
      cy.intercept("/api/v2/boards").as("newBoard");
      cy.get(activeBoardMainPanel.newBoardCreatePanel.boardTitleNameInput)
        .clear()
        .type(commonData.validData.testName);
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.chooseSrcumCheck).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click();
      cy.get(activeBoardMainPanel.newBoardCreatePanel.nextButton).click();
      cy.wait("@newBoard").then((res) => {
        expect(res.response.statusCode).to.eq(201);
        expect(res.response.body.owner_id).to.eq(dataFromRegister.ownerId);
        cy.writeFile(
          "cypress/fixtures/responseFromBoardSpec.json",
          res.response.body
        );
      });
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
      if (activeOrganizationMainBoard.okButton) {
        cy.get(activeOrganizationMainBoard.okButton).click();
      }
      cy.get(activeOrganizationMainBoard.sideNav.configuration).click({
        force: true,
      });
      cy.wait(1000);
      cy.get(organizationSettingsMenu.delete).click();
      cy.get(organizationSettingsMenu.confirmDeleteInput)
        .clear()
        .type(data.newUser.newPasswordValid);
      cy.get(organizationSettingsMenu.confirmDelete).click();
    });
  });
});
