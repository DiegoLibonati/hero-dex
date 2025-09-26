import { getHeroById } from "@src/heroes/helpers/getHeroById";

import { mockHeroeOne, mockHeroes } from "@tests/jest.constants";

describe("getHeroById.ts", () => {
  describe("General Tests.", () => {
    test("It must get a hero per id.", () => {
      const hero = getHeroById(String(mockHeroeOne.id), mockHeroes);

      expect(hero).toEqual(mockHeroeOne);
      expect(hero).toEqual(mockHeroeOne);
      expect(hero.id).toEqual(mockHeroeOne.id);
    });

    test("It should return undefined if the id is not found.", () => {
      const hero = getHeroById("1234", mockHeroes);

      expect(hero).toBeUndefined();
    });
  });
});
