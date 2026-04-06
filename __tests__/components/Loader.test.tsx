import { render, screen } from "@testing-library/react";

import Loader from "@/components/Loader/Loader";

interface RenderComponent {
  container: HTMLElement;
}

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loader />);
  return { container };
};

describe("Loader", () => {
  it("should render the loader wrapper", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLElement>(".loader-wrapper")).toBeInTheDocument();
  });

  it("should render four animated dots inside the ellipsis", () => {
    const { container } = renderComponent();
    const ellipsis = container.querySelector<HTMLElement>(".loader-wrapper__lds-ellipsis");
    expect(ellipsis?.children).toHaveLength(4);
  });

  it("should not render any text", () => {
    renderComponent();
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });
});
