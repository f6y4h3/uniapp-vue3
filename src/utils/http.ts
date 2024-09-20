import request from "luch-request";
import config from "../config";
import { getToken, getRefreshToken, refresh, setToken } from "./auth";
const http = new request({
  timeout: 60000,
  baseURL: config.baseUrl,
});
let isRefreshToken = false;
const requestList: Function[] = [];
http.interceptors.request.use((config) => {
  if (config.custom) {
    if (config.custom.isToken) {
      config.header
        ? (config.header = { ...config.header })
        : (config.header = {});
      config.header["Authorization"] = `Bearer ${getToken()}`;
    }
  }
  console.log(config,'request');
  
  return config;
});
http.interceptors.response.use(
  async (response) => {    
    const statusCode = response.statusCode;
    const { code } = response.data;
    switch (code) {
      case 200:
        return Promise.resolve(response.data);
        break;
      case 401:
        if (!isRefreshToken) {
          isRefreshToken = true;
          if (!getRefreshToken()) {
            return Promise.resolve(response.data);
          }
          try {
            const refreshToken = await refresh();
            setToken(refreshToken);
            requestList.forEach((cb) => cb());
            return http.middleware(response);
          } catch {
            requestList.forEach((cb) => cb());
          } finally {
            requestList.length = 0;
            isRefreshToken = false;
          }
        } else {
          return new Promise((resolve) => {
            requestList.push(() => {
              response.header
                ? (response.header = { ...response.header })
                : (response.header = {});
              response.header.Authorization = `Bearer ${getToken()}`;
              resolve(http.middleware(response));
            });
          });
        }
        break;
      default:
        return Promise.reject(response.data);
        break;
    }
    return response;
  },
  (errResponse) => {}
);
export default http;
