import { render } from "@testing-library/react";

import { Loader } from "./Loader";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loader />);

  return {
    container: container,
  };
};

test("It must render the loader.", () => {
  const { container } = renderComponent();

  const loaderRoot = container.querySelector(
    ".loader_wrapper"
  ) as HTMLDivElement;
  const loader = loaderRoot?.querySelector(".lds-ellipsis") as HTMLDivElement;

  expect(loaderRoot).toBeInTheDocument();
  expect(loader).toBeInTheDocument();
  expect(loader?.children).toHaveLength(4);
});
