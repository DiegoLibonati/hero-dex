import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import CheckingAuth from "@/components/CheckingAuth/CheckingAuth";

const renderComponent = (): RenderResult => render(<CheckingAuth />);

describe("CheckingAuth", () => {
  describe("rendering", () => {
    it("should render a loading gif image", () => {
      renderComponent();
      expect(screen.getByAltText("gif loading")).toBeInTheDocument();
    });

    it("should render the image with the correct src", () => {
      renderComponent();
      const img = screen.getByAltText("gif loading");
      expect(img).toHaveAttribute(
        "src",
        "https://i.pinimg.com/originals/a9/78/09/a97809ed54944ec8bb6e3940cd0bc513.gif"
      );
    });
  });
});
