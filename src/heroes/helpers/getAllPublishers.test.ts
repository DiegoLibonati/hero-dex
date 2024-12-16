import { getAllPublishers } from "./getAllPublishers";

import { HEROES_MOCK } from "../../tests/jest.setup";

test("It must return all of the publishers without repeating.", () => {
  const publishers = getAllPublishers(HEROES_MOCK);

  expect(publishers).toHaveLength(3);
});
