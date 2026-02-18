const apiClient = require("../client/apiClient");

module.exports = {
  getAll(params = {}) {
    return apiClient.get("/products", { params });
  },

  getById(id) {
    return apiClient.get(`/products/${id}`);
  },

  getCategories() {
    return apiClient.get("/products/categories");
  },

  getByCategory(categoryName) {
    return apiClient.get(`/products/category/${encodeURIComponent(categoryName)}`);
  }
};
