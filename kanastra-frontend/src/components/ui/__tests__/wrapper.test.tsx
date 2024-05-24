import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Wrapper from "../wrapper";

test("renders Wrapper component with children", () => {
  render(
    <Wrapper>
      <div>Test Child</div>
    </Wrapper>
  );
  expect(screen.getByText("Test Child")).toBeInTheDocument();
  const container = screen.getByText("Test Child").parentElement;
  expect(container).toHaveClass("container p-10");
});
