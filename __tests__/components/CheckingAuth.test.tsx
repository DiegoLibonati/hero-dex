import { render, screen } from "@testing-library/react";

import CheckingAuth from "@/components/CheckingAuth/CheckingAuth";

interface RenderComponent {
  container: HTMLElement;
}

const renderComponent = (): RenderComponent => {
  const { container } = render(<CheckingAuth />);
  return { container };
};

describe("CheckingAuth", () => {
  it("should render the checking auth container", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLElement>(".loader-auth-checking")).toBeInTheDocument();
  });

  it("should render the loading gif", () => {
    renderComponent();
    expect(screen.getByAltText("gif loading")).toBeInTheDocument();
  });
});
