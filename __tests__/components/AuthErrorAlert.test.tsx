import { render, screen } from "@testing-library/react";

import AuthErrorAlert from "@/components/AuthErrorAlert/AuthErrorAlert";

import { useAuthContext } from "@/hooks/useAuthContext";

interface RenderComponent {
  container: HTMLElement;
}

const mockDispatch = jest.fn();

jest.mock("@/hooks/useAuthContext");

const renderComponent = (errorMessage = ""): RenderComponent => {
  (useAuthContext as jest.Mock).mockReturnValue({
    state: {
      logged: "not-authenticated",
      errorMessage,
      uid: "",
      email: "",
      displayName: "",
      photoURL: "",
    },
    dispatch: mockDispatch,
  });

  const { container } = render(<AuthErrorAlert />);
  return { container };
};

describe("AuthErrorAlert", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not have the open class when there is no error message", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLDivElement>(".alert-login")).toBeInTheDocument();
    expect(container.querySelector<HTMLDivElement>(".alert-login")).not.toHaveClass(
      "alert-login--open"
    );
  });

  it("should have the open class and display the error message when one is set", () => {
    const { container } = renderComponent("Invalid credentials");
    expect(container.querySelector<HTMLDivElement>(".alert-login")).toHaveClass(
      "alert-login--open"
    );
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("should dispatch CLEAR_ERROR_MESSAGE after 2 seconds", () => {
    jest.useFakeTimers();
    renderComponent("Some error");

    jest.advanceTimersByTime(2000);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "CLEAR_ERROR_MESSAGE" });
    jest.useRealTimers();
  });
});
