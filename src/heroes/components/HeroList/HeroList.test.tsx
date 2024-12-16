import { screen, render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import { Hero } from "../../../entities/entities";

import { HeroList } from "./HeroList";

import { HEROES_MOCK } from "../../../tests/jest.setup";

type RenderComponent = {
  props: {
    heroes: Hero[];
    quantity: number;
  };
  container: HTMLElement;
};

const renderComponent = (quantity: number): RenderComponent => {
  const props = {
    heroes: HEROES_MOCK,
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

test("It must render the hero list with all the heroes.", () => {
  const { props } = renderComponent(HEROES_MOCK.length);

  const list = screen.getByRole("list");

  expect(list).toBeInTheDocument();
  expect(list.children).toHaveLength(props.heroes.length);
});

test("It must render the see more button.", () => {
  renderComponent(1);

  const btnShowMore = screen.getByRole("button", { name: /show more heroes/i });

  expect(btnShowMore).toBeInTheDocument();
});

test("It should not render the see more button.", () => {
  renderComponent(HEROES_MOCK.length);

  const btnShowMore = screen.queryByRole("button", {
    name: /show more heroes/i,
  });

  expect(btnShowMore).not.toBeInTheDocument();
});
