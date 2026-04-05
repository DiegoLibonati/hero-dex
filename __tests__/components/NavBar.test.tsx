import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import NavBar from "@/components/NavBar/NavBar";

import { useAuthContext } from "@/hooks/useAuthContext";

import { logoutFirebase } from "@/firebase/providers";

interface RenderComponent {
  container: HTMLElement;
}

const mockDispatch = jest.fn();

jest.mock("@/hooks/useAuthContext");

const renderComponent = (): RenderComponent => {
  (useAuthContext as jest.Mock).mockReturnValue({
    state: {
      logged: "authenticated",
      errorMessage: "",
      uid: "uid-123",
      email: "test@test.com",
      displayName: "Test User",
      photoURL: "",
    },
    dispatch: mockDispatch,
  });
  (logoutFirebase as jest.Mock).mockResolvedValue(undefined);

  const { container } = render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  return { container };
};

describe("NavBar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the app title", () => {
    renderComponent();
    expect(screen.getByText("HeroesApp")).toBeInTheDocument();
  });

  it("should render the logged-in username", () => {
    renderComponent();
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("should render the Marvel, DC and Search navigation links", () => {
    renderComponent();
    expect(screen.getByRole("link", { name: /go to marvel comics page/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go to dc comics page/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go to search page/i })).toBeInTheDocument();
  });

  it("should open the sidebar when the hamburger button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();

    await user.click(screen.getByRole("button", { name: /toggle navigation menu/i }));

    expect(container.querySelector(".header-wrapper__nav--open")).toBeInTheDocument();
  });

  it("should call logoutFirebase and dispatch AUTH_LOGOUT when logout is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: /log out/i }));

    await waitFor(() => {
      expect(logoutFirebase).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "AUTH_LOGOUT",
        payload: { errorMessage: "" },
      });
    });
  });
});
