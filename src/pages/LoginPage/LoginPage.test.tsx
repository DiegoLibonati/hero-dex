import { act } from "react";
import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "@src/pages/LoginPage/LoginPage";

import { AuthProvider } from "@src/contexts/AuthContext/AuthContext";

import { getMockAuthState } from "@tests/jest.constants";
import { useAuthContext } from "@src/hooks/useAuthContext";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>
  );

  return {
    container: container,
  };
};

jest.mock("@src/hooks/useAuthContext", () => ({
  useAuthContext: jest.fn(),
}));

describe("LoginPage.tsx", () => {
  describe("General Tests.", () => {
    const mockAuthState = getMockAuthState({
      uid: "1234",
      displayName: "pepe",
      email: "qwe@gmail.com",
      errorMessage: "12345",
      logged: "yes",
      photoURL: "www.google.com",
    });
    const mockDispatch = jest.fn();

    beforeEach(() => {
      (useAuthContext as jest.Mock).mockReturnValue({
        state: mockAuthState,
        dispatch: mockDispatch,
      });
    });

    test("It must render the image next to the login.", () => {
      renderComponent();

      const img = screen.getByRole("img");

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute(
        "src",
        "https://c.tenor.com/3Im54mMMkiUAAAAC/the-flash-running.gif"
      );
      expect(img).toHaveAttribute("alt", "gif");
    });

    test("It must render the title of the form, the email entry, and the password entry. You must also render the login, register and google buttons.", () => {
      renderComponent();

      const headingForm = screen.getByRole("heading", {
        name: /hello, do you want to be a superhero/i,
      });
      const inputEmail = screen.getByPlaceholderText("Enter your email...");
      const inputPassword = screen.getByPlaceholderText(
        "Enter your password..."
      );
      const btnLogin = screen.getByRole("button", { name: /simple login/i });
      const linkRegister = screen.getByRole("link", {
        name: /go to register page/i,
      });
      const btnGoogle = screen.getByRole("button", {
        name: /login with google/i,
      });

      expect(headingForm).toBeInTheDocument();
      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      expect(btnLogin).toBeInTheDocument();
      expect(linkRegister).toBeInTheDocument();
      expect(btnGoogle).toBeInTheDocument();
    });
  });
});
