import { getHeroesByName } from "@/helpers/getHeroesByName";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

describe("getHeroesByName", () => {
  it("should return heroes whose name includes the search term", () => {
    const result = getHeroesByName("a-bomb", mockHeroes);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("A-Bomb");
  });

  it("should be case-insensitive", () => {
    expect(getHeroesByName("A-BOMB", mockHeroes)).toEqual(getHeroesByName("a-bomb", mockHeroes));
  });

  it("should return an empty array when the search term is empty", () => {
    expect(getHeroesByName("", mockHeroes)).toEqual([]);
  });

  it("should return an empty array when no heroes match", () => {
    expect(getHeroesByName("nonexistent", mockHeroes)).toEqual([]);
  });
});
