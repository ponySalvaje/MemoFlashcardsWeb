import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { CARDS_URL } = apiUrls;

export function getCards(topicId) {
  const url = `${CARDS_URL}?subjectId=${topicId}&pageNumber=1&pageSize=1000`;
  return APIMiddleware.get(url);
}

export function searchCards() {
  const url = `${CARDS_URL}/search`;
  return APIMiddleware.get(url, { noAuthToken: true });
}
