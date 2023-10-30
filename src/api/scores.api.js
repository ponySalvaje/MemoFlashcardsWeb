import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { SCORE_URL } = apiUrls;

export function scoreCard(cardId, score) {
  const url = `${SCORE_URL}`;
  return APIMiddleware.post(url, { data: { cardId, score } });
}
