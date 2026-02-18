function expectStatus(response, expectedStatus) {
  expect(response.status).toBe(expectedStatus);
}

function expectStatusOneOf(response, allowedStatuses) {
  expect(allowedStatuses).toContain(response.status);
}

function expectNonEmptyArray(value) {
  expect(Array.isArray(value)).toBe(true);
  expect(value.length).toBeGreaterThan(0);
}

function expectDescendingByNumericKey(items, key) {
  for (let index = 0; index < items.length - 1; index += 1) {
    expect(items[index][key]).toBeGreaterThanOrEqual(items[index + 1][key]);
  }
}

module.exports = {
  expectStatus,
  expectStatusOneOf,
  expectNonEmptyArray,
  expectDescendingByNumericKey
};
