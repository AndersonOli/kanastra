import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NoMatch } from "../no-match";

test("renders NoMatch component", () => {
  render(<NoMatch />);
  expect(screen.getByText("Nothing to see here")).toBeInTheDocument();
  expect(screen.getByText("Hands on the work!")).toBeInTheDocument();
});
