const authService = require("../../src/services/authService");
const { expectStatus, expectStatusOneOf } = require("../helpers/assertions");

describe("Auth API", () => {
  test("POST /auth/login with valid credentials returns token", async () => {
    const response = await authService.login({
      username: "mor_2314",
      password: "83r5^_"
    });

    expectStatusOneOf(response, [200, 201]);
    expect(typeof response.data.token).toBe("string");
    expect(response.data.token.length).toBeGreaterThan(0);
  });

  test("POST /auth/login with missing username returns 4xx", async () => {
    const response = await authService.login({
      password: "83r5^_"
    });

    expectStatusOneOf(response, [400, 401]);
    expect(response.data.token).toBeUndefined();
  });

  test("POST /auth/login with missing password returns 4xx", async () => {
    const response = await authService.login({
      username: "mor_2314"
    });

    expectStatusOneOf(response, [400, 401]);
    expect(response.data.token).toBeUndefined();
  });

  test("POST /auth/login with wrong password does not return success token", async () => {
    const response = await authService.login({
      username: "mor_2314",
      password: "wrong-password"
    });

    expectStatusOneOf(response, [400, 401]);
    expect(response.data.token).toBeUndefined();
  });

  test("POST /auth/login with empty body returns 4xx", async () => {
    const response = await authService.login({});
    expectStatusOneOf(response, [400, 401]);
  });
});
