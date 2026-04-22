import { getHeroesByPublishers } from "@/helpers/getHeroesByPublishers";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

describe("getHeroesByPublishers", () => {
  describe("when publisher is 'all'", () => {
    it("should return all heroes", () => {
      const result = getHeroesByPublishers("all", mockHeroes);
      expect(result).toEqual(mockHeroes);
    });

    it("should be case insensitive for 'all'", () => {
      const result = getHeroesByPublishers("ALL", mockHeroes);
      expect(result).toEqual(mockHeroes);
    });
  });

  describe("when publisher is empty", () => {
    it("should return all heroes for an empty string", () => {
      const result = getHeroesByPublishers("", mockHeroes);
      expect(result).toEqual(mockHeroes);
    });
  });

  describe("when publisher matches heroes", () => {
    it("should return only heroes from the specified publisher", () => {
      const result = getHeroesByPublishers("Marvel Comics", mockHeroes);
      expect(result).toHaveLength(2);
      expect(result.every((h) => h.biography.publisher === "Marvel Comics")).toBe(true);
    });

    it("should be case insensitive when filtering by publisher", () => {
      const result = getHeroesByPublishers("marvel comics", mockHeroes);
      expect(result).toHaveLength(2);
    });

    it("should return a single hero when only one matches", () => {
      const result = getHeroesByPublishers("DC Comics", mockHeroes);
      expect(result).toHaveLength(1);
      expect(result[0]?.biography.publisher).toBe("DC Comics");
    });
  });

  describe("when publisher does not match any hero", () => {
    it("should return an empty array", () => {
      const result = getHeroesByPublishers("Image Comics", mockHeroes);
      expect(result).toEqual([]);
    });
  });

  describe("when the heroes array is empty", () => {
    it("should return an empty array", () => {
      const result = getHeroesByPublishers("Marvel Comics", []);
      expect(result).toEqual([]);
    });
  });
});
