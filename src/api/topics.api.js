import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { TOPICS_URL } = apiUrls;

export function getTopics(specialtyId) {
  const url = `${TOPICS_URL}/${specialtyId}`;
  return APIMiddleware.get(url, { noAuthToken: true });
}
