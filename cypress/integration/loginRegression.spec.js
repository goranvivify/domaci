/// <reference types="cypress" />
import userApi from "../api/user";

describe("Api testing", () => {
  let userToken;
  before(() => {
    userApi
      .login({ testMessage: "01-Login before other tests" })
      .then((token) => {
        userToken = token;
      });
  });
  it("wrong email without @", () => {
    userApi.login({
      email: "testemail.com",
      statusCode: 401,
      testMessage: "02-wrong email without @",
    });
  });
  it("wrong email with space infront", () => {
    userApi.login({
      email: " goran.pobric@vivifyideas.com",
      statusCode: 401,
      testMessage: "03-wrong email with space infront",
    });
  });
  it("wrong email without .com", () => {
    userApi.login({
      email: "goran.pobric@vivifyideas",
      statusCode: 401,
      testMessage: "04-wrong email with space infront",
    });
  });
  it("wrong password", () => {
    userApi.login({
      password: "1234",
      statusCode: 401,
      testMessage: "05-wrong password",
    });
  });
});
