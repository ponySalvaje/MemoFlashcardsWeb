import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { ADMIN_NEWS_URL } = apiUrls;

export function getAdminNews() {
  const url = `${ADMIN_NEWS_URL}`;
  return APIMiddleware.get(url);
}

export function getAdminNewsById(id) {
  const url = `${ADMIN_NEWS_URL}/${id}`;
  return APIMiddleware.get(url);
}

export function createAdminNews(news) {
  const url = `${ADMIN_NEWS_URL}`;
  return APIMiddleware.post(url, { data: { ...news } });
}

export function updateAdminNews(id, news) {
  const url = `${ADMIN_NEWS_URL}/${id}`;
  return APIMiddleware.put(url, { data: { ...news } });
}

export function removeAdminNews(id) {
  const url = `${ADMIN_NEWS_URL}/${id}`;
  return APIMiddleware.delete(url);
}
