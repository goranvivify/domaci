import faker from "faker";
import color from "../support/consoleColor";
module.exports = {
  get({ token = "", statusCode = 200 }) {
    return cy
      .request({
        method: "GET",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations-data",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        expect(response.status).to.eq(statusCode);
        return response.body;
      });
  },
  post({
    orgName = faker.animal.crocodilia(),
    token = "",
    statusCode = 200,
    testMessage = "",
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "POST",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
        body: {
          name: orgName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        typeof response.status !== "undefined" && response.status === statusCode
          ? color.log(`${testMessage} - Pass`, "success")
          : color.log(
              `${testMessage} - Fail - ${JSON.stringify(response)}`,
              "error"
            );
        expect(response.status).to.eq(statusCode);
        return response.body;
      });
  },
  put({
    orgName = `EDITED ${faker.animal.crocodilia()}`,
    token = "",
    statusCode = 200,
    testMessage = "",
    organizationId = "",
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "PUT",
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${organizationId}`,
        body: {
          name: orgName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        typeof response.status !== "undefined" && response.status === statusCode
          ? color.log(`${testMessage} - Pass`, "success")
          : color.log(
              `${testMessage} - Fail - ${JSON.stringify(response)}`,
              "error"
            );
        expect(response.status).to.eq(statusCode);
        return response.body;
      });
  },
  delete({
    organizationId = "",
    token = "",
    statusCode = 201,
    testMessage = "",
    password = "pobra11",
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "POST",
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${organizationId}`,
        body: {
          passwordOrEmail: password,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        typeof response.status !== "undefined" && response.status === statusCode
          ? color.log(`${testMessage} - Pass`, "success")
          : color.log(
              `${testMessage} - Fail - ${JSON.stringify(response)}`,
              "error"
            );
        expect(response.status).to.eq(statusCode);
      });
  },
};
