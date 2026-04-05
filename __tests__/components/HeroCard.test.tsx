import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { HeroCardProps } from "@/types/props";

import HeroCard from "@/components/HeroCard/HeroCard";

import { mockHeroeOne } from "@tests/__mocks__/heroes.mock";

interface RenderComponent {
  container: HTMLElement;
  props: HeroCardProps;
}

const renderComponent = (overrides?: Partial<HeroCardProps>): RenderComponent => {
  const props: HeroCardProps = {
    id: mockHeroeOne.id,
    name: mockHeroeOne.name,
    images: { lg: mockHeroeOne.images.lg },
    slug: mockHeroeOne.slug,
    biography: {
      fullName: mockHeroeOne.biography.fullName,
      publisher: mockHeroeOne.biography.publisher,
    },
    ...overrides,
  };

  const { container } = render(
    <MemoryRouter>
      <HeroCard {...props} />
    </MemoryRouter>
  );

  return { container, props };
};

describe("HeroCard", () => {
  it("should render the hero name", () => {
    renderComponent();
    expect(screen.getByText("A-Bomb")).toBeInTheDocument();
  });

  it("should render the hero publisher", () => {
    renderComponent();
    expect(screen.getByText("Marvel Comics")).toBeInTheDocument();
  });

  it("should render the hero image with the hero name as alt text", () => {
    renderComponent();
    expect(screen.getByAltText("A-Bomb")).toBeInTheDocument();
  });

  it("should render a 'Learn more' link with the correct href and aria-label", () => {
    renderComponent();
    const link = screen.getByRole("link", { name: /learn more about a-bomb/i });
    expect(link).toHaveAttribute("href", `/hero/${mockHeroeOne.id}`);
  });
});
