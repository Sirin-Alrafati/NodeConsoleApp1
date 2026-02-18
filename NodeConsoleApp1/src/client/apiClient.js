const axios = require("axios");
const https = require("https");
const { baseUrl, timeoutMs } = require("../config/env");
const logger = require("../utils/logger");

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: timeoutMs,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      validateStatus: () => true
    });

    this.client.interceptors.request.use((request) => {
      logger.info(`REQUEST ${request.method.toUpperCase()} ${request.baseURL}${request.url}`);
      return request;
    });

    this.client.interceptors.response.use(
      (response) => {
        logger.info(`RESPONSE ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        logger.error(`HTTP ERROR: ${error.message}`);
        return Promise.reject(error);
      }
    );
  }

  async get(url, config = {}) {
    return this.client.get(url, config);
  }

  async post(url, body = {}, config = {}) {
    return this.client.post(url, body, config);
  }

  async delete(url, config = {}) {
    return this.client.delete(url, config);
  }
}

module.exports = new ApiClient();
