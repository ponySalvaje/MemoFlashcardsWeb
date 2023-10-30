import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { SPECIALTIES_URL } = apiUrls;

export function getSpecialties() {
  const url = `${SPECIALTIES_URL}?pageSize=100&pageNumber=1`;
  return APIMiddleware.get(url, { noAuthToken: true });
}
