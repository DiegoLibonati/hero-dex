import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import HeroPage from "@/pages/HeroPage/HeroPage";

import { useHeroesContext } from "@/hooks/useHeroesContext";

import heroeService from "@/services/heroeService";

import { mockHeroes, mockHeroeOne } from "@tests/__mocks__/heroes.mock";

interface RenderPage {
  container: HTMLElement;
}

const mockHeroesDispatch = jest.fn();

jest.mock("@/hooks/useHeroesContext");
jest.mock("@/services/heroeService");

const renderPage = (heroId = "1"): RenderPage => {
  (useHeroesContext as jest.Mock).mockReturnValue({
    state: {
      heroes: mockHeroes,
      heroesCopy: mockHeroes,
      publishers: [],
    },
    dispatch: mockHeroesDispatch,
  });
  (heroeService.getAll as jest.Mock).mockResolvedValue(mockHeroes);

  const { container } = render(
    <MemoryRouter initialEntries={[`/hero/${heroId}`]}>
      <Routes>
        <Route path="/hero/:heroId" element={<HeroPage />} />
      </Routes>
    </MemoryRouter>
  );

  return { container };
};

describe("HeroPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the hero name", async () => {
    renderPage("1");
    await waitFor(() => {
      expect(screen.getByText(mockHeroeOne.name)).toBeInTheDocument();
    });
  });

  it("should render the back button", async () => {
    renderPage("1");
    await waitFor(() => {
      expect(heroeService.getAll).toHaveBeenCalledTimes(1);
    });
    expect(screen.getByRole("button", { name: /go back to previous page/i })).toBeInTheDocument();
  });

  it("should call heroeService.getAll on mount", async () => {
    renderPage("1");
    await waitFor(() => {
      expect(heroeService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  it("should render the hero images with the hero name as alt text", async () => {
    renderPage("1");
    await waitFor(() => {
      const images = screen.getAllByAltText(mockHeroeOne.name);
      expect(images.length).toBeGreaterThan(0);
    });
  });
});
