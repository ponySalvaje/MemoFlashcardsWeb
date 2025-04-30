import { APIMiddleware } from "../middleware/APIMiddleware";
import { apiUrls } from "../common/constants/apiUrl";

const { ADMIN_MC_CARDS_URL } = apiUrls;

export function getAdminMCCards(id) {
  const url = `${ADMIN_MC_CARDS_URL}/list/${id}`;
  return APIMiddleware.get(url);
}

export function getAdminMCCard(id) {
  const url = `${ADMIN_MC_CARDS_URL}/${id}`;
  return APIMiddleware.get(url);
}

export function saveAdminMCCard(card) {
  const url = `${ADMIN_MC_CARDS_URL}`;
  return APIMiddleware.post(url, {
    data: {
      topicId: card.topicId,
      question: card.question,
      answers: card.answers,
    },
  });
}

export function updateAdminMCCard(id, card) {
  const url = `${ADMIN_MC_CARDS_URL}/${id}`;
  return APIMiddleware.patch(url, {
    data: {
      topicId: card.topicId,
      question: card.question,
      answers: card.answers,
    },
  });
}

export function removeAdminMCCard(id) {
  const url = `${ADMIN_MC_CARDS_URL}/${id}`;
  return APIMiddleware.delete(url);
}
