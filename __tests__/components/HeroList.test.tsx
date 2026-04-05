import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import type { HeroListProps } from "@/types/props";

import HeroList from "@/components/HeroList/HeroList";

import { mockHeroes } from "@tests/__mocks__/heroes.mock";

interface RenderComponent {
  container: HTMLElement;
  props: HeroListProps;
}

const renderComponent = (overrides?: Partial<HeroListProps>): RenderComponent => {
  const props: HeroListProps = {
    heroes: mockHeroes,
    quantity: 2,
    ...overrides,
  };

  const { container } = render(
    <MemoryRouter>
      <HeroList {...props} />
    </MemoryRouter>
  );

  return { container, props };
};

describe("HeroList", () => {
  it("should render only the initial quantity of heroes", () => {
    renderComponent({ quantity: 2 });
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("should show the 'Load more' button when there are more heroes to display", () => {
    renderComponent({ quantity: 2 });
    expect(screen.getByRole("button", { name: /load more heroes/i })).toBeInTheDocument();
  });

  it("should not show the 'Load more' button when all heroes are already displayed", () => {
    renderComponent({ heroes: mockHeroes, quantity: mockHeroes.length });
    expect(screen.queryByRole("button", { name: /load more heroes/i })).not.toBeInTheDocument();
  });

  it("should display more heroes when the 'Load more' button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent({ quantity: 2 });

    await user.click(screen.getByRole("button", { name: /load more heroes/i }));

    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });
});
