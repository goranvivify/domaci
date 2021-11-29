/// <reference types="cypress" />
import userApi from "../api/user";
import organizationApi from "../api/organization";

describe("Api testing", () => {
  let userToken;
  let organizationId;
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
    // for (var i = 0; i < allOrganizations.length; i++) {
    //   organizationApi
    //     .delete({
    //       token: userToken,
    //       testMessage: "05-All organizations deleted successfuly",
    //       organizationId: allOrganizations[i].id,
    //     })
    //     .then((response) => {
    //       console.log(response);
    //     });
    // }
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
  it("Edit organization", () => {
    organizationApi.put({
      token: userToken,
      testMessage: "03-Organization edited successfuly",
      organizationId: organizationId,
    });
  });
  it("Delete organization", () => {
    organizationApi.delete({
      token: userToken,
      testMessage: "04-Organization deleted successfuly",
      organizationId: organizationId,
    });
  });
  it("Get all organizations", () => {
    organizationApi.get({ token: userToken }).then((response) => {
      allOrganizations = response;
    });
  });
});
