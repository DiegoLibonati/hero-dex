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

describe("Loader.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the loader.", () => {
      const { container } = renderComponent();

      const loaderRoot = container.querySelector(
        ".loader-wrapper"
      ) as HTMLDivElement;
      const loader = loaderRoot?.querySelector(
        ".loader-wrapper__lds-ellipsis"
      ) as HTMLDivElement;

      expect(loaderRoot).toBeInTheDocument();
      expect(loader).toBeInTheDocument();
      expect(loader?.children).toHaveLength(4);
    });
  });
});
