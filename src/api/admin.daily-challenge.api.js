import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { ADMIN_DAILY_CHALLENGE_URL } = apiUrls;

export function getDailyChallenge() {
  const url = `${ADMIN_DAILY_CHALLENGE_URL}`;
  return APIMiddleware.get(url);
}

export function saveDailyChallenge(dailyChallenge) {
  const url = `${ADMIN_DAILY_CHALLENGE_URL}`;
  return APIMiddleware.post(url, {
    data: {
        question: dailyChallenge.question,
        options: dailyChallenge.options
    },
  });
}