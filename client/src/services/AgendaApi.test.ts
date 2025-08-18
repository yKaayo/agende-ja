import { userAgenda } from "./AgendaApi";

// Mocks
jest.mock("./AgendaApi");

describe("Testing agenda API calls", () => {
  const mockedUserAgenda = userAgenda as jest.Mock;

  beforeEach(() => {
    mockedUserAgenda.mockReset();
  });

  describe("userAgenda", () => {
    it("It should return the user agenda", async () => {
      mockedUserAgenda.mockResolvedValue([
        { _id: "1", date: "01/08/2025", time: "11:00" },
        { _id: "2", date: "01/08/2025", time: "16:00" },
      ]);

      const agenda = await userAgenda("caiolindao@gmail.com");
      expect(agenda).toHaveLength(2);

      for (const item of agenda) {
        expect(item).toHaveProperty("_id");
        expect(item).toHaveProperty("date");
        expect(item).toHaveProperty("time");
      }
    });

    it("It should return empty array", async () => {
      mockedUserAgenda.mockResolvedValue([]);

      const agenda = await userAgenda("emailnãoexiste@email.com");
      expect(agenda).toHaveLength(0);
    });
  });
});
