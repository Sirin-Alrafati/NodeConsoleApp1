const apiClient = require("../client/apiClient");

module.exports = {
  getAll(params = {}) {
    return apiClient.get("/carts", { params });
  },

  getById(id) {
    return apiClient.get(`/carts/${id}`);
  },

  getByUser(userId) {
    return apiClient.get(`/carts/user/${userId}`);
  }
};
