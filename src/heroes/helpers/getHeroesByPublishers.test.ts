import { getHeroesByPublishers } from "./getHeroesByPublishers";

import { mockHeroes } from "../../../tests/jest.constants";

describe("getHeroesByPublishers.ts", () => {
  describe("General Tests.", () => {
    test("It should return all of the heroes when 'all' or empty is entered.", () => {
      const heroes = getHeroesByPublishers("all", mockHeroes);

      expect(heroes).toEqual(mockHeroes);
      expect(heroes).toHaveLength(mockHeroes.length);

      const heroes2 = getHeroesByPublishers("", mockHeroes);

      expect(heroes2).toEqual(mockHeroes);
      expect(heroes2).toHaveLength(mockHeroes.length);
    });

    test("It should return the heroes based on the publisher entered.", () => {
      const heroes = getHeroesByPublishers("Marvel Comics", mockHeroes);

      expect(heroes).toHaveLength(2);
    });
  });
});
