import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { PROFILE_URL } = apiUrls;

export function getProgress() {
  const url = `${PROFILE_URL}/progress`;
  return APIMiddleware.get(url);
}

export function getSuspendedCards() {
  const url = `${PROFILE_URL}/suspended-progress`;
  return APIMiddleware.get(url);
}

export function getSuspendedGroups(specialtyId) {
  const url = `${PROFILE_URL}/suspended-detail?lessonId=${specialtyId}`;
  return APIMiddleware.get(url);
}

export function postSingleUnsuspend(cardId) {
  const url = `${PROFILE_URL}/single-unsuspend?cardId=${cardId}`;
  return APIMiddleware.post(url);
}

export function postBulkUnsuspend(lessonId) {
  const url = `${PROFILE_URL}/bulk-unsuspend?lessonId=${lessonId}`;
  return APIMiddleware.post(url);
}
