import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";
import type { AuthContext as AuthContextT } from "@/types/contexts";
import type { AuthState } from "@/types/states";

import NavBar from "@/components/NavBar/NavBar";

import { AuthContext } from "@/contexts/AuthContext/AuthContext";

import { logoutFirebase } from "@/firebase/providers";

const mockAuthDispatch = jest.fn();

jest.mock("@/firebase/providers", () => ({
  logoutFirebase: jest.fn(),
}));

const createContextValue = (overrides: Partial<AuthState> = {}): AuthContextT => ({
  state: {
    logged: "authenticated",
    uid: "test-uid",
    displayName: "Test User",
    email: "test@test.com",
    photoURL: "",
    errorMessage: "",
    ...overrides,
  },
  dispatch: mockAuthDispatch,
});

const renderComponent = (overrides: Partial<AuthState> = {}): RenderResult =>
  render(
    <AuthContext.Provider value={createContextValue(overrides)}>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </AuthContext.Provider>
  );

describe("NavBar", () => {
  describe("rendering", () => {
    it("should render the Hero Dex title link", () => {
      renderComponent();
      expect(screen.getByText("Hero Dex")).toBeInTheDocument();
    });

    it("should render the toggle navigation button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Toggle navigation menu" })).toBeInTheDocument();
    });

    it("should render the Home navigation link", () => {
      renderComponent();
      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("should render the Marvel navigation link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Go to Marvel Comics page" })).toBeInTheDocument();
    });

    it("should render the DC navigation link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Go to DC Comics page" })).toBeInTheDocument();
    });

    it("should render the Search navigation link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Go to search page" })).toBeInTheDocument();
    });

    it("should render the logged-in user display name", () => {
      renderComponent({ displayName: "John Doe" });
      expect(screen.getByRole("heading", { name: "John Doe" })).toBeInTheDocument();
    });

    it("should render the logout button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Log out" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should open the sidebar when the toggle button is clicked", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const nav = container.querySelector(".header-wrapper__nav");
      expect(nav).not.toHaveClass("header-wrapper__nav--open");
      await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
      expect(nav).toHaveClass("header-wrapper__nav--open");
    });

    it("should close the sidebar on a second toggle click", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const toggle = screen.getByRole("button", { name: "Toggle navigation menu" });
      const nav = container.querySelector(".header-wrapper__nav");
      await user.click(toggle);
      await user.click(toggle);
      expect(nav).not.toHaveClass("header-wrapper__nav--open");
    });

    it("should call logoutFirebase when the logout button is clicked", async () => {
      const user = userEvent.setup();
      (logoutFirebase as jest.Mock).mockResolvedValue(undefined);
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Log out" }));
      await waitFor(() => {
        expect(logoutFirebase).toHaveBeenCalledTimes(1);
      });
    });

    it("should dispatch AUTH_LOGOUT after logout", async () => {
      const user = userEvent.setup();
      (logoutFirebase as jest.Mock).mockResolvedValue(undefined);
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Log out" }));
      await waitFor(() => {
        expect(mockAuthDispatch).toHaveBeenCalledWith({
          type: "AUTH_LOGOUT",
          payload: { errorMessage: "" },
        });
      });
    });
  });
});
