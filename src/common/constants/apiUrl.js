const BASE_URL = "https://api.memoflashcards.com";
const MOBILE_URL = "https://mobile.memoflashcards.com";

export const apiUrls = {
  BASE_URL,
  AUTH_URL: `${BASE_URL}/auth`,
  SPECIALTIES_URL: `${BASE_URL}/lessons`,
  TOPICS_URL: `${BASE_URL}/subjects`,
  CARDS_URL: `${BASE_URL}/cards`,
  SCORE_URL: `${BASE_URL}/score`,
  PROFILE_URL: `${BASE_URL}/profile`,
  ADMIN_SPECIALTIES_URL: `${BASE_URL}/admin/lessons`,
  ADMIN_TOPICS_URL: `${BASE_URL}/admin/subjects`,
  ADMIN_CARDS_URL: `${BASE_URL}/admin/cards`,
  ADMIN_USERS_URL: `${BASE_URL}/admin/users`,
  ADMIN_MC_CARDS_URL: `${MOBILE_URL}/mc-cards`,
  ADMIN_DAILY_CHALLENGE_URL: `${MOBILE_URL}/daily-challenge`,
  ADMIN_NEWS_URL: `${MOBILE_URL}/news`,
};
