import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { ADMIN_CARDS_URL } = apiUrls;

export function getAdminCards(id) {
  const url = `${ADMIN_CARDS_URL}/list/${id}`;
  return APIMiddleware.get(url);
}

export function getAdminCard(id) {
  const url = `${ADMIN_CARDS_URL}/${id}`;
  return APIMiddleware.get(url);
}

export function saveAdminCard(card) {
  const url = `${ADMIN_CARDS_URL}`;
  return APIMiddleware.post(url, {
    data: {
      subjectId: card.subjectId,
      title: card.title,
      question: card.question,
      answer: card.answer,
      help: card.help,
      isFree: card.isFree,
    },
  });
}

export function updateAdminCard(id, card) {
  const url = `${ADMIN_CARDS_URL}/${id}`;
  return APIMiddleware.put(url, {
    data: {
      subjectId: card.subjectId,
      title: card.title,
      question: card.question,
      answer: card.answer,
      help: card.help,
      isFree: card.isFree,
    },
  });
}

export function removeAdminCard(id) {
  const url = `${ADMIN_CARDS_URL}/${id}`;
  return APIMiddleware.delete(url);
}
