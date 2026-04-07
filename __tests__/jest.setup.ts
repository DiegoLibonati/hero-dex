import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "util";

import { mockEnvs } from "@tests/__mocks__/envs.mock";

const mockFetch = jest.fn();
const mockSignInWithGoogle = jest.fn();
const mockRegisterUserWithEmail = jest.fn();
const mockLoginWithEmailPassword = jest.fn();
const mockLogoutFirebase = jest.fn();

Object.assign(globalThis, { TextEncoder, TextDecoder });

globalThis.fetch = mockFetch;

jest.mock("@/constants/envs", () => {
  return { __esModule: true, default: mockEnvs };
});

jest.mock("@/firebase/config", () => ({
  FirebaseAuth: {},
}));

jest.mock("@/firebase/providers", () => ({
  signInWithGoogle: mockSignInWithGoogle,
  registerUserWithEmail: mockRegisterUserWithEmail,
  loginWithEmailPassword: mockLoginWithEmailPassword,
  logoutFirebase: mockLogoutFirebase,
}));
