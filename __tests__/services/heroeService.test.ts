import { AxiosError } from "axios";

import heroeService from "@/services/heroeService";

import { apiHeroes } from "@/services/axios";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

jest.mock("@/services/axios");

describe("heroeService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return heroes on a successful request", async () => {
      (apiHeroes.get as jest.Mock).mockResolvedValueOnce({ data: mockHeroes });

      const result = await heroeService.getAll();

      expect(result).toEqual(mockHeroes);
      expect(apiHeroes.get).toHaveBeenCalledWith("/api/all.json", { method: "GET" });
    });

    it("should throw a formatted error on an AxiosError", async () => {
      const error = new AxiosError("Internal Server Error");
      Object.defineProperty(error, "response", { value: { status: 500 } });
      (apiHeroes.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(heroeService.getAll()).rejects.toThrow(
        "HTTP error! status: 500 - Internal Server Error"
      );
    });

    it("should re-throw a non-Axios error as-is", async () => {
      const error = new Error("Network failure");
      (apiHeroes.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(heroeService.getAll()).rejects.toThrow("Network failure");
    });
  });
});
