import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { PROFILE_URL } = apiUrls;

export function getProfileInformation() {
  const url = `${PROFILE_URL}`;
  return APIMiddleware.get(url);
}

export function updateProfileInformation(name) {
  const url = `${PROFILE_URL}`;
  return APIMiddleware.put(url, { data: { name } });
}

export function upgradePremium(data, engagementTime) {
  const url = `${PROFILE_URL}/upgrade`;
  return APIMiddleware.post(url, { data: { data, engagementTime } });
}
