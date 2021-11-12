// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import dataFromRegister from "../fixtures/dataFromRegister.json";
import data from "../fixtures/data.json";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

Cypress.Commands.add(
  "login",
  (
    email = dataFromRegister.newUserEmail,
    password = data.newUser.newPasswordValid
  ) => {
    if (email == "" || password == "") {
      cy.get("button[type='submit']").click();
    } else {
      cy.intercept("POST", "**api/v2/login").as("login");
      cy.get("input[name='email']").should("be.visible").type(email);
      cy.get("input[type='password']").should("be.visible").type(password);
      cy.get("button[type='submit']").click();
    }
    if (
      email == dataFromRegister.newUserEmail &&
      password == data.newUser.newPasswordValid
    ) {
      cy.wait("@login").then((res) => {
        expect(res.response.statusCode).to.eq(200);
      });
    }
  }
);
Cypress.Commands.add("logout", () => {
  cy.intercept("/api/v2/logout").as("logout");
  cy.get(".el-dropdown-link > .vs-c-user-name").click({ force: true });
  cy.get("li:nth-of-type(4) > span > div > .vs-c-site-logo").click();
  cy.get(".vs-c-btn.vs-c-btn--danger.vs-c-btn--link > span").click();
  cy.wait("@logout").then((res) => {
    expect(res.response.body.message).to.eq("Successfully logged out");
  });
});
Cypress.Commands.add("iframe", { prevSubject: "element" }, ($iframe) => {
  return new Cypress.Promise((resolve) => {
    $iframe.on("load", () => {
      resolve($iframe.contents().find("body"));
    });
  });
});
Cypress.Commands.add(
  "iframe2",
  { prevSubject: "element" },
  ($iframe, callback = () => {}) => {
    cy.log("Getting iframe body");

    return cy
      .wrap($iframe)
      .should((iframe) => expect(iframe.contents().find("body")).to.exist)
      .then((iframe) => cy.wrap(iframe.contents().find("body")))
      .within({}, callback);
  }
);
