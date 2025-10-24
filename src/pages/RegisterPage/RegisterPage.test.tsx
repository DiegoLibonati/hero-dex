import { act } from "react";
import { screen, render, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";

import { RegisterPage } from "@src/pages/RegisterPage/RegisterPage";

import { AuthProvider } from "@src/contexts/AuthContext/AuthContext";

import { useAuthContext } from "@src/hooks/useAuthContext";

import { getMockAuthState } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <AuthProvider>
      <RegisterPage />
    </AuthProvider>
  );

  return {
    container: container,
  };
};

jest.mock("@src/hooks/useAuthContext", () => ({
  useAuthContext: jest.fn(),
}));

describe("RegisterPage.tsx", () => {
  describe("General Tests.", () => {
    const mockAuthState = getMockAuthState({
      uid: "",
      displayName: "",
      email: "",
      errorMessage: "",
      logged: "",
      photoURL: "",
    });
    const mockDispatch = jest.fn();

    beforeEach(() => {
      (useAuthContext as jest.Mock).mockReturnValue({
        state: mockAuthState,
        dispatch: mockDispatch,
      });
    });

    test("It must render the image next to the register.", () => {
      renderComponent();

      const img = screen.getByRole("img");

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute(
        "src",
        "https://i.pinimg.com/originals/96/b0/83/96b083f5f824d2b8b342047b66832276.gif"
      );
      expect(img).toHaveAttribute("alt", "gif");
    });

    test("It must render the title of the form, the email entry, the password entry and username entry. You must also render the register button.", () => {
      renderComponent();

      const headingForm = screen.getByRole("heading", {
        name: /you are one step away from being a superhero./i,
      });
      const inputUsername = screen.getByPlaceholderText(
        "Enter one username..."
      );
      const inputEmail = screen.getByPlaceholderText("Enter one email...");
      const inputPassword = screen.getByPlaceholderText(
        "Enter one password..."
      );
      const btnRegister = screen.getByRole("button", { name: /register/i });

      expect(headingForm).toBeInTheDocument();
      expect(inputUsername).toBeInTheDocument();
      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      expect(btnRegister).toBeInTheDocument();
    });
  });
});
