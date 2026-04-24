import { act, render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { AuthContext as AuthContextT } from "@/types/contexts";
import type { AuthState } from "@/types/states";

import AuthErrorAlert from "@/components/AuthErrorAlert/AuthErrorAlert";

import { AuthContext } from "@/contexts/AuthContext/AuthContext";

const mockAuthDispatch = jest.fn();

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

const renderComponent = (errorMessage = ""): RenderResult =>
  render(
    <AuthContext.Provider value={createContextValue({ errorMessage })}>
      <AuthErrorAlert />
    </AuthContext.Provider>
  );

describe("AuthErrorAlert", () => {
  describe("rendering", () => {
    it("should render without the open modifier class when there is no error message", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLDivElement>(".alert-login--open")).not.toBeInTheDocument();
    });

    it("should render with the open modifier class when there is an error message", () => {
      const { container } = renderComponent("Something went wrong");
      expect(container.querySelector<HTMLDivElement>(".alert-login--open")).toBeInTheDocument();
    });

    it("should display the error message text", () => {
      renderComponent("Invalid credentials");
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    it("should not display text when there is no error message", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLDivElement>(".alert-login")?.textContent).toBe("");
    });
  });

  describe("auto-clear behavior", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should dispatch CLEAR_ERROR_MESSAGE after 2 seconds", () => {
      renderComponent("Error occurred");
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(mockAuthDispatch).toHaveBeenCalledWith({ type: "CLEAR_ERROR_MESSAGE" });
    });

    it("should not dispatch CLEAR_ERROR_MESSAGE before 2 seconds have passed", () => {
      renderComponent("Error occurred");
      act(() => {
        jest.advanceTimersByTime(1999);
      });
      expect(mockAuthDispatch).not.toHaveBeenCalledWith({ type: "CLEAR_ERROR_MESSAGE" });
    });

    it("should not set a timer when there is no error message", () => {
      renderComponent();
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(mockAuthDispatch).not.toHaveBeenCalled();
    });
  });
});
