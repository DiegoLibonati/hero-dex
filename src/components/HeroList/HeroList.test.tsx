import { screen, render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import { HeroListProps } from "@src/entities/props";

import { HeroList } from "@src/components/HeroList/HeroList";

import { mockHeroes } from "@tests/jest.constants";

type RenderComponent = {
  props: HeroListProps;
  container: HTMLElement;
};

const renderComponent = (quantity: number): RenderComponent => {
  const props = {
    heroes: mockHeroes,
    quantity: quantity,
  };

  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <HeroList heroes={props.heroes} quantity={props.quantity} />
    </MemoryRouter>
  );

  return {
    props: props,
    container: container,
  };
};

describe("HeroList.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the hero list with all the heroes.", () => {
      const { props } = renderComponent(mockHeroes.length);

      const list = screen.getByRole("list");

      expect(list).toBeInTheDocument();
      expect(list.children).toHaveLength(props.heroes.length);
    });

    test("It must render the see more button.", () => {
      renderComponent(1);

      const btnShowMore = screen.getByRole("button", {
        name: /show more heroes/i,
      });

      expect(btnShowMore).toBeInTheDocument();
    });

    test("It should not render the see more button.", () => {
      renderComponent(mockHeroes.length);

      const btnShowMore = screen.queryByRole("button", {
        name: /show more heroes/i,
      });

      expect(btnShowMore).not.toBeInTheDocument();
    });
  });
});
