import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import RegisterPage from "@/pages/RegisterPage/RegisterPage";

import { useAuthContext } from "@/hooks/useAuthContext";

import { registerUserWithEmail } from "@/firebase/providers";

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
      <RegisterPage />
    </MemoryRouter>
  );

  return { container };
};

describe("RegisterPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the username, email and password inputs", () => {
    renderPage();
    expect(screen.getByPlaceholderText(/enter one username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter one email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter one password/i)).toBeInTheDocument();
  });

  it("should render the create account button", () => {
    renderPage();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  it("should call registerUserWithEmail with the entered credentials on submit", async () => {
    const user = userEvent.setup();
    (registerUserWithEmail as jest.Mock).mockResolvedValueOnce({
      ok: true,
      uid: "uid-1",
      displayName: "newuser",
      email: "new@test.com",
      photoURL: "",
    });
    renderPage();

    await user.type(screen.getByPlaceholderText(/enter one username/i), "newuser");
    await user.type(screen.getByPlaceholderText(/enter one email/i), "new@test.com");
    await user.type(screen.getByPlaceholderText(/enter one password/i), "pass123");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(registerUserWithEmail).toHaveBeenCalledWith("new@test.com", "pass123", "newuser");
    });
  });
});
