import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import HeroPage from "@/pages/HeroPage/HeroPage";

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

const renderPage = (heroId = "1"): RenderResult =>
  render(
    <MemoryRouter initialEntries={[`/hero/${heroId}`]}>
      <HeroesProvider>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroPage />} />
          <Route path="/home" element={<div>Home Page</div>} />
        </Routes>
      </HeroesProvider>
    </MemoryRouter>
  );

describe("HeroPage", () => {
  beforeEach(() => {
    mockGetAll.mockResolvedValue(mockHeroes);
  });

  describe("rendering", () => {
    it("should render the hero name after loading", async () => {
      renderPage("1");
      expect(await screen.findByText("A-Bomb")).toBeInTheDocument();
    });

    it("should render the hero image with the correct alt text", async () => {
      renderPage("1");
      await waitFor(() => {
        const images = screen.getAllByAltText("A-Bomb");
        expect(images.length).toBeGreaterThan(0);
      });
    });

    it("should render the hero powerstats section", async () => {
      renderPage("1");
      await screen.findByText("A-Bomb");
      expect(screen.getByText(/Intelligence:/)).toBeInTheDocument();
      expect(screen.getByText(/Strength:/)).toBeInTheDocument();
    });

    it("should render the hero biography section", async () => {
      renderPage("1");
      await screen.findByText("A-Bomb");
      expect(screen.getByText(/Richard Milhouse Jones/)).toBeInTheDocument();
    });

    it("should render the back button", async () => {
      renderPage("1");
      await screen.findByText("A-Bomb");
      expect(screen.getByRole("button", { name: "Go back to previous page" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should navigate to /home when the hero is not found", async () => {
      renderPage("9999");
      await waitFor(() => {
        expect(screen.getByText("Home Page")).toBeInTheDocument();
      });
    });

    it("should call navigate(-1) when the back button is clicked", async () => {
      const user = userEvent.setup();
      renderPage("1");
      await screen.findByText("A-Bomb");
      await user.click(screen.getByRole("button", { name: "Go back to previous page" }));
    });
  });
});
