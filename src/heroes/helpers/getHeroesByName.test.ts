import { getHeroesByName } from "./getHeroesByName";

import { mockHeroeOne, mockHeroes } from "../../tests/jest.constants";

describe("getHeroesByName.ts", () => {
  describe("General Tests.", () => {
    test("It must get the heroes by name.", () => {
      const heroes = getHeroesByName(mockHeroeOne.name, mockHeroes);

      expect(heroes).toHaveLength(1);
      expect(heroes[0].name).toEqual(mockHeroeOne.name);
    });

    test("It should return an empty array if an empty name is entered.", () => {
      const heroes = getHeroesByName("", mockHeroes);

      expect(heroes).toHaveLength(0);
    });
  });
});
