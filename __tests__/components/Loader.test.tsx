import { render, screen } from "@testing-library/react";

import Loader from "@/components/Loader/Loader";

describe("Loader", () => {
  it("should render the loader wrapper", () => {
    const { container } = render(<Loader />);
    expect(container.querySelector<HTMLElement>(".loader-wrapper")).toBeInTheDocument();
  });

  it("should render four animated dots inside the ellipsis", () => {
    const { container } = render(<Loader />);
    const ellipsis = container.querySelector<HTMLElement>(".loader-wrapper__lds-ellipsis");
    expect(ellipsis?.children).toHaveLength(4);
  });

  it("should not render any text", () => {
    render(<Loader />);
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });
});
