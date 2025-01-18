import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { RegisterPage } from "./RegisterPage";

import { AuthProvider, useAuthContext } from "../../context/AuthProvider";

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

jest.mock("../../context/AuthProvider", () => ({
  ...jest.requireActual("../../context/AuthProvider"),
  useAuthContext: jest.fn(),
}));

describe("RegisterPage.tsx", () => {
  describe("General Tests.", () => {
    const mockStartCreatingUserWithEmail = jest.fn();

    beforeEach(() => {
      (useAuthContext as jest.Mock).mockReturnValue({
        startCreatingUserWithEmail: mockStartCreatingUserWithEmail,
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

    test("It must run the startCreatingUserWithEmail function with the correct parameters when Register is clicked. Additionally, the inputs must have valid content.", async () => {
      const username = "pepiño";
      const email = "pepe@gmail.com";
      const password = "pepe";

      renderComponent();

      const inputUsername = screen.getByPlaceholderText(
        "Enter one username..."
      );
      const inputEmail = screen.getByPlaceholderText("Enter one email...");
      const inputPassword = screen.getByPlaceholderText(
        "Enter one password..."
      );
      const btnRegister = screen.getByRole("button", { name: /register/i });

      expect(inputUsername).toBeInTheDocument();
      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      expect(btnRegister).toBeInTheDocument();

      await user.clear(inputUsername);
      await user.click(inputUsername);
      await user.keyboard(username);

      await user.clear(inputEmail);
      await user.click(inputEmail);
      await user.keyboard(email);

      await user.clear(inputPassword);
      await user.click(inputPassword);
      await user.keyboard(password);

      expect(inputUsername).toHaveValue(username);
      expect(inputEmail).toHaveValue(email);
      expect(inputPassword).toHaveValue(password);

      await user.click(btnRegister);

      expect(mockStartCreatingUserWithEmail).toHaveBeenCalledTimes(1);
      expect(mockStartCreatingUserWithEmail).toHaveBeenCalledWith("checking", {
        email: email,
        password: password,
        username: username,
      });
    });
  });
});
