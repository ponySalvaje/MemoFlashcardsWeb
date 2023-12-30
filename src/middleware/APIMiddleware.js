import axios from "axios";
import { getToken } from "../services/indexedDB/tokenService";

const defaultConfig = {
  responseType: "json",
};

export const APIMiddleware = {
  async get(url, config = { noAuthToken: false, ...defaultConfig }) {
    const { params, responseType, noAuthToken } = config;
    const headers = noAuthToken
      ? { "Content-Type": "application/json" }
      : await getHeaders();
    try {
      return axios.get(url, { params, headers, responseType });
    } catch (error) {
      console.error("Error in GET request:", error);
      throw error;
    }
  },

  async post(url, config = { noAuthToken: false, ...defaultConfig }) {
    const { params, responseType, data, noAuthToken } = config;
    const headers = noAuthToken
      ? { "Content-Type": "application/json" }
      : await getHeaders();
    try {
      const response = await axios.post(url, data, {
        params,
        headers,
        responseType,
      });
      return response.data;
    } catch (error) {
      console.error("Error in POST request:", error);
      throw error;
    }
  },

  async put(url, config = { ...defaultConfig }) {
    const { params, responseType, data } = config;
    const headers = await getHeaders();
    try {
      const response = await axios.put(url, data, {
        params,
        headers,
        responseType,
      });
      return response.data;
    } catch (error) {
      console.error("Error in PUT request:", error);
      throw error;
    }
  },

  async delete(url, config = { ...defaultConfig }) {
    const { params, responseType, noAuthToken } = config;
    const headers = noAuthToken
      ? { "Content-Type": "application/json" }
      : await getHeaders();
    try {
      return axios.delete(url, { params, headers, responseType });
    } catch (error) {
      console.error("Error in DELETE request:", error);
      throw error;
    }
  },
};

async function getHeaders() {
  try {
    const token = await getToken();
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    } else {
      throw new Error("Token not available.");
    }
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
}
