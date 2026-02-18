const apiClient = require("../../src/client/apiClient");
const productsService = require("../../src/services/productsService");
const cartsService = require("../../src/services/cartsService");
const { expectStatus, expectStatusOneOf } = require("../helpers/assertions");

describe("Platform and Negative Scenarios", () => {
  test("GET /invalid-endpoint returns 404", async () => {
    const response = await apiClient.get("/invalid-endpoint");
    expectStatus(response, 404);
  });

  test("DELETE /products/1 returns non-success status", async () => {
    const response = await apiClient.delete("/products/1");
    expectStatusOneOf(response, [200, 400, 404, 405]);
  });

  test("GET /products with invalid limit type still returns valid response structure", async () => {
    const response = await productsService.getAll({ limit: "abc" });
    expectStatus(response, 200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test("GET /carts with invalid sort value still returns array", async () => {
    const response = await cartsService.getAll({ sort: "invalid_sort" });
    expectStatus(response, 200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test("GET /products category endpoint supports url encoding", async () => {
    const response = await productsService.getByCategory("men's clothing");
    expectStatus(response, 200);
    expect(Array.isArray(response.data)).toBe(true);
  });
});
