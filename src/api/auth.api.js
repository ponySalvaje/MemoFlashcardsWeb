import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { AUTH_URL } = apiUrls;

export function signIn(username, password) {
  const url = `${AUTH_URL}/login`;
  return APIMiddleware.post(url, {
    data: { username, password },
    noAuthToken: true,
  });
}

export function register(data) {
  const url = `${AUTH_URL}/register`;
  return APIMiddleware.post(url, {
    data: data,
    noAuthToken: true,
  });
}

export function forgotPassword(email) {
  const url = `${AUTH_URL}/forgot-password`;
  return APIMiddleware.post(url, {
    data: { email },
    noAuthToken: true,
  });
}

export function resetPassword(data) {
  const url = `${AUTH_URL}/reset-password`;
  return APIMiddleware.post(url, {
    data: data,
    noAuthToken: true,
  });
}
