import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";
import type { HeroListProps } from "@/types/props";

import HeroList from "@/components/HeroList/HeroList";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

const renderComponent = (props: Partial<HeroListProps> = {}): RenderResult => {
  const defaultProps: HeroListProps = {
    heroes: mockHeroes,
    quantity: 2,
    ...props,
  };
  return render(
    <MemoryRouter>
      <HeroList {...defaultProps} />
    </MemoryRouter>
  );
};

describe("HeroList", () => {
  describe("rendering", () => {
    it("should render the initial number of heroes based on quantity", () => {
      renderComponent({ quantity: 2 });
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    it("should render all heroes when quantity exceeds the total count", () => {
      renderComponent({ quantity: 10 });
      expect(screen.getAllByRole("listitem")).toHaveLength(mockHeroes.length);
    });

    it("should render the show more button when heroes exceed the quantity", () => {
      renderComponent({ quantity: 2 });
      expect(screen.getByRole("button", { name: "Load more heroes" })).toBeInTheDocument();
    });

    it("should not render the show more button when all heroes are visible", () => {
      renderComponent({ quantity: 10 });
      expect(screen.queryByRole("button", { name: "Load more heroes" })).not.toBeInTheDocument();
    });

    it("should not render any heroes when heroes array is empty", () => {
      renderComponent({ heroes: [] });
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
  });

  describe("behavior", () => {
    it("should load more heroes when the show more button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent({ quantity: 2 });
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
      await user.click(screen.getByRole("button", { name: "Load more heroes" }));
      expect(screen.getAllByRole("listitem")).toHaveLength(4);
    });

    it("should hide the show more button once all heroes are visible", async () => {
      const user = userEvent.setup();
      renderComponent({ quantity: 2 });
      await user.click(screen.getByRole("button", { name: "Load more heroes" }));
      expect(screen.queryByRole("button", { name: "Load more heroes" })).not.toBeInTheDocument();
    });

    it("should reset the visible heroes when the heroes prop changes", () => {
      const { rerender } = renderComponent({ heroes: mockHeroes, quantity: 2 });
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
      rerender(
        <MemoryRouter>
          <HeroList heroes={[mockHeroes[0]!]} quantity={2} />
        </MemoryRouter>
      );
      expect(screen.getAllByRole("listitem")).toHaveLength(1);
    });
  });
});
