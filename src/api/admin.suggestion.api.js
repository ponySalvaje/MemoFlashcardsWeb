import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { ADMIN_SUGGESTIONS_URL } = apiUrls;

export function getAdminSuggestions() {
  const url = `${ADMIN_SUGGESTIONS_URL}`;
  return APIMiddleware.get(url);
}

export function getAdminSuggestionById(id) {
  const url = `${ADMIN_SUGGESTIONS_URL}/${id}`;
  return APIMiddleware.get(url);
}

export function readAdminSuggestion(id) {
  const url = `${ADMIN_SUGGESTIONS_URL}/${id}`;
  return APIMiddleware.patch(url);
}
