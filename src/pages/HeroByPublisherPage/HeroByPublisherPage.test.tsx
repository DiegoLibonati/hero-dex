import { act } from "react";
import { screen, render, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";

import { MemoryRouter } from "react-router-dom";

import { HeroByPublisherPage } from "@src/pages/HeroByPublisherPage/HeroByPublisherPage";

import { HeroesProvider } from "@src/contexts/HeroesContext/HeroesContext";

import { getAllPublishers } from "@src/helpers/getAllPublishers";
import { getHeroesByPublishers } from "@src/helpers/getHeroesByPublishers";

import { heroesApi } from "@src/api/heroes";

import { mockHeroeOne, mockHeroes } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <HeroesProvider>
        <HeroByPublisherPage />
      </HeroesProvider>
    </MemoryRouter>
  );

  return {
    container: container,
  };
};

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <HeroesProvider>
        <HeroByPublisherPage />
      </HeroesProvider>
    </MemoryRouter>
  );

  await screen.findAllByRole("img");

  return {
    container: container,
  };
};

describe("HeroByPublisherPage.tsx", () => {
  describe("General Tests.", () => {
    const mock = new MockAdapter(heroesApi);

    mock.onGet("/api/all.json").reply(200, mockHeroes);

    test("It must render the page title.", async () => {
      await asyncRenderComponent();

      const title = screen.getByRole("heading", {
        name: /select your favorite publisher/i,
      });

      expect(title).toBeInTheDocument();
    });

    test("It must render the select with the publishers.", async () => {
      const { container } = await asyncRenderComponent();

      const select = container.querySelector<HTMLSelectElement>("select");

      expect(select).toBeInTheDocument();
      expect(select).toHaveValue("ALL");
      expect(select?.children).toHaveLength(
        getAllPublishers(mockHeroes).length + 1
      );
    });

    test("It must render the loading when the heroes have not yet been loaded.", async () => {
      const { container } = renderComponent();

      const loader = container.querySelector<HTMLDivElement>(".loader-wrapper");

      expect(loader).toBeInTheDocument();

      await screen.findAllByRole("img");

      expect(loader).not.toBeInTheDocument();
    });

    test("It must render all the heroes.", async () => {
      await asyncRenderComponent();

      const list = screen.getByRole("list");

      expect(list).toBeInTheDocument();
      expect(list.children).toHaveLength(mockHeroes.length);
    });

    test("It should render only the heroes of the selected select.", async () => {
      const publisher = mockHeroeOne.biography.publisher;

      const { container } = await asyncRenderComponent();

      const select = container.querySelector<HTMLSelectElement>("select");
      const list = screen.getByRole("list");

      expect(select).toBeInTheDocument();
      expect(list).toBeInTheDocument();
      expect(list.children).toHaveLength(mockHeroes.length);

      await act(async () => {
        await user.selectOptions(select!, [publisher]);
      });

      await waitFor(() => {
        expect(list.children).toHaveLength(
          getHeroesByPublishers(publisher, mockHeroes).length
        );
      });
    });
  });
});
