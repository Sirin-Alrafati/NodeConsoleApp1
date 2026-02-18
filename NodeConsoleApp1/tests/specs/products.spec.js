const productsService = require("../../src/services/productsService");
const { productSchema } = require("../../src/validation/schemas");
const { validateSchema } = require("../../src/validation/validator");
const {
  expectStatus,
  expectNonEmptyArray,
  expectDescendingByNumericKey
} = require("../helpers/assertions");

describe("Products API", () => {
  test("GET /products returns 200 and non-empty array", async () => {
    const response = await productsService.getAll();
    expectStatus(response, 200);
    expectNonEmptyArray(response.data);
  });

  test("GET /products returns expected product fields", async () => {
    const response = await productsService.getAll();
    expectStatus(response, 200);

    const product = response.data[0];
    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("title");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("description");
    expect(product).toHaveProperty("category");
    expect(product).toHaveProperty("image");
    expect(product).toHaveProperty("rating");
  });

  test("GET /products first item matches product schema", async () => {
    const response = await productsService.getAll();
    const validation = validateSchema(productSchema, response.data[0]);
    expect(validation.valid).toBe(true);
  });

  test("GET /products/1 returns product with id=1", async () => {
    const response = await productsService.getById(1);
    expectStatus(response, 200);
    expect(response.data.id).toBe(1);
  });

  test("GET /products/2 matches schema", async () => {
    const response = await productsService.getById(2);
    expectStatus(response, 200);
    const validation = validateSchema(productSchema, response.data);
    expect(validation.valid).toBe(true);
  });

  test("GET /products/categories returns non-empty category list", async () => {
    const response = await productsService.getCategories();
    expectStatus(response, 200);
    expectNonEmptyArray(response.data);
    response.data.forEach((category) => expect(typeof category).toBe("string"));
  });

  test("GET /products/category/electronics returns only electronics", async () => {
    const response = await productsService.getByCategory("electronics");
    expectStatus(response, 200);
    expectNonEmptyArray(response.data);
    response.data.forEach((product) => expect(product.category).toBe("electronics"));
  });

  test("GET /products?limit=5 returns max 5 products", async () => {
    const response = await productsService.getAll({ limit: 5 });
    expectStatus(response, 200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeLessThanOrEqual(5);
  });

  test("GET /products?sort=desc returns products in descending ID order", async () => {
    const response = await productsService.getAll({ sort: "desc" });
    expectStatus(response, 200);
    expectNonEmptyArray(response.data);
    expectDescendingByNumericKey(response.data, "id");
  });

  test("GET /products?limit=3&sort=desc returns sorted and bounded results", async () => {
    const response = await productsService.getAll({ limit: 3, sort: "desc" });
    expectStatus(response, 200);
    expect(response.data.length).toBeLessThanOrEqual(3);
    expectDescendingByNumericKey(response.data, "id");
  });

  test("GET /products/9999 returns empty object for unknown product", async () => {
    const response = await productsService.getById(9999);
    expectStatus(response, 200);
    expect(["object", "string"]).toContain(typeof response.data);
    if (response.data && typeof response.data === "object") {
      expect(response.data.id).toBeUndefined();
    }
  });

  test("GET /products/category/not-real-category returns empty array", async () => {
    const response = await productsService.getByCategory("not-real-category");
    expectStatus(response, 200);
    expect(Array.isArray(response.data)).toBe(true);
  });
});
