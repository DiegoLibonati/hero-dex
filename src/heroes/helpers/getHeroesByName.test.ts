import { getHeroesByName } from "./getHeroesByName";

import { HEROE_ONE_MOCK, HEROES_MOCK } from "../../tests/jest.setup";

test("It must get the heroes by name.", () => {
  const heroes = getHeroesByName(HEROE_ONE_MOCK.name, HEROES_MOCK);

  expect(heroes).toHaveLength(1);
  expect(heroes[0].name).toEqual(HEROE_ONE_MOCK.name);
});

test("It should return an empty array if an empty name is entered.", () => {
  const heroes = getHeroesByName("", HEROES_MOCK);

  expect(heroes).toHaveLength(0);
});
