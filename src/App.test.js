import { apiUrls } from "./common/constants/apiUrl";

test("uses the NestJS backend for every API group", () => {
  Object.values(apiUrls).forEach((url) => {
    expect(url).toMatch(/^https:\/\/mobile\.memoflashcards\.com/);
  });
});
