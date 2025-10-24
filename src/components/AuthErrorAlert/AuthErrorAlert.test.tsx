import { render } from "@testing-library/react";

import { act } from "react";

import { AuthErrorAlert } from "@src/components/AuthErrorAlert/AuthErrorAlert";

import { AuthProvider } from "@src/contexts/AuthContext/AuthContext";

import { useAuthContext } from "@src/hooks/useAuthContext";

import { getMockAuthState } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <AuthProvider>
      <AuthErrorAlert />
    </AuthProvider>
  );

  return {
    container: container,
  };
};

jest.mock("@src/hooks/useAuthContext", () => ({
  useAuthContext: jest.fn(),
}));

describe("AuthErrorAlert.tsx", () => {
  describe("When there is an error message.", () => {
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

    test("It must render the alert.", () => {
      const { container } = renderComponent();

      const alert = container.querySelector<HTMLDivElement>(".alert-login");

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass("alert-login--open");
      expect(alert).toHaveTextContent(mockAuthState.errorMessage);
    });

    test("It should hide the alert after 2 seconds.", () => {
      jest.useFakeTimers();

      const { container } = renderComponent();

      const alert = container.querySelector<HTMLDivElement>(".alert-login");

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass("alert-login--open");
      expect(alert).toHaveTextContent(mockAuthState.errorMessage);

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(mockDispatch).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });
  });

  describe("When there is NO error message.", () => {
    const mockAuthState = getMockAuthState({
      uid: "1234",
      displayName: "pepe",
      email: "qwe@gmail.com",
      errorMessage: "",
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

    test("It must render the alert.", () => {
      const { container } = renderComponent();

      const alert = container.querySelector<HTMLDivElement>(".alert-login");

      expect(alert).toBeInTheDocument();
      expect(alert).not.toHaveClass("alert-login--open");
      expect(alert).toBeEmptyDOMElement();
    });
  });
});
