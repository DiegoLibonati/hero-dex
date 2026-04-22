import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";
import type { AuthContext as AuthContextT } from "@/types/contexts";
import type { AuthState } from "@/types/states";

import LoginPage from "@/pages/LoginPage/LoginPage";

import { AuthContext } from "@/contexts/AuthContext/AuthContext";

import { loginWithEmailPassword, signInWithGoogle } from "@/firebase/providers";

const mockAuthDispatch = jest.fn();

jest.mock("@/firebase/providers", () => ({
  loginWithEmailPassword: jest.fn(),
  signInWithGoogle: jest.fn(),
}));

const createContextValue = (overrides: Partial<AuthState> = {}): AuthContextT => ({
  state: {
    logged: "not-authenticated",
    uid: "",
    displayName: "",
    email: "",
    photoURL: "",
    errorMessage: "",
    ...overrides,
  },
  dispatch: mockAuthDispatch,
});

const renderPage = (overrides: Partial<AuthState> = {}): RenderResult =>
  render(
    <AuthContext.Provider value={createContextValue(overrides)}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </AuthContext.Provider>
  );

describe("LoginPage", () => {
  describe("rendering", () => {
    it("should render the email input", () => {
      renderPage();
      expect(screen.getByPlaceholderText("Enter your email...")).toBeInTheDocument();
    });

    it("should render the password input", () => {
      renderPage();
      expect(screen.getByPlaceholderText("Enter your password...")).toBeInTheDocument();
    });

    it("should render the login submit button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Sign in with email and password" })
      ).toBeInTheDocument();
    });

    it("should render the Google sign-in button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Sign in with Google" })).toBeInTheDocument();
    });

    it("should render the register link when not checking", () => {
      renderPage({ logged: "not-authenticated" });
      expect(screen.getByRole("link", { name: "Go to registration page" })).toBeInTheDocument();
    });

    it("should hide the register link when checking credentials", () => {
      renderPage({ logged: "checking" });
      expect(
        screen.queryByRole("link", { name: "Go to registration page" })
      ).not.toBeInTheDocument();
    });

    it("should disable the login button when checking credentials", () => {
      renderPage({ logged: "checking" });
      expect(
        screen.getByRole("button", { name: "Sign in with email and password" })
      ).toBeDisabled();
    });

    it("should enable the login button when not checking", () => {
      renderPage({ logged: "not-authenticated" });
      expect(
        screen.getByRole("button", { name: "Sign in with email and password" })
      ).not.toBeDisabled();
    });
  });

  describe("behavior", () => {
    it("should call loginWithEmailPassword with the entered credentials on submit", async () => {
      const user = userEvent.setup();
      (loginWithEmailPassword as jest.Mock).mockResolvedValue({
        ok: true,
        uid: "uid-1",
        displayName: "Test User",
        email: "test@test.com",
        photoURL: "",
      });
      renderPage();
      await user.type(screen.getByPlaceholderText("Enter your email..."), "test@test.com");
      await user.type(screen.getByPlaceholderText("Enter your password..."), "password123");
      await user.click(screen.getByRole("button", { name: "Sign in with email and password" }));
      await waitFor(() => {
        expect(loginWithEmailPassword).toHaveBeenCalledWith("test@test.com", "password123");
      });
    });

    it("should dispatch AUTH_LOGIN on successful login", async () => {
      const user = userEvent.setup();
      (loginWithEmailPassword as jest.Mock).mockResolvedValue({
        ok: true,
        uid: "uid-1",
        displayName: "Test User",
        email: "test@test.com",
        photoURL: "",
      });
      renderPage();
      await user.type(screen.getByPlaceholderText("Enter your email..."), "test@test.com");
      await user.type(screen.getByPlaceholderText("Enter your password..."), "password123");
      await user.click(screen.getByRole("button", { name: "Sign in with email and password" }));
      await waitFor(() => {
        expect(mockAuthDispatch).toHaveBeenCalledWith(
          expect.objectContaining({ type: "AUTH_LOGIN" })
        );
      });
    });

    it("should dispatch AUTH_LOGOUT when login fails", async () => {
      const user = userEvent.setup();
      (loginWithEmailPassword as jest.Mock).mockResolvedValue({
        ok: false,
        errorMessage: "Invalid credentials",
      });
      renderPage();
      await user.type(screen.getByPlaceholderText("Enter your email..."), "test@test.com");
      await user.type(screen.getByPlaceholderText("Enter your password..."), "wrongpass");
      await user.click(screen.getByRole("button", { name: "Sign in with email and password" }));
      await waitFor(() => {
        expect(mockAuthDispatch).toHaveBeenCalledWith(
          expect.objectContaining({ type: "AUTH_LOGOUT" })
        );
      });
    });

    it("should call signInWithGoogle when the Google button is clicked", async () => {
      const user = userEvent.setup();
      (signInWithGoogle as jest.Mock).mockResolvedValue({
        ok: true,
        uid: "uid-google",
        displayName: "Google User",
        email: "google@test.com",
        photoURL: "",
      });
      renderPage();
      await user.click(screen.getByRole("button", { name: "Sign in with Google" }));
      await waitFor(() => {
        expect(signInWithGoogle).toHaveBeenCalledTimes(1);
      });
    });

    it("should dispatch CHECKING_CREDENTIALS with not-authenticated when fields are empty on submit", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Sign in with email and password" }));
      await waitFor(() => {
        expect(mockAuthDispatch).toHaveBeenCalledWith({
          type: "CHECKING_CREDENTIALS",
          payload: "not-authenticated",
        });
      });
    });
  });
});
