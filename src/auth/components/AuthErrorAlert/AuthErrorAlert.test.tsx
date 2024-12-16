import { render } from "@testing-library/react";

import { act } from "react";

import { AuthErrorAlert } from "./AuthErrorAlert";

import { AuthProvider, useAuthContext } from "../../context/AuthProvider";

import { getMockAuthState } from "../../../tests/jest.setup";

type RenderComponent = {
  container: HTMLElement;
};

jest.mock("../../context/AuthProvider", () => ({
  ...jest.requireActual("../../context/AuthProvider"),
  useAuthContext: jest.fn(),
}));

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

describe("When there is an error message.", () => {
  const mockAuthState = getMockAuthState({
    uid: "1234",
    displayName: "pepe",
    email: "qwe@gmail.com",
    errorMessage: "12345",
    logged: "yes",
    photoURL: "www.google.com",
  });
  const mockClearErrorMessage = jest.fn();

  beforeEach(() => {
    (useAuthContext as jest.Mock).mockReturnValue({
      authState: mockAuthState,
      clearErrorMessage: mockClearErrorMessage,
    });
  });

  test("It must render the alert.", () => {
    const { container } = renderComponent();

    const alert = container.querySelector(".alert-login");

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("alert-open");
    expect(alert).toHaveTextContent(mockAuthState.errorMessage);
  });

  test("It should hide the alert after 2 seconds.", () => {
    jest.useFakeTimers();

    const { container } = renderComponent();

    const alert = container.querySelector(".alert-login");

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("alert-open");
    expect(alert).toHaveTextContent(mockAuthState.errorMessage);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockClearErrorMessage).toHaveBeenCalledTimes(1);

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
  const mockClearErrorMessage = jest.fn();

  beforeEach(() => {
    (useAuthContext as jest.Mock).mockReturnValue({
      authState: mockAuthState,
      clearErrorMessage: mockClearErrorMessage,
    });
  });

  test("It must render the alert.", () => {
    const { container } = renderComponent();

    const alert = container.querySelector(".alert-login");

    expect(alert).toBeInTheDocument();
    expect(alert).not.toHaveClass("alert-open");
    expect(alert).toBeEmptyDOMElement();
  });
});
