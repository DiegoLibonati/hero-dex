import { screen, render } from "@testing-library/react";

import MockAdapter from "axios-mock-adapter";

import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { HeroPage } from "./HeroPage";

import { HeroesProvider } from "../../context/HeroesProvider";

import { mockHeroeTwo, mockHeroes } from "../../../tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const hero = mockHeroeTwo;

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(
    <MemoryRouter
      initialEntries={[`/hero/${hero.id}`]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route
          path="/hero/:heroId"
          element={
            <HeroesProvider>
              <HeroPage />
            </HeroesProvider>
          }
        ></Route>
      </Routes>
    </MemoryRouter>
  );

  await screen.findAllByAltText(hero.name);

  return {
    container: container,
  };
};

describe("HeroPage.tsx", () => {
  describe("General Tests.", () => {
    const mock = new MockAdapter(axios);

    mock.onGet("/superhero-api/api/all.json").reply(200, mockHeroes);

    test("It must render the hero images.", async () => {
      await asyncRenderComponent();

      const imgs = screen.getAllByRole("img");

      for (let img of imgs) {
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("alt", hero.name);
      }
    });

    test("It should render the hero's name and slug.", async () => {
      await asyncRenderComponent();

      const name = screen.getByRole("heading", { name: hero.name });
      const slug = screen.getByText(hero.slug);

      expect(name).toBeInTheDocument();
      expect(slug).toBeInTheDocument();
    });

    test("It should render the hero's powerstats.", async () => {
      await asyncRenderComponent();

      const title = screen.getByText("PowerStats:");
      const intelligence = screen.getByText(
        `Intelligence: ${hero.powerstats.intelligence}`
      );
      const strength = screen.getByText(
        `Strength: ${hero.powerstats.strength}`
      );
      const speed = screen.getByText(`Speed: ${hero.powerstats.speed}`);
      const durability = screen.getByText(
        `Durability: ${hero.powerstats.durability}`
      );
      const power = screen.getByText(`Power: ${hero.powerstats.power}`);
      const combat = screen.getByText(`Combat: ${hero.powerstats.combat}`);

      expect(title).toBeInTheDocument();
      expect(intelligence).toBeInTheDocument();
      expect(strength).toBeInTheDocument();
      expect(speed).toBeInTheDocument();
      expect(durability).toBeInTheDocument();
      expect(power).toBeInTheDocument();
      expect(combat).toBeInTheDocument();
    });

    test("It should render the hero's appearance.", async () => {
      await asyncRenderComponent();

      const title = screen.getByText("Appearance:");
      const gender = screen.getByText(`Gender: ${hero.appearance.gender}`);
      const race = screen.getByText(`Race: ${hero.appearance.race}`);
      const height = screen.getByText(`Height: ${hero.appearance.height[1]}`);
      const weight = screen.getByText(`Weight: ${hero.appearance.weight[1]}`);
      const eyeColor = screen.getByText(
        `Eye color: ${hero.appearance.eyeColor}`
      );
      const hairColor = screen.getByText(
        `Hair color: ${hero.appearance.hairColor}`
      );

      expect(title).toBeInTheDocument();
      expect(gender).toBeInTheDocument();
      expect(race).toBeInTheDocument();
      expect(height).toBeInTheDocument();
      expect(weight).toBeInTheDocument();
      expect(eyeColor).toBeInTheDocument();
      expect(hairColor).toBeInTheDocument();
    });

    test("It should render the hero's biography.", async () => {
      await asyncRenderComponent();

      const title = screen.getByText("Biography:");
      const fullName = screen.getByText(`Fullname: ${hero.biography.fullName}`);
      const alterEgos = screen.getByText(
        `alter egos: ${hero.biography.alterEgos}`
      );
      const placeOfBirth = screen.getByText(
        `place Of Birth: ${hero.biography.placeOfBirth}`
      );
      const firstAppearance = screen.getByText(
        `first Appearance: ${hero.biography.firstAppearance}`
      );
      const publisher = screen.getByText(
        `publisher: ${hero.biography.publisher}`
      );
      const alignment = screen.getByText(
        `alignment: ${hero.biography.alignment}`
      );

      expect(title).toBeInTheDocument();
      expect(fullName).toBeInTheDocument();
      expect(alterEgos).toBeInTheDocument();
      expect(placeOfBirth).toBeInTheDocument();
      expect(firstAppearance).toBeInTheDocument();
      expect(publisher).toBeInTheDocument();
      expect(alignment).toBeInTheDocument();
    });

    test("It should render the hero's works.", async () => {
      await asyncRenderComponent();

      const title = screen.getByText("Works:");
      const occupation = screen.getByText(
        `occupation: ${hero.work.occupation}`
      );
      const base = screen.getByText(`base: ${hero.work.base}`);

      expect(title).toBeInTheDocument();
      expect(occupation).toBeInTheDocument();
      expect(base).toBeInTheDocument();
    });

    test("It should render the hero's connections.", async () => {
      await asyncRenderComponent();

      const title = screen.getByText("Connections:");
      const groupAffiliation = screen.getByText(
        `group Affiliation: ${hero.connections.groupAffiliation}`
      );
      const relatives = screen.getByText(
        `Relatives: ${hero.connections.relatives}`
      );

      expect(title).toBeInTheDocument();
      expect(groupAffiliation).toBeInTheDocument();
      expect(relatives).toBeInTheDocument();
    });

    test("It must render the back button.", async () => {
      await asyncRenderComponent();

      const btnBack = screen.getByRole("button", { name: /back/i });

      expect(btnBack).toBeInTheDocument();
    });
  });
});
