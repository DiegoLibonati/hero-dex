import { getHeroById } from "@/helpers/getHeroById";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

describe("getHeroById", () => {
  it("should return the hero matching the given id", () => {
    expect(getHeroById("1", mockHeroes)).toEqual(mockHeroes[0]);
  });

  it("should return undefined when no hero matches the id", () => {
    expect(getHeroById("999", mockHeroes)).toBeUndefined();
  });
});
