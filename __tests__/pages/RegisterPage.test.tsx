import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { AuthContext as AuthContextT } from "@/types/contexts";
import type { AuthState } from "@/types/states";

import RegisterPage from "@/pages/RegisterPage/RegisterPage";

import { AuthContext } from "@/contexts/AuthContext/AuthContext";

import { registerUserWithEmail } from "@/firebase/providers";

const mockAuthDispatch = jest.fn();

jest.mock("@/firebase/providers", () => ({
  registerUserWithEmail: jest.fn(),
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

const renderPage = (): RenderResult =>
  render(
    <AuthContext.Provider value={createContextValue()}>
      <RegisterPage />
    </AuthContext.Provider>
  );

describe("RegisterPage", () => {
  describe("rendering", () => {
    it("should render the username input", () => {
      renderPage();
      expect(screen.getByPlaceholderText("Enter one username...")).toBeInTheDocument();
    });

    it("should render the email input", () => {
      renderPage();
      expect(screen.getByPlaceholderText("Enter one email...")).toBeInTheDocument();
    });

    it("should render the password input", () => {
      renderPage();
      expect(screen.getByPlaceholderText("Enter one password...")).toBeInTheDocument();
    });

    it("should render the register submit button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call registerUserWithEmail with the entered credentials on submit", async () => {
      const user = userEvent.setup();
      (registerUserWithEmail as jest.Mock).mockResolvedValue({
        ok: true,
        uid: "uid-1",
        displayName: "newuser",
        email: "new@test.com",
        photoURL: "",
      });
      renderPage();
      await user.type(screen.getByPlaceholderText("Enter one username..."), "newuser");
      await user.type(screen.getByPlaceholderText("Enter one email..."), "new@test.com");
      await user.type(screen.getByPlaceholderText("Enter one password..."), "pass1234");
      await user.click(screen.getByRole("button", { name: "Create account" }));
      await waitFor(() => {
        expect(registerUserWithEmail).toHaveBeenCalledWith("new@test.com", "pass1234", "newuser");
      });
    });

    it("should dispatch AUTH_LOGIN on successful registration", async () => {
      const user = userEvent.setup();
      (registerUserWithEmail as jest.Mock).mockResolvedValue({
        ok: true,
        uid: "uid-1",
        displayName: "newuser",
        email: "new@test.com",
        photoURL: "",
      });
      renderPage();
      await user.type(screen.getByPlaceholderText("Enter one username..."), "newuser");
      await user.type(screen.getByPlaceholderText("Enter one email..."), "new@test.com");
      await user.type(screen.getByPlaceholderText("Enter one password..."), "pass1234");
      await user.click(screen.getByRole("button", { name: "Create account" }));
      await waitFor(() => {
        expect(mockAuthDispatch).toHaveBeenCalledWith(
          expect.objectContaining({ type: "AUTH_LOGIN" })
        );
      });
    });

    it("should dispatch AUTH_LOGOUT when registration fails", async () => {
      const user = userEvent.setup();
      (registerUserWithEmail as jest.Mock).mockResolvedValue({
        ok: false,
        errorMessage: "Email already in use",
      });
      renderPage();
      await user.type(screen.getByPlaceholderText("Enter one username..."), "newuser");
      await user.type(screen.getByPlaceholderText("Enter one email..."), "taken@test.com");
      await user.type(screen.getByPlaceholderText("Enter one password..."), "pass1234");
      await user.click(screen.getByRole("button", { name: "Create account" }));
      await waitFor(() => {
        expect(mockAuthDispatch).toHaveBeenCalledWith(
          expect.objectContaining({ type: "AUTH_LOGOUT" })
        );
      });
    });

    it("should not call registerUserWithEmail when any field is empty", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.type(screen.getByPlaceholderText("Enter one username..."), "newuser");
      await user.click(screen.getByRole("button", { name: "Create account" }));
      await waitFor(() => {
        expect(registerUserWithEmail).not.toHaveBeenCalled();
      });
    });
  });
});
