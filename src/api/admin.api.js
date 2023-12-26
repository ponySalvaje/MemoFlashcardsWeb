import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { ADMIN_SPECIALTIES_URL } = apiUrls;
const { ADMIN_TOPICS_URL } = apiUrls;
const { ADMIN_CARDS_URL } = apiUrls;

export function getAdminSpecialties() {
  const url = `${ADMIN_SPECIALTIES_URL}/list`;
  return APIMiddleware.get(url);
}

export function getAdminTopics(id) {
  const url = `${ADMIN_TOPICS_URL}/list/${id}`;
  return APIMiddleware.get(url);
}

export function getAdminCards(id) {
  const url = `${ADMIN_CARDS_URL}/list/${id}`;
  return APIMiddleware.get(url);
}
