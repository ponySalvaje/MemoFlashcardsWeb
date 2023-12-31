import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { ADMIN_USERS_URL } = apiUrls;

export function getAdminUsers() {
  const url = `${ADMIN_USERS_URL}/list`;
  return APIMiddleware.get(url);
}

export function getAdminUser(id) {
  const url = `${ADMIN_USERS_URL}/${id}`;
  return APIMiddleware.get(url);
}

export function createAdminUser(user) {
  const url = `${ADMIN_USERS_URL}`;
  return APIMiddleware.post(url, {
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      type: user.type,
    },
  });
}

export function updateAdminUser(id, user) {
  const url = `${ADMIN_USERS_URL}/${id}`;
  return APIMiddleware.put(url, {
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      type: user.type,
    },
  });
}

export function removeAdminUser(id) {
  const url = `${ADMIN_USERS_URL}/${id}`;
  return APIMiddleware.delete(url);
}
