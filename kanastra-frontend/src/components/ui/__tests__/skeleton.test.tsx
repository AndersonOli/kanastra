import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSkeleton from "../skeleton";

describe("LoadingSkeleton component", () => {
  test("renders correctly with given number of rows when show is true", () => {
    const rows = 5;
    const { container } = render(<LoadingSkeleton rows={rows} show={true} />);
    const skeletonRows = container.querySelectorAll("div[role='status'] > div");
    expect(skeletonRows).toHaveLength(rows);
  });

  test("renders nothing when show is false", () => {
    const { container } = render(<LoadingSkeleton rows={5} show={false} />);
    expect(container.firstChild).toBeNull();
  });

  test("applies correct styles to skeleton rows", () => {
    const rows = 3;
    const { container } = render(<LoadingSkeleton rows={rows} show={true} />);
    const skeletonRows = container.querySelectorAll("div[role='status'] > div");

    skeletonRows.forEach((row, index) => {
      expect(row).toHaveClass(
        "h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"
      );
      if (index < rows - 1) {
        expect(row).toHaveStyle("margin-bottom: 10px");
      } else {
        expect(row).toHaveStyle("margin-bottom: 0");
      }
    });
  });

  test("has aria role status and sr-only text for accessibility", () => {
    const { getByRole, getByText } = render(
      <LoadingSkeleton rows={3} show={true} />
    );
    expect(getByRole("status")).toBeInTheDocument();
    expect(getByText("Loading...")).toHaveClass("sr-only");
  });
});
