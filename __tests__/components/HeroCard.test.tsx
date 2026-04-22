import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";
import type { HeroCardProps } from "@/types/props";

import HeroCard from "@/components/HeroCard/HeroCard";

import { mockHeroOne } from "@tests/__mocks__/heroes.mock";

const defaultProps: HeroCardProps = {
  id: mockHeroOne.id,
  name: mockHeroOne.name,
  images: { lg: mockHeroOne.images.lg },
  slug: mockHeroOne.slug,
  biography: {
    fullName: mockHeroOne.biography.fullName,
    publisher: mockHeroOne.biography.publisher,
  },
};

const renderComponent = (props: Partial<HeroCardProps> = {}): RenderResult =>
  render(
    <MemoryRouter>
      <HeroCard {...defaultProps} {...props} />
    </MemoryRouter>
  );

describe("HeroCard", () => {
  describe("rendering", () => {
    it("should render the hero name", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: "A-Bomb" })).toBeInTheDocument();
    });

    it("should render the hero slug", () => {
      renderComponent();
      expect(screen.getByText("1-a-bomb")).toBeInTheDocument();
    });

    it("should render the hero publisher", () => {
      renderComponent();
      expect(screen.getByText("Marvel Comics")).toBeInTheDocument();
    });

    it("should render the hero full name", () => {
      renderComponent();
      expect(screen.getByText("Richard Milhouse Jones")).toBeInTheDocument();
    });

    it("should render the hero image with the hero name as alt text", () => {
      renderComponent();
      expect(screen.getByAltText("A-Bomb")).toBeInTheDocument();
    });

    it("should render the learn more link with the correct href", () => {
      renderComponent();
      const link = screen.getByRole("link", { name: "Learn more about A-Bomb" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/hero/1");
    });

    it("should render a different hero name when name prop changes", () => {
      renderComponent({ name: "Superman", slug: "3-superman" });
      expect(screen.getByRole("heading", { name: "Superman" })).toBeInTheDocument();
      expect(screen.getByText("3-superman")).toBeInTheDocument();
    });
  });
});
