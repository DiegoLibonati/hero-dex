import { getHeroesByPublishers } from "./getHeroesByPublishers";

import { HEROES_MOCK } from "../../tests/jest.setup";

test("It should return all of the heroes when 'all' or empty is entered.", () => {
  const heroes = getHeroesByPublishers("all", HEROES_MOCK);

  expect(heroes).toEqual(HEROES_MOCK);
  expect(heroes).toHaveLength(HEROES_MOCK.length);

  const heroes2 = getHeroesByPublishers("", HEROES_MOCK);

  expect(heroes2).toEqual(HEROES_MOCK);
  expect(heroes2).toHaveLength(HEROES_MOCK.length);
});

test("It should return the heroes based on the publisher entered.", () => {
  const heroes = getHeroesByPublishers("Marvel Comics", HEROES_MOCK);

  expect(heroes).toHaveLength(2);
});
