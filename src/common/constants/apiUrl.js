const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://mobile.memoflashcards.com";

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
  ADMIN_MC_CARDS_URL: `${BASE_URL}/mc-cards`,
  ADMIN_DAILY_CHALLENGE_URL: `${BASE_URL}/daily-challenge`,
  ADMIN_NEWS_URL: `${BASE_URL}/news`,
  ADMIN_SUGGESTIONS_URL: `${BASE_URL}/suggestions`,
  ADMIN_REPORTED_ISSUES_URL: `${BASE_URL}/reported-issues`,
};
