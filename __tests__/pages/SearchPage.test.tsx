import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import SearchPage from "@/pages/SearchPage/SearchPage";

import { HeroesProvider } from "@/contexts/HeroesContext/HeroesProvider";

import heroService from "@/services/heroService";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

const mockGetAll = jest.mocked(heroService.getAll);

jest.mock("@/services/heroService", () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(),
  },
}));

const renderPage = (initialRoute = "/search"): RenderResult =>
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <HeroesProvider>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </HeroesProvider>
    </MemoryRouter>
  );

describe("SearchPage", () => {
  beforeEach(() => {
    mockGetAll.mockResolvedValue(mockHeroes);
  });

  describe("rendering", () => {
    it("should render the search input", async () => {
      renderPage();
      expect(screen.getByPlaceholderText("Search a hero")).toBeInTheDocument();
      await waitFor(() => {
        expect(mockGetAll).toHaveBeenCalled();
      });
    });

    it("should render the search button", async () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Search for a hero" })).toBeInTheDocument();
      await waitFor(() => {
        expect(mockGetAll).toHaveBeenCalled();
      });
    });

    it("should render the page title", async () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: "Search your favorite HERO" })
      ).toBeInTheDocument();
      await waitFor(() => {
        expect(mockGetAll).toHaveBeenCalled();
      });
    });

    it("should show the default search label when there is no query", async () => {
      renderPage("/search");
      expect(screen.getByText("Search a hero")).toBeInTheDocument();
      await waitFor(() => {
        expect(mockGetAll).toHaveBeenCalled();
      });
    });

    it("should hide the default label and show hero results when query matches heroes", async () => {
      renderPage("/search?q=A-Bomb");
      await waitFor(() => {
        expect(screen.getByText("A-Bomb")).toBeInTheDocument();
      });
    });

    it("should show the not-found message when the query has no results", async () => {
      renderPage("/search?q=nonexistenthero");
      await waitFor(() => {
        expect(screen.getByText(/nonexistenthero/)).toBeInTheDocument();
      });
    });
  });

  describe("behavior", () => {
    it("should show results matching the search term after form submission", async () => {
      const user = userEvent.setup();
      renderPage();
      await waitFor(() => {
        expect(mockGetAll).toHaveBeenCalled();
      });
      const input = screen.getByPlaceholderText("Search a hero");
      await user.type(input, "Abin");
      await user.click(screen.getByRole("button", { name: "Search for a hero" }));
      await waitFor(() => {
        expect(screen.getByText("Abin Sur")).toBeInTheDocument();
      });
    });

    it("should show the not-found message when the search yields no results", async () => {
      const user = userEvent.setup();
      renderPage();
      await waitFor(() => {
        expect(mockGetAll).toHaveBeenCalled();
      });
      const input = screen.getByPlaceholderText("Search a hero");
      await user.type(input, "zzzunknown");
      await user.click(screen.getByRole("button", { name: "Search for a hero" }));
      await waitFor(() => {
        expect(screen.getByText(/zzzunknown/)).toBeInTheDocument();
      });
    });

    it("should pre-fill the search input with the URL query value", async () => {
      renderPage("/search?q=Batman");
      expect(screen.getByPlaceholderText("Search a hero")).toHaveValue("Batman");
      await waitFor(() => {
        expect(mockGetAll).toHaveBeenCalled();
      });
    });
  });
});
