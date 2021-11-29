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
  before(() => {
    userApi
      .login({ testMessage: "01-Login before other tests" })
      .then((token) => {
        userToken = token;
      });
  });
  after("Delete all organizations", () => {
    allOrganizations.forEach((el) =>
      organizationApi.delete({ token: userToken, organizationId: el.id })
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
  it("Create board", () => {
    boardApi
      .post({
        token: userToken,
        testMessage: "03-Board created successfuly",
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
  it("Edit board's name and description", () => {
    boardApi.put({
      boardId: boardId,
      token: userToken,
      testMessage: "04-Board name edited",
      boardCode: boardCode,
      description: commonData.validData.description,
    });
  });
  it("Delete board", () => {
    boardApi.delete({
      token: userToken,
      testMessage: "05-Board deleted successfuly",
      boardId: boardId,
    });
  });
  it("Get all organizations", () => {
    organizationApi.get({ token: userToken }).then((response) => {
      allOrganizations = response;
    });
  });
});
