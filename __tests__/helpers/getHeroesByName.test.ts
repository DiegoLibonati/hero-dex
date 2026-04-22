import { getHeroesByName } from "@/helpers/getHeroesByName";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

describe("getHeroesByName", () => {
  describe("when a valid name is provided", () => {
    it("should return heroes whose name includes the search term", () => {
      const result = getHeroesByName("Abin", mockHeroes);
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe("Abin Sur");
    });

    it("should be case insensitive", () => {
      const result = getHeroesByName("abin sur", mockHeroes);
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe("Abin Sur");
    });

    it("should trim leading and trailing whitespace", () => {
      const result = getHeroesByName("  Abin  ", mockHeroes);
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe("Abin Sur");
    });

    it("should return multiple heroes when the term matches several names", () => {
      const result = getHeroesByName("Ab", mockHeroes);
      expect(result.length).toBeGreaterThan(1);
    });
  });

  describe("when name is empty or whitespace", () => {
    it("should return an empty array for an empty string", () => {
      const result = getHeroesByName("", mockHeroes);
      expect(result).toEqual([]);
    });

    it("should return an empty array for a whitespace-only string", () => {
      const result = getHeroesByName("   ", mockHeroes);
      expect(result).toEqual([]);
    });

    it("should return an empty array when name is omitted (default param)", () => {
      const result = getHeroesByName(undefined, mockHeroes);
      expect(result).toEqual([]);
    });
  });

  describe("when no heroes match the search term", () => {
    it("should return an empty array", () => {
      const result = getHeroesByName("nonexistenthero", mockHeroes);
      expect(result).toEqual([]);
    });
  });

  describe("when the heroes array is empty", () => {
    it("should return an empty array", () => {
      const result = getHeroesByName("Abin", []);
      expect(result).toEqual([]);
    });
  });
});
