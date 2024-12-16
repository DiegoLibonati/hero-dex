import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "./LoginPage";

import { AuthProvider, useAuthContext } from "../../context/AuthProvider";

import { getMockAuthState } from "../../../tests/jest.setup";

type RenderComponent = {
  container: HTMLElement;
};

jest.mock("../../context/AuthProvider", () => ({
  ...jest.requireActual("../../context/AuthProvider"),
  useAuthContext: jest.fn(),
}));

const mockAuthState = getMockAuthState({
  uid: "1234",
  displayName: "pepe",
  email: "qwe@gmail.com",
  errorMessage: "12345",
  logged: "yes",
  photoURL: "www.google.com",
});
const mockCheckingAuthentication = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();
const mockStartGoogleSignIn = jest.fn();

beforeEach(() => {
  (useAuthContext as jest.Mock).mockReturnValue({
    authState: mockAuthState,
    checkingAuthentication: mockCheckingAuthentication,
    startLoginWithEmailPassword: mockStartLoginWithEmailPassword,
    startGoogleSignIn: mockStartGoogleSignIn,
  });
});

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
  const inputPassword = screen.getByPlaceholderText("Enter your password...");
  const btnLogin = screen.getByRole("button", { name: /simple login/i });
  const linkRegister = screen.getByRole("link", {
    name: /go to register page/i,
  });
  const btnGoogle = screen.getByRole("button", { name: /login with google/i });

  expect(headingForm).toBeInTheDocument();
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(btnLogin).toBeInTheDocument();
  expect(linkRegister).toBeInTheDocument();
  expect(btnGoogle).toBeInTheDocument();
});

test("It must execute the login with Google function when you click on said button.", async () => {
  renderComponent();

  const btnGoogle = screen.getByRole("button", { name: /login with google/i });

  expect(btnGoogle).toBeInTheDocument();

  await user.click(btnGoogle);

  expect(mockStartGoogleSignIn).toHaveBeenCalledTimes(1);
});

test("It must run the checkingAuthentication function with the not-authenticated parameter when invalid values ​​are entered when clicking login.", async () => {
  renderComponent();

  const btnLogin = screen.getByRole("button", { name: /simple login/i });

  expect(btnLogin).toBeInTheDocument();

  await user.click(btnLogin);

  expect(mockCheckingAuthentication).toHaveBeenCalledTimes(1);
  expect(mockCheckingAuthentication).toHaveBeenCalledWith("not-authenticated");
});

test("It must execute the startLoginWithEmailPassword function when you click login and also the inputs have valid values.", async () => {
  const email = "pepe@gmail.com";
  const password = "pepe";

  renderComponent();

  const btnLogin = screen.getByRole("button", { name: /simple login/i });
  const inputEmail = screen.getByPlaceholderText("Enter your email...");
  const inputPassword = screen.getByPlaceholderText("Enter your password...");

  expect(btnLogin).toBeInTheDocument();
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();

  await user.clear(inputEmail);
  await user.click(inputEmail);
  await user.keyboard(email);

  await user.clear(inputPassword);
  await user.click(inputPassword);
  await user.keyboard(password);

  expect(inputEmail).toHaveValue(email);
  expect(inputPassword).toHaveValue(password);

  await user.click(btnLogin);

  expect(mockStartLoginWithEmailPassword).toHaveBeenCalledTimes(1);
  expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith("checking", {
    email: email,
    password: password,
  });
});
