import { http, HttpResponse } from "msw";

import heroService from "@/services/heroService";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";
import { mockMswServer } from "@tests/__mocks__/mswServer.mock";

describe("heroService", () => {
  describe("getAll", () => {
    describe("when the request succeeds", () => {
      it("should return an array of heroes", async () => {
        const result = await heroService.getAll();

        expect(result).toEqual(mockHeroes);
      });

      it("should return the same shape as the API payload", async () => {
        const result = await heroService.getAll();

        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toHaveProperty("id");
        expect(result[0]).toHaveProperty("name");
        expect(result[0]).toHaveProperty("biography");
      });
    });

    describe("when the API responds with a 500 error", () => {
      it("should throw an error containing the HTTP status", async () => {
        mockMswServer.use(
          http.get("/superhero-api/api/all.json", () => {
            return new HttpResponse(null, { status: 500 });
          })
        );

        await expect(heroService.getAll()).rejects.toThrow("HTTP error! status: 500");
      });
    });

    describe("when the API responds with a 404 error", () => {
      it("should throw an error containing the HTTP status", async () => {
        mockMswServer.use(
          http.get("/superhero-api/api/all.json", () => {
            return new HttpResponse(null, { status: 404 });
          })
        );

        await expect(heroService.getAll()).rejects.toThrow("HTTP error! status: 404");
      });
    });

    describe("when the network request fails", () => {
      it("should throw an error", async () => {
        mockMswServer.use(
          http.get("/superhero-api/api/all.json", () => {
            return HttpResponse.error();
          })
        );

        await expect(heroService.getAll()).rejects.toThrow();
      });
    });
  });
});
