import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { PROFILE_URL } = apiUrls;

export function getProfileInformation() {
  const url = `${PROFILE_URL}`;
  return APIMiddleware.get(url);
}
