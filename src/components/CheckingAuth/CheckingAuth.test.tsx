import { screen, render } from "@testing-library/react";

import { CheckingAuth } from "@src/components/CheckingAuth/CheckingAuth";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<CheckingAuth />);

  return {
    container: container,
  };
};

describe("CheckingAuth.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the auth loader.", () => {
      renderComponent();

      const img = screen.getByRole("img");
      const parentImg = img.parentElement as HTMLDivElement;

      expect(parentImg).toBeInTheDocument();
      expect(parentImg).toHaveClass("loader-auth-checking");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute(
        "src",
        "https://i.pinimg.com/originals/a9/78/09/a97809ed54944ec8bb6e3940cd0bc513.gif"
      );
      expect(img).toHaveAttribute("alt", "gif loading");
    });
  });
});
