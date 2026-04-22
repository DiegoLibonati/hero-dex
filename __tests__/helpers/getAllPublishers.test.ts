import { getAllPublishers } from "@/helpers/getAllPublishers";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

describe("getAllPublishers", () => {
  describe("when heroes have different publishers", () => {
    it("should return unique publishers", () => {
      const result = getAllPublishers(mockHeroes);
      expect(result).toEqual(["Marvel Comics", "Dark Horse Comics", "DC Comics"]);
    });

    it("should not include duplicate publishers", () => {
      const result = getAllPublishers(mockHeroes);
      expect(result.length).toBe(new Set(result).size);
    });
  });

  describe("when all heroes share the same publisher", () => {
    it("should return a single publisher", () => {
      const heroes = [mockHeroes[0]!, mockHeroes[3]!];
      const result = getAllPublishers(heroes);
      expect(result).toEqual(["Marvel Comics"]);
    });
  });

  describe("when a hero has an empty publisher", () => {
    it("should filter out heroes with an empty publisher", () => {
      const heroWithEmptyPublisher = {
        ...mockHeroes[0]!,
        biography: { ...mockHeroes[0]!.biography, publisher: "" },
      };
      const result = getAllPublishers([heroWithEmptyPublisher]);
      expect(result).toEqual([]);
    });
  });

  describe("when heroes array is empty", () => {
    it("should return an empty array", () => {
      const result = getAllPublishers([]);
      expect(result).toEqual([]);
    });
  });
});
