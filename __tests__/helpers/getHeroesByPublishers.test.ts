import { getHeroesByPublishers } from "@/helpers/getHeroesByPublishers";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

describe("getHeroesByPublishers", () => {
  it("should return all heroes when publisher is 'all'", () => {
    expect(getHeroesByPublishers("all", mockHeroes)).toEqual(mockHeroes);
  });

  it("should return all heroes when publisher is an empty string", () => {
    expect(getHeroesByPublishers("", mockHeroes)).toEqual(mockHeroes);
  });

  it("should filter heroes by publisher (case-insensitive)", () => {
    const result = getHeroesByPublishers("marvel comics", mockHeroes);
    expect(result).toHaveLength(2);
    result.forEach((hero) => expect(hero.biography.publisher).toBe("Marvel Comics"));
  });

  it("should return an empty array for an unknown publisher", () => {
    expect(getHeroesByPublishers("Image Comics", mockHeroes)).toEqual([]);
  });
});
