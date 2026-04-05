import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import HeroByPublisherPage from "@/pages/HeroByPublisherPage/HeroByPublisherPage";

import { useHeroesContext } from "@/hooks/useHeroesContext";

import heroeService from "@/services/heroeService";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

type RenderPage = { container: HTMLElement };

const mockHeroesDispatch = jest.fn();

jest.mock("@/hooks/useHeroesContext");
jest.mock("@/services/heroeService");

const renderPage = (query = ""): RenderPage => {
  (useHeroesContext as jest.Mock).mockReturnValue({
    state: {
      heroes: mockHeroes,
      heroesCopy: mockHeroes,
      publishers: ["Marvel Comics", "Dark Horse Comics", "DC Comics"],
    },
    dispatch: mockHeroesDispatch,
  });
  (heroeService.getAll as jest.Mock).mockResolvedValue(mockHeroes);

  const { container } = render(
    <MemoryRouter initialEntries={[`/home${query ? `?q=${query}` : ""}`]}>
      <HeroByPublisherPage />
    </MemoryRouter>
  );

  return { container };
};

describe("HeroByPublisherPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the publisher select", async () => {
    renderPage();
    await waitFor(() => expect(heroeService.getAll).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should render publisher options populated from context state", async () => {
    renderPage();
    await waitFor(() => expect(heroeService.getAll).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("option", { name: "Marvel Comics" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "DC Comics" })).toBeInTheDocument();
  });

  it("should call heroeService.getAll on mount", async () => {
    renderPage();
    await waitFor(() => {
      expect(heroeService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  it("should dispatch SET_HEROES and SET_PUBLISHER after fetching", async () => {
    renderPage();
    await waitFor(() => {
      expect(mockHeroesDispatch).toHaveBeenCalledWith({
        type: "SET_HEROES",
        payload: mockHeroes,
      });
      expect(mockHeroesDispatch).toHaveBeenCalledWith({
        type: "SET_PUBLISHER",
        payload: "",
      });
    });
  });

  it("should dispatch SET_PUBLISHER with the query value when a query is in the URL", async () => {
    renderPage("Marvel%20Comics");
    await waitFor(() => {
      expect(mockHeroesDispatch).toHaveBeenCalledWith({
        type: "SET_PUBLISHER",
        payload: "Marvel Comics",
      });
    });
  });
});
