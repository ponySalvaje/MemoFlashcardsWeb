import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { ADMIN_TOPICS_URL } = apiUrls;

export function getAdminTopics(id) {
  const url = `${ADMIN_TOPICS_URL}/list/${id}`;
  return APIMiddleware.get(url);
}

export function getAdminTopic(id) {
  const url = `${ADMIN_TOPICS_URL}/${id}`;
  return APIMiddleware.get(url);
}

export function createAdminTopic(topic) {
  const url = `${ADMIN_TOPICS_URL}`;
  return APIMiddleware.post(url, {
    data: { lessonId: topic.lessonId, title: topic.title },
  });
}

export function updateAdminTopic(id, topic) {
  const url = `${ADMIN_TOPICS_URL}/${id}`;
  return APIMiddleware.put(url, {
    data: { lessonId: topic.lessonId, title: topic.title },
  });
}

export function removeAdminTopic(id) {
  const url = `${ADMIN_TOPICS_URL}/${id}`;
  return APIMiddleware.delete(url);
}
