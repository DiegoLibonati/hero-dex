import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import MockAdapter from "axios-mock-adapter";

import axios from "axios";
import { MemoryRouter } from "react-router-dom";

import { SearchPage } from "./SearchPage";

import { HeroesProvider } from "../../context/HeroesProvider";

import { mockHeroeOne, mockHeroes } from "../../../tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <HeroesProvider>
        <SearchPage />
      </HeroesProvider>
    </MemoryRouter>
  );

  await screen.findAllByRole("heading");

  return {
    container: container,
  };
};

describe("SearchPage.tsx", () => {
  describe("General Tests.", () => {
    const mock = new MockAdapter(axios);

    mock.onGet("/superhero-api/api/all.json").reply(200, mockHeroes);

    test("It must render the page title.", async () => {
      await asyncRenderComponent();

      const title = screen.getByRole("heading", {
        name: /search your favorite hero/i,
      });

      expect(title).toBeInTheDocument();
    });

    test("It must render the input and the submit button.", async () => {
      await asyncRenderComponent();

      const input = screen.getByPlaceholderText("Search a hero");
      const btnSubmit = screen.getByRole("button", { name: /search/i });

      expect(input).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
    });

    test("It should render the default search message.", async () => {
      await asyncRenderComponent();

      const message = screen.getByText("Search a hero");

      expect(message).toBeInTheDocument();
    });

    test("It should display the message that there are no heroes with the name entered.", async () => {
      const valueNotFound = "asedasdjaslkdjalñsdjañolsd";

      await asyncRenderComponent();

      const input = screen.getByPlaceholderText("Search a hero");
      const btnSubmit = screen.getByRole("button", { name: /search/i });
      const messageNotFound = screen.queryByText(`No hero with`);

      expect(input).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
      expect(messageNotFound).not.toBeInTheDocument();

      await user.clear(input);
      await user.click(input);
      await user.keyboard(valueNotFound);

      await user.click(btnSubmit);

      expect(screen.getByText(`No hero with`)).toBeInTheDocument();
    });

    test("It must find the heroes with the name entered.", async () => {
      const value = mockHeroeOne.name;

      await asyncRenderComponent();

      const input = screen.getByPlaceholderText("Search a hero");
      const btnSubmit = screen.getByRole("button", { name: /search/i });
      const heroCard = screen.queryByRole("listitem");

      expect(input).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
      expect(heroCard).not.toBeInTheDocument();

      await user.clear(input);
      await user.click(input);
      await user.keyboard(value);

      await user.click(btnSubmit);

      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });
  });
});
