const cartsService = require("../../src/services/cartsService");
const { cartSchema } = require("../../src/validation/schemas");
const { validateSchema } = require("../../src/validation/validator");
const {
  expectStatus,
  expectNonEmptyArray,
  expectDescendingByNumericKey
} = require("../helpers/assertions");

describe("Carts API", () => {
  test("GET /carts returns 200 and non-empty array", async () => {
    const response = await cartsService.getAll();
    expectStatus(response, 200);
    expectNonEmptyArray(response.data);
  });

  test("GET /carts first item matches cart schema", async () => {
    const response = await cartsService.getAll();
    const validation = validateSchema(cartSchema, response.data[0]);
    expect(validation.valid).toBe(true);
  });

  test("GET /carts/1 returns cart with id=1", async () => {
    const response = await cartsService.getById(1);
    expectStatus(response, 200);
    expect(response.data.id).toBe(1);
  });

  test("GET /carts?limit=2 returns max 2 carts", async () => {
    const response = await cartsService.getAll({ limit: 2 });
    expectStatus(response, 200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeLessThanOrEqual(2);
  });

  test("GET /carts?sort=desc returns carts in descending ID order", async () => {
    const response = await cartsService.getAll({ sort: "desc" });
    expectStatus(response, 200);
    expectNonEmptyArray(response.data);
    expectDescendingByNumericKey(response.data, "id");
  });

  test("GET /carts/user/2 returns only userId=2 carts", async () => {
    const response = await cartsService.getByUser(2);
    expectStatus(response, 200);
    expectNonEmptyArray(response.data);
    response.data.forEach((cart) => expect(cart.userId).toBe(2));
  });

  test("GET /carts with date range returns carts within range", async () => {
    const response = await cartsService.getAll({
      startdate: "2019-12-10",
      enddate: "2020-10-10"
    });
    expectStatus(response, 200);
    expect(Array.isArray(response.data)).toBe(true);
    response.data.forEach((cart) => {
      const date = new Date(cart.date).getTime();
      expect(date).toBeGreaterThanOrEqual(new Date("2019-12-10").getTime());
      expect(date).toBeLessThanOrEqual(new Date("2020-10-10T23:59:59.999Z").getTime());
    });
  });

  test("GET /carts?limit=3&sort=desc returns sorted and bounded results", async () => {
    const response = await cartsService.getAll({ limit: 3, sort: "desc" });
    expectStatus(response, 200);
    expect(response.data.length).toBeLessThanOrEqual(3);
    expectDescendingByNumericKey(response.data, "id");
  });

  test("GET /carts cart product line contains productId and quantity", async () => {
    const response = await cartsService.getById(1);
    expectStatus(response, 200);
    expectNonEmptyArray(response.data.products);
    expect(response.data.products[0]).toHaveProperty("productId");
    expect(response.data.products[0]).toHaveProperty("quantity");
  });

  test("GET /carts/9999 returns empty object for unknown cart", async () => {
    const response = await cartsService.getById(9999);
    expectStatus(response, 200);
    if (response.data === null) {
      expect(response.data).toBeNull();
      return;
    }
    expect(typeof response.data).toBe("object");
    expect(response.data.id).toBeUndefined();
  });

  test("GET /carts/user/9999 returns empty array for unknown user", async () => {
    const response = await cartsService.getByUser(9999);
    expectStatus(response, 200);
    expect(Array.isArray(response.data)).toBe(true);
  });
});
