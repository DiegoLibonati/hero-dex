import type { Hero } from "@/types/app";

import { getAllPublishers } from "@/helpers/getAllPublishers";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

describe("getAllPublishers", () => {
  it("should return unique publishers from heroes", () => {
    const result = getAllPublishers(mockHeroes);
    expect(result).toEqual(["Marvel Comics", "Dark Horse Comics", "DC Comics"]);
  });

  it("should return an empty array when the heroes list is empty", () => {
    expect(getAllPublishers([])).toEqual([]);
  });

  it("should filter out heroes with an empty publisher string", () => {
    const heroWithEmpty: Hero = {
      ...mockHeroes[0]!,
      biography: { ...mockHeroes[0]!.biography, publisher: "" },
    };
    expect(getAllPublishers([heroWithEmpty])).toEqual([]);
  });

  it("should not include duplicate publishers", () => {
    const result = getAllPublishers(mockHeroes);
    expect(result.length).toBe(new Set(result).size);
  });
});
