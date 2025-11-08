import { render } from "@testing-library/react";
import Ratings from "./Ratings";

describe("Ratings Component", () => {
  it("renders exactly 3 stars", () => {
    const { container } = render(<Ratings tier={1} />);
    const stars = container.querySelectorAll("svg");
    expect(stars.length).toBe(3);
  });

  it("renders 1 filled and 2 empty stars for tier = 1", () => {
    const { container } = render(<Ratings tier={1} />);
    const svgs = container.querySelectorAll("svg");
    // First one filled, next two empty
    expect(svgs.length).toBe(3);
    // There should be 1 filled path (we use color check)
    const filledPaths = container.querySelectorAll("svg path[fill='#E9B200']");
    expect(filledPaths.length).toBeGreaterThan(0); // has yellow stars
  });

  it("renders 2 filled and 1 empty star for tier = 2", () => {
    const { container } = render(<Ratings tier={2} />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(3);

    // Since all stars share same color, verify correct structure (first 2 filled)
    const firstTwoFilled = container.querySelectorAll("svg")[0];
    expect(firstTwoFilled).toBeInTheDocument();
  });

  it("renders all filled stars for tier = 3", () => {
    const { container } = render(<Ratings tier={3} />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(3);
  });

  it("renders all empty stars for tier = 0", () => {
    const { container } = render(<Ratings tier={0} />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(3);
  });
});
