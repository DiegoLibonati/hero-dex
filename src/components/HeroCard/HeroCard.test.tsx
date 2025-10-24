import { screen, render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import { HeroCardProps } from "@src/entities/props";

import { HeroCard } from "@src/components/HeroCard/HeroCard";

type RenderComponent = {
  props: HeroCardProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    id: 123,
    name: "name",
    images: {
      lg: "lg image",
    },
    slug: "slug",
    biography: {
      fullName: "fullName",
      publisher: "publisher",
    },
  };

  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <HeroCard
        id={props.id}
        biography={props.biography}
        images={props.images}
        name={props.name}
        slug={props.slug}
      />
    </MemoryRouter>
  );

  return {
    props: props,
    container: container,
  };
};

describe("HeroCard.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the image, the name, the slug, the publisher, the full name and the link to know more about the hero.", () => {
      const { props } = renderComponent();

      const card = screen.getByRole("listitem");
      const img = screen.getByRole("img");
      const name = screen.getByRole("heading", { name: props.name });
      const slug = screen.getByRole("heading", { name: props.slug });
      const publisher = screen.getByRole("heading", {
        name: props.biography.publisher,
      });
      const fullName = screen.getByRole("heading", {
        name: props.biography.fullName,
      });
      const linkLearnMore = screen.getByRole("link", { name: /learn more/i });

      expect(card).toBeInTheDocument();
      expect(card).toHaveClass("hero-card animate__animated animate__fadeIn");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", props.images.lg);
      expect(img).toHaveAttribute("alt", props.name);
      expect(name).toBeInTheDocument();
      expect(slug).toBeInTheDocument();
      expect(publisher).toBeInTheDocument();
      expect(fullName).toBeInTheDocument();
      expect(linkLearnMore).toBeInTheDocument();
    });
  });
});
