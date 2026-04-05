import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { Hero } from "@/types/app";

import SearchPage from "@/pages/SearchPage/SearchPage";

import { useHeroesContext } from "@/hooks/useHeroesContext";

import heroeService from "@/services/heroeService";

import { mockHeroes, mockHeroeOne } from "@tests/__mocks__/heroes.mock";

type RenderPage = { container: HTMLElement };

const mockHeroesDispatch = jest.fn();

jest.mock("@/hooks/useHeroesContext");
jest.mock("@/services/heroeService");

const renderPage = (query = "", heroes: Hero[] = []): RenderPage => {
  (useHeroesContext as jest.Mock).mockReturnValue({
    state: {
      heroes,
      heroesCopy: mockHeroes,
      publishers: [],
    },
    dispatch: mockHeroesDispatch,
  });
  (heroeService.getAll as jest.Mock).mockResolvedValue(mockHeroes);

  const { container } = render(
    <MemoryRouter initialEntries={[`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`]}>
      <SearchPage />
    </MemoryRouter>
  );

  return { container };
};

describe("SearchPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the search input and button", () => {
    renderPage();
    expect(screen.getByPlaceholderText(/search a hero/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search for a hero/i })).toBeInTheDocument();
  });

  it("should show the initial 'Search a hero' label when query is empty", () => {
    const { container } = renderPage();
    const label = container.querySelector<HTMLElement>(".search-page__search-label");
    expect(label).toBeInTheDocument();
    expect(label).not.toHaveStyle({ display: "none" });
  });

  it("should hide the initial label when a query is present", () => {
    const { container } = renderPage("A-Bomb", [mockHeroeOne]);
    const label = container.querySelector<HTMLElement>(".search-page__search-label");
    expect(label).toHaveStyle({ display: "none" });
  });

  it("should show 'No hero with' message when the query has no results", async () => {
    renderPage("nonexistent", []);
    await waitFor(() => {
      expect(screen.getByText(/no hero with/i)).toBeInTheDocument();
    });
  });

  it("should display hero cards when the query matches results", async () => {
    renderPage("A-Bomb", [mockHeroeOne]);
    await waitFor(() => {
      expect(screen.getByText(mockHeroeOne.name)).toBeInTheDocument();
    });
  });

  it("should navigate with query param when the search form is submitted", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByPlaceholderText(/search a hero/i), "Batman");
    await user.click(screen.getByRole("button", { name: /search for a hero/i }));

    await waitFor(() => {
      expect(mockHeroesDispatch).toHaveBeenCalledWith({
        type: "SET_HEROES_BY_NAME",
        payload: "Batman",
      });
    });
  });
});
