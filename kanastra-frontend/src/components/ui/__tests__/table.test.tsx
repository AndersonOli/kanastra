import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../table";

describe("Table components", () => {
  test("renders Table correctly", () => {
    const { container } = render(<Table className="test-class" />);
    expect(container.querySelector("table")).toHaveClass("test-class");
  });

  test("renders TableHeader correctly", () => {
    const { container } = render(<TableHeader className="test-class" />);
    expect(container.querySelector("thead")).toHaveClass("test-class");
  });

  test("renders TableBody correctly", () => {
    const { container } = render(<TableBody className="test-class" />);
    expect(container.querySelector("tbody")).toHaveClass("test-class");
  });

  test("renders TableFooter correctly", () => {
    const { container } = render(<TableFooter className="test-class" />);
    expect(container.querySelector("tfoot")).toHaveClass("test-class");
  });

  test("renders TableRow correctly", () => {
    const { container } = render(<TableRow className="test-class" />);
    expect(container.querySelector("tr")).toHaveClass("test-class");
  });

  test("renders TableHead correctly", () => {
    const { container } = render(<TableHead className="test-class" />);
    expect(container.querySelector("th")).toHaveClass("test-class");
  });

  test("renders TableCell correctly", () => {
    const { container } = render(<TableCell className="test-class" />);
    expect(container.querySelector("td")).toHaveClass("test-class");
  });

  test("renders TableCaption correctly", () => {
    const { container } = render(<TableCaption className="test-class" />);
    expect(container.querySelector("caption")).toHaveClass("test-class");
  });
});
