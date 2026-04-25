import { AxiosError } from "axios";

import { apiHeroes } from "@/services/axios";
import heroService from "@/services/heroService";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

const mockGet = jest.mocked(apiHeroes.get);

jest.mock("@/services/axios", () => ({
  apiHeroes: {
    get: jest.fn(),
  },
}));

const mockAxiosSuccess = (data: unknown): void => {
  mockGet.mockResolvedValue({ data } as Awaited<ReturnType<typeof apiHeroes.get>>);
};

const mockAxiosError = (status: number, message: string): void => {
  mockGet.mockRejectedValue(Object.assign(new AxiosError(message), { response: { status } }));
};

const mockAxiosNetworkError = (message = "Network error"): void => {
  mockGet.mockRejectedValue(new Error(message));
};

describe("heroService", () => {
  describe("getAll", () => {
    describe("when the request succeeds", () => {
      it("should return an array of heroes", async () => {
        mockAxiosSuccess(mockHeroes);
        const result = await heroService.getAll();
        expect(result).toEqual(mockHeroes);
      });

      it("should call apiHeroes.get with the correct endpoint", async () => {
        mockAxiosSuccess(mockHeroes);
        await heroService.getAll();
        expect(mockGet).toHaveBeenCalledWith("/api/all.json", { method: "GET" });
      });
    });

    describe("when an axios error occurs", () => {
      it("should throw an error with the HTTP status and message", async () => {
        mockAxiosError(500, "Request failed with status code 500");
        await expect(heroService.getAll()).rejects.toThrow("HTTP error! status: 500");
      });

      it("should throw an error containing the axios error message", async () => {
        mockAxiosError(404, "Not found");
        await expect(heroService.getAll()).rejects.toThrow("HTTP error! status: 404 - Not found");
      });
    });

    describe("when a non-axios error occurs", () => {
      it("should propagate the original error", async () => {
        mockAxiosNetworkError("Unexpected failure");
        await expect(heroService.getAll()).rejects.toThrow("Unexpected failure");
      });
    });
  });
});
