import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import LoginPage from "@/pages/LoginPage/LoginPage";

import { useAuthContext } from "@/hooks/useAuthContext";

import { loginWithEmailPassword, signInWithGoogle } from "@/firebase/providers";

type RenderPage = { container: HTMLElement };

const mockDispatch = jest.fn();

jest.mock("@/hooks/useAuthContext");

const renderPage = (): RenderPage => {
  (useAuthContext as jest.Mock).mockReturnValue({
    state: {
      logged: "not-authenticated",
      errorMessage: "",
      uid: "",
      email: "",
      displayName: "",
      photoURL: "",
    },
    dispatch: mockDispatch,
  });

  const { container } = render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  return { container };
};

describe("LoginPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the email and password inputs", () => {
    renderPage();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  });

  it("should render the login and Google sign-in buttons", () => {
    renderPage();
    expect(
      screen.getByRole("button", { name: /sign in with email and password/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in with google/i })).toBeInTheDocument();
  });

  it("should render the link to the registration page", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /go to registration page/i })).toBeInTheDocument();
  });

  it("should call loginWithEmailPassword with the entered credentials on submit", async () => {
    const user = userEvent.setup();
    (loginWithEmailPassword as jest.Mock).mockResolvedValueOnce({
      ok: true,
      uid: "uid-1",
      displayName: "Test",
      email: "test@test.com",
      photoURL: "",
    });
    renderPage();

    await user.type(screen.getByPlaceholderText(/enter your email/i), "test@test.com");
    await user.type(screen.getByPlaceholderText(/enter your password/i), "pass123");
    await user.click(screen.getByRole("button", { name: /sign in with email and password/i }));

    await waitFor(() => {
      expect(loginWithEmailPassword).toHaveBeenCalledWith("test@test.com", "pass123");
    });
  });

  it("should call signInWithGoogle when the Google button is clicked", async () => {
    const user = userEvent.setup();
    (signInWithGoogle as jest.Mock).mockResolvedValueOnce({
      ok: true,
      uid: "uid-2",
      displayName: "Google User",
      email: "google@test.com",
      photoURL: "",
    });
    renderPage();

    await user.click(screen.getByRole("button", { name: /sign in with google/i }));

    await waitFor(() => {
      expect(signInWithGoogle).toHaveBeenCalledTimes(1);
    });
  });
});
