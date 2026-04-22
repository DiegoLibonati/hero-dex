import { AxiosError } from "axios";

import { apiHeroes } from "@/services/axios";
import heroService from "@/services/heroService";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

const mockGet = apiHeroes.get as jest.Mock;

jest.mock("@/services/axios", () => ({
  apiHeroes: {
    get: jest.fn(),
  },
}));

describe("heroService", () => {
  describe("getAll", () => {
    describe("when the request succeeds", () => {
      it("should return an array of heroes", async () => {
        mockGet.mockResolvedValue({ data: mockHeroes });
        const result = await heroService.getAll();
        expect(result).toEqual(mockHeroes);
      });

      it("should call apiHeroes.get with the correct endpoint", async () => {
        mockGet.mockResolvedValue({ data: mockHeroes });
        await heroService.getAll();
        expect(mockGet).toHaveBeenCalledWith("/api/all.json", { method: "GET" });
      });
    });

    describe("when an axios error occurs", () => {
      it("should throw an error with the HTTP status and message", async () => {
        const axiosError = Object.assign(new AxiosError("Request failed with status code 500"), {
          response: { status: 500 },
        });
        mockGet.mockRejectedValue(axiosError);
        await expect(heroService.getAll()).rejects.toThrow("HTTP error! status: 500");
      });

      it("should throw an error containing the axios error message", async () => {
        const axiosError = Object.assign(new AxiosError("Not found"), {
          response: { status: 404 },
        });
        mockGet.mockRejectedValue(axiosError);
        await expect(heroService.getAll()).rejects.toThrow("HTTP error! status: 404 - Not found");
      });
    });

    describe("when a non-axios error occurs", () => {
      it("should propagate the original error", async () => {
        mockGet.mockRejectedValue(new Error("Unexpected failure"));
        await expect(heroService.getAll()).rejects.toThrow("Unexpected failure");
      });
    });
  });
});
