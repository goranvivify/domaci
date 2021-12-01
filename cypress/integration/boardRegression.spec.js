/// <reference types="cypress" />
import userApi from "../api/user";
import organizationApi from "../api/organization";
import boardApi from "../api/board";
import commonData from "../fixtures/commonData.json";

describe("Api testing", () => {
  let userToken;
  let organizationId;
  let allOrganizations;
  let boardId;
  let boardCode;
  let allBoards;
  before(() => {
    userApi
      .login({ testMessage: "01-Login before other tests" })
      .then((token) => {
        userToken = token;
      });
  });
  after("Delete all organizations", () => {
    allBoards.forEach((el) =>
      boardApi.delete({
        token: userToken,
        boardId: el.id,
        testMessage: "11-All boards deleted successfully",
      })
    );
    allOrganizations.forEach((el) =>
      organizationApi.delete({
        token: userToken,
        organizationId: el.id,
        testMessage: "12-All organizations deleted successfully",
      })
    );
  });
  it("Create organization", () => {
    organizationApi
      .post({
        token: userToken,
        testMessage: "02-Organization created successfuly",
      })
      .then((response) => {
        organizationId = response.id;
      });
  });
  it("NEG reate board - 256 characters in name", () => {
    boardApi
      .post({
        boardName: commonData.negativeData.tooLongString256,
        token: userToken,
        organizationId: organizationId,
        statusCode: 400,
        testMessage: "03-256 characters in name",
      })
      .then((response) => {
        boardId = response.body.id;
      });
  });
  it("NEG reate board - only spaces in name", () => {
    boardApi
      .post({
        boardName: commonData.negativeData.onlySpaces,
        token: userToken,
        organizationId: organizationId,
        statusCode: 400,
        testMessage: "04-Only spaces in name",
      })
      .then((response) => {
        boardId = response.body.id;
      });
  });
  it("NEG reate board - script code in name", () => {
    boardApi
      .post({
        boardName: commonData.negativeData.scriptCodeInjection,
        token: userToken,
        organizationId: organizationId,
        statusCode: 400,
        testMessage: "05-Script code in name",
      })
      .then((response) => {
        boardId = response.body.id;
      });
  });
  it("VALID Create board", () => {
    boardApi
      .post({
        token: userToken,
        testMessage: "06-Board created successfuly",
        organizationId: organizationId,
      })
      .then((response) => {
        boardId = response.body.id;
      });
  });
  it("GET boards", () => {
    boardApi.get({ token: userToken, boardId: boardId }).then((res) => {
      boardCode = res.code;
    });
  });
  it("VALID edit board's name and description", () => {
    boardApi.put({
      boardId: boardId,
      token: userToken,
      testMessage: "07-Board name edited",
      boardCode: boardCode,
      description: commonData.validData.description,
    });
  });
  it("NEG Edit board's name - 256 characters", () => {
    boardApi.put({
      boardName: commonData.negativeData.tooLongString256,
      boardId: boardId,
      token: userToken,
      boardCode: boardCode,
      description: null,
      statusCode: 400,
      testMessage: "08-256 characters in board name",
    });
  });
  it("NEG Edit board's name - script code", () => {
    boardApi.put({
      boardName: commonData.negativeData.scriptCodeInjection,
      boardId: boardId,
      token: userToken,
      boardCode: boardCode,
      description: null,
      statusCode: 400,
      testMessage: "09-Script code in board name",
    });
  });
  it("Delete board", () => {
    boardApi.delete({
      token: userToken,
      testMessage: "10-Board deleted successfuly",
      boardId: boardId,
    });
  });
  it("Get all boards", () => {
    boardApi
      .getAll({ token: userToken, organizationId: organizationId })
      .then((response) => {
        allBoards = response;
      });
  });
  it("Get all organizations", () => {
    organizationApi.get({ token: userToken }).then((response) => {
      allOrganizations = response;
    });
  });
});
