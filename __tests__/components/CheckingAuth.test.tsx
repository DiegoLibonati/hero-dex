import { render, screen } from "@testing-library/react";

import CheckingAuth from "@/components/CheckingAuth/CheckingAuth";

describe("CheckingAuth", () => {
  it("should render the checking auth container", () => {
    const { container } = render(<CheckingAuth />);
    expect(container.querySelector<HTMLElement>(".loader-auth-checking")).toBeInTheDocument();
  });

  it("should render the loading gif", () => {
    render(<CheckingAuth />);
    expect(screen.getByAltText("gif loading")).toBeInTheDocument();
  });
});
