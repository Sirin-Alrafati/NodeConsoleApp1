const apiClient = require("../client/apiClient");

module.exports = {
  login(payload) {
    return apiClient.post("/auth/login", payload);
  }
};
