import "@testing-library/jest-dom";

import { mockEnvs } from "@tests/__mocks__/envs.mock";

jest.mock("@/constants/envs", () => {
  return { __esModule: true, default: mockEnvs };
});
