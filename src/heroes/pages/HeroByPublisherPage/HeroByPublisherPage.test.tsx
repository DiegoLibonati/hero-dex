import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";

import axios from "axios";
import { MemoryRouter } from "react-router-dom";

import { HeroByPublisherPage } from "./HeroByPublisherPage";

import { getHeroesByPublishers } from "../../helpers/getHeroesByPublishers";
import { getAllPublishers } from "../../helpers/getAllPublishers";
import { HeroesProvider } from "../../context/HeroesProvider";

import { HEROE_ONE_MOCK, HEROES_MOCK } from "../../../tests/jest.setup";

type RenderComponent = {
  container: HTMLElement;
};

const mock = new MockAdapter(axios);

mock.onGet("/superhero-api/api/all.json").reply(200, HEROES_MOCK);

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

test("It must render the page title.", async () => {
  await asyncRenderComponent();

  const title = screen.getByRole("heading", {
    name: /select your favorite publisher/i,
  });

  expect(title).toBeInTheDocument();
});

test("It must render the select with the publishers.", async () => {
  const { container } = await asyncRenderComponent();

  const select = container.querySelector("select") as HTMLSelectElement;

  expect(select).toBeInTheDocument();
  expect(select).toHaveValue("ALL");
  // NOTE: plus one for all option.
  expect(select?.children).toHaveLength(
    getAllPublishers(HEROES_MOCK).length + 1
  );
});

test("It must render the loading when the heroes have not yet been loaded.", async () => {
  const { container } = renderComponent();

  const loader = container.querySelector(".loader_wrapper") as HTMLDivElement;

  expect(loader).toBeInTheDocument();

  await screen.findAllByRole("img");

  expect(loader).not.toBeInTheDocument();
});

test("It must render all the heroes.", async () => {
  await asyncRenderComponent();

  const list = screen.getByRole("list");

  expect(list).toBeInTheDocument();
  expect(list.children).toHaveLength(HEROES_MOCK.length);
});

test("It should render only the heroes of the selected select.", async () => {
  const publisher = HEROE_ONE_MOCK.biography.publisher;

  const { container } = await asyncRenderComponent();

  const select = container.querySelector("select") as HTMLSelectElement;
  const list = screen.getByRole("list");

  expect(select).toBeInTheDocument();
  expect(list).toBeInTheDocument();
  expect(list.children).toHaveLength(HEROES_MOCK.length);

  await user.selectOptions(select, [publisher]);

  expect(list.children).toHaveLength(
    getHeroesByPublishers(publisher, HEROES_MOCK).length
  );
});
