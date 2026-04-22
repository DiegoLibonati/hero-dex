import { getHeroById } from "@/helpers/getHeroById";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

describe("getHeroById", () => {
  describe("when the hero exists", () => {
    it("should return the hero with the matching id", () => {
      const result = getHeroById("1", mockHeroes);
      expect(result).toEqual(mockHeroes[0]);
    });

    it("should return the correct hero for any valid id", () => {
      const result = getHeroById("3", mockHeroes);
      expect(result?.id).toBe(3);
      expect(result?.name).toBe("Abin Sur");
    });
  });

  describe("when the hero does not exist", () => {
    it("should return undefined for a non-existent id", () => {
      const result = getHeroById("999", mockHeroes);
      expect(result).toBeUndefined();
    });

    it("should return undefined for an empty string id", () => {
      const result = getHeroById("", mockHeroes);
      expect(result).toBeUndefined();
    });

    it("should return undefined for a non-numeric string id", () => {
      const result = getHeroById("abc", mockHeroes);
      expect(result).toBeUndefined();
    });
  });

  describe("when the heroes array is empty", () => {
    it("should return undefined", () => {
      const result = getHeroById("1", []);
      expect(result).toBeUndefined();
    });
  });
});
