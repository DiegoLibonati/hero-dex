import { act } from "react";
import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { NavBar } from "@src/ui/components/NavBar/NavBar";
import { AuthProvider, useAuthContext } from "@src/auth/context/AuthProvider";

import { getMockAuthState } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AuthProvider>
        <NavBar />
      </AuthProvider>
    </MemoryRouter>
  );

  return { container };
};

jest.mock("@src/auth/context/AuthProvider", () => ({
  ...jest.requireActual("@src/auth/context/AuthProvider"),
  useAuthContext: jest.fn(),
}));

describe("NavBar.tsx", () => {
  describe("General Tests.", () => {
    const mockAuthState = getMockAuthState({
      uid: "1234",
      displayName: "pepe",
      email: "qwe@gmail.com",
      errorMessage: "12345",
      logged: "yes",
      photoURL: "www.google.com",
    });
    const mockStartLogOutWithButton = jest.fn();

    beforeEach(() => {
      (useAuthContext as jest.Mock).mockReturnValue({
        authState: mockAuthState,
        startLogOutWithButton: mockStartLogOutWithButton,
      });
    });

    test("It must render the title link of the app and the button to manage the sidebar or navbar.", () => {
      renderComponent();

      const title = screen.getByRole("link", { name: /go to home by title/i });
      const btnManageSidebar = screen.getByRole("button", {
        name: /manage sidebar/i,
      });

      expect(title).toBeInTheDocument();
      expect(btnManageSidebar).toBeInTheDocument();
    });

    test("It must open and close the navbar or sidebar.", async () => {
      renderComponent();

      const nav = screen.getByRole("navigation");
      const btnManageSidebar = screen.getByRole("button", {
        name: /manage sidebar/i,
      });

      expect(nav).not.toHaveClass("header-wrapper__nav--open");

      await act(async () => {
        await user.click(btnManageSidebar);
      });

      expect(nav).toHaveClass("header-wrapper__nav--open");

      await act(async () => {
        await user.click(btnManageSidebar);
      });

      expect(nav).not.toHaveClass("header-wrapper__nav--open");
    });

    test("It must render the links and the logout button.", () => {
      renderComponent();

      const linkHome = screen.getByRole("link", { name: /go to home page/i });
      const linkMarvel = screen.getByRole("link", {
        name: /go to marvel page/i,
      });
      const linkDc = screen.getByRole("link", { name: /go to dc page/i });
      const linkSearch = screen.getByRole("link", {
        name: /go to search page/i,
      });
      const btnLogout = screen.getByRole("button", { name: /logout/i });

      expect(linkHome).toBeInTheDocument();
      expect(linkMarvel).toBeInTheDocument();
      expect(linkDc).toBeInTheDocument();
      expect(linkSearch).toBeInTheDocument();
      expect(btnLogout).toBeInTheDocument();
    });

    test("It should render the username in the sidebar/navbar.", () => {
      renderComponent();

      const displayName = screen.getByRole("heading", {
        name: mockAuthState.displayName,
      });

      expect(displayName).toBeInTheDocument();
    });

    test("It must execute the logout function when this button is clicked.", async () => {
      renderComponent();

      const btnLogout = screen.getByRole("button", { name: /logout/i });

      await act(async () => {
        await user.click(btnLogout);
      });

      expect(mockStartLogOutWithButton).toHaveBeenCalledTimes(1);
    });
  });
});
