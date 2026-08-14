import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { TOPICS_URL } = apiUrls;

export async function getTopics(specialtyId) {
  const url = `${TOPICS_URL}/${specialtyId}?pageSize=1000&pageNumber=1`;
  const response = await APIMiddleware.get(url, { noAuthToken: true });
  const topics = Array.isArray(response?.data)
    ? response.data
    : response?.data?.content;

  if (!Array.isArray(topics)) {
    throw new Error("Invalid topics response");
  }

  return topics;
}
