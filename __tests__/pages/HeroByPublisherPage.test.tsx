import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import HeroByPublisherPage from "@/pages/HeroByPublisherPage/HeroByPublisherPage";

import { HeroesProvider } from "@/contexts/HeroesContext/HeroesProvider";

import heroService from "@/services/heroService";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

const mockGetAll = heroService.getAll as jest.Mock;

jest.mock("@/services/heroService", () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(),
  },
}));

const renderPage = (initialRoute = "/home"): RenderResult =>
  render(
    <HeroesProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/home" element={<HeroByPublisherPage />} />
        </Routes>
      </MemoryRouter>
    </HeroesProvider>
  );

describe("HeroByPublisherPage", () => {
  beforeEach(() => {
    mockGetAll.mockResolvedValue(mockHeroes);
  });

  describe("rendering", () => {
    it("should render the publisher select with the default All option", async () => {
      renderPage();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "All" })).toBeInTheDocument();
      await waitFor(() => {
        expect(mockGetAll).toHaveBeenCalled();
      });
    });

    it("should render the publisher options after heroes load", async () => {
      renderPage();
      await waitFor(() => {
        expect(screen.getByRole("option", { name: "Marvel Comics" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Dark Horse Comics" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "DC Comics" })).toBeInTheDocument();
      });
    });

    it("should render hero cards after heroes load", async () => {
      renderPage();
      expect(await screen.findByText("A-Bomb")).toBeInTheDocument();
      expect(await screen.findByText("Abe Sapien")).toBeInTheDocument();
    });

    it("should reflect the query param publisher in the select value", async () => {
      renderPage("/home?q=Marvel%20Comics");
      await waitFor(() => {
        expect(screen.getByRole("combobox")).toHaveValue("Marvel Comics");
      });
    });
  });

  describe("behavior", () => {
    it("should navigate to the selected publisher when the select changes", async () => {
      const user = userEvent.setup();
      renderPage();
      await waitFor(() => {
        expect(screen.getByRole("option", { name: "Marvel Comics" })).toBeInTheDocument();
      });
      await user.selectOptions(screen.getByRole("combobox"), "Marvel Comics");
      await waitFor(() => {
        expect(screen.getByRole("combobox")).toHaveValue("Marvel Comics");
      });
    });

    it("should filter heroes by the publisher in the URL query", async () => {
      renderPage("/home?q=Marvel%20Comics");
      await waitFor(() => {
        expect(screen.getByText("A-Bomb")).toBeInTheDocument();
        expect(screen.queryByText("Abe Sapien")).not.toBeInTheDocument();
      });
    });
  });
});
