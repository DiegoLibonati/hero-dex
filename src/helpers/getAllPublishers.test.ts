import { getAllPublishers } from "@src/helpers/getAllPublishers";

import { mockHeroes } from "@tests/jest.constants";

describe("getAllPublishers.ts", () => {
  describe("General Tests.", () => {
    test("It must return all of the publishers without repeating.", () => {
      const publishers = getAllPublishers(mockHeroes);

      expect(publishers).toHaveLength(3);
    });
  });
});
