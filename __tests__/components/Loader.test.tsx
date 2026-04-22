import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import Loader from "@/components/Loader/Loader";

const renderComponent = (): RenderResult => render(<Loader />);

describe("Loader", () => {
  describe("rendering", () => {
    it("should render the loader wrapper", () => {
      const { container } = renderComponent();
      expect(container.querySelector(".loader-wrapper")).toBeInTheDocument();
    });

    it("should render the ellipsis animation element", () => {
      const { container } = renderComponent();
      expect(container.querySelector(".loader-wrapper__lds-ellipsis")).toBeInTheDocument();
    });
  });
});
