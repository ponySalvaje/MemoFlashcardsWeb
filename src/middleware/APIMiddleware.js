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

  async post(
    url,
    config = { noAuthToken: false, isFormData: false, ...defaultConfig }
  ) {
    const { params, responseType, data, noAuthToken, isFormData } = config;
    const headers = noAuthToken
      ? { "Content-Type": "application/json" }
      : await getHeaders(isFormData);

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

  async put(url, config = { isFormData: false, ...defaultConfig }) {
    const { params, responseType, data, isFormData } = config;
    const headers = await getHeaders(isFormData);
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

async function getHeaders(isFormData = false) {
  try {
    const token = await getToken();
    if (token) {
      if (isFormData) {
        return {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };
      } else {
        return {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
      }
    } else {
      throw new Error("Token not available.");
    }
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
}
