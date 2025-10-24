import { render } from "@testing-library/react";

import { Loader } from "@src/components/Loader/Loader";

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

      const loaderRoot =
        container.querySelector<HTMLDivElement>(".loader-wrapper");
      const loader = loaderRoot?.querySelector<HTMLDivElement>(
        ".loader-wrapper__lds-ellipsis"
      );

      expect(loaderRoot).toBeInTheDocument();
      expect(loader).toBeInTheDocument();
      expect(loader?.children).toHaveLength(4);
    });
  });
});
