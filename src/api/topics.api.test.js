import { APIMiddleware } from "../middleware/APIMiddleware";
import { getTopics } from "./topics.api";

jest.mock("../middleware/APIMiddleware", () => ({
  APIMiddleware: {
    get: jest.fn(),
  },
}));

describe("getTopics", () => {
  beforeEach(() => {
    APIMiddleware.get.mockReset();
  });

  test("returns topics from the paginated API response", async () => {
    const topics = [{ id: 1, title: "Topic" }];
    APIMiddleware.get.mockResolvedValue({ data: { content: topics } });

    await expect(getTopics(20)).resolves.toEqual(topics);
    expect(APIMiddleware.get).toHaveBeenCalledWith(
      expect.stringContaining("/subjects/20?pageSize=1000&pageNumber=1"),
      { noAuthToken: true }
    );
  });

  test("supports the non-paginated legacy response", async () => {
    const topics = [{ id: 2, title: "Legacy topic" }];
    APIMiddleware.get.mockResolvedValue({ data: topics });

    await expect(getTopics(20)).resolves.toEqual(topics);
  });

  test("rejects an invalid response instead of returning undefined", async () => {
    APIMiddleware.get.mockResolvedValue({ data: {} });

    await expect(getTopics(20)).rejects.toThrow("Invalid topics response");
  });
});
