import http from "../utils/http";
import { type HttpMethod } from "luch-request";
const moduleFills = import.meta.glob("./modules/*.ts", { eager: true });
const apiObj = Object.keys(moduleFills).reduce(
  (modules: { [key: string]: any }, path) => {
    const moduleName: string = path.replace(/^\.\/modules\/(.*)\.ts$/, "$1");
    const value: { [key: string]: any } = moduleFills[path] as {
      [key: string]: any;
    };
    modules[moduleName] = value?.default;
    return modules;
  },
  {}
);
const API: { [key: string]: any } = {};
Object.keys(apiObj).forEach((api) => {
  Object.assign(API, apiObj[api]);
});
const injectRequest = (apis: { [key: string]: any }) => {
  const request: { [key: string]: Function } = {};
  Object.keys(apis).forEach((item) => {
    const {
      method,
      url,
      isToken = false,
    }: { method: HttpMethod; url: string; isToken?: Boolean } = apis[item];
    request[item] = (dataOrParams = {}, ags = { showLoading: true }) => {
      const param = ["POST", "PUT", "DELET"].includes(method.toUpperCase())
        ? dataOrParams
        : { params: dataOrParams };
      return http.middleware({
        method: method.toUpperCase() as HttpMethod,
        url,
        ...param,
        custom: { isToken: isToken, ...ags },
      });
    };
  });
  return request;
};

export default injectRequest(API);
