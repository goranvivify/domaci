import faker from "faker";
import color from "../support/consoleColor";
module.exports = {
  get({ token = "", boardId = "", statusCode = 200 }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "GET",
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
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
    boardName = faker.animal.lion(),
    organizationId = "",
    token = "",
    statusCode = 201,
    testMessage = "",
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "POST",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/boards",
        body: {
          configuration_board_id: null,
          name: boardName,
          organization_id: organizationId,
          team_members_board_id: null,
          type: "scrum_board",
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
        return response;
      });
  },
  put({
    boardName = `EDITED ${faker.animal.bear()}`,
    token = "",
    statusCode = 200,
    testMessage = "",
    boardCode = "",
    boardId = "",
    description = "",
  }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "PUT",
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
        body: {
          code: boardCode,
          description: description,
          name: boardName,
          task_unit: "points",
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
  delete({ boardId = "", token = "", statusCode = 200, testMessage = "" }) {
    return cy
      .request({
        failOnStatusCode: false,
        method: "DELETE",
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
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
