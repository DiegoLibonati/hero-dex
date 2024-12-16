import { getHeroById } from "./getHeroById";

import { HEROE_ONE_MOCK, HEROES_MOCK } from "../../tests/jest.setup";

test("It must get a hero per id.", () => {
  const hero = getHeroById(String(HEROE_ONE_MOCK.id), HEROES_MOCK);

  expect(hero).toEqual(HEROE_ONE_MOCK);
  expect(hero).toEqual(HEROE_ONE_MOCK);
  expect(hero.id).toEqual(HEROE_ONE_MOCK.id);
});

test("It should return undefined if the id is not found.", () => {
  const hero = getHeroById("1234", HEROES_MOCK);

  expect(hero).toBeUndefined();
});
