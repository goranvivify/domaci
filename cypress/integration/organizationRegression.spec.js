/// <reference types="cypress" />
import userApi from "../api/user";
import organizationApi from "../api/organization";
import commonData from "../fixtures/commonData.json";

describe("Api testing", () => {
  let userToken;
  let allOrganizations;

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
  it("Empty organization name", () => {
    organizationApi.post({
      orgName: " ",
      token: userToken,
      testMessage: "02-Empty Organization name",
      statusCode: 401,
    });
  });
  it("Only spaces in name", () => {
    organizationApi.post({
      orgName: "                     ",
      token: userToken,
      testMessage: "02-Empty Organization name",
      statusCode: 401,
    });
  });
  it("256 characters in organization name", () => {
    organizationApi.post({
      orgName: commonData.negativeData.tooLongString256,
      token: userToken,
      testMessage: "03-256 characters in name",
      statusCode: 401,
    });
  });
  it("Script code in organization name", () => {
    organizationApi.post({
      orgName: commonData.negativeData.scriptCodeInjection,
      token: userToken,
      testMessage: "04-Script code in name",
      statusCode: 401,
    });
  });
  it("Valid organization create", () => {
    organizationApi.post({
      token: userToken,
      testMessage: "05-Valid creation",
    });
  });
  it("Get all organizations", () => {
    organizationApi.get({ token: userToken }).then((response) => {
      allOrganizations = response;
    });
  });
});
