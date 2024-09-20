import http from "./http";
export function getToken(): string {
  return uni.getStorageSync("token") || "";
}

export function getRefreshToken(): string {
  return uni.getStorageSync("refreshToken") || "";
}
export function setToken({ token, refreshToken }) {
  uni.setStorageSync("token", token);
  uni.setStorageSync("refreshToken", refreshToken);
}

export function refresh(): Promise<any> {
  return http.middleware({
    method: "POST",
    url: "/",
    custom: { isToken: true },
  });
}
