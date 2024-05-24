import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../table-pagination";

describe("Pagination component", () => {
  test("renders Pagination component", () => {
    const handlePageChange = jest.fn();
    const pageCount = 10;
    const currentPage = 2;

    render(
      <Pagination
        pageCount={pageCount}
        page={currentPage}
        onPageChange={handlePageChange}
      />
    );

    expect(screen.getByText("Anterior")).toBeInTheDocument();
    expect(screen.getByText("Próximo")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Próximo"));
    expect(handlePageChange).toHaveBeenCalledWith(4 - 1);
  });

  test("calls handlePageChange with correct page number on 'Anterior' button click", () => {
    const handlePageChange = jest.fn();
    const pageCount = 10;
    const currentPage = 5;

    render(
      <Pagination
        pageCount={pageCount}
        page={currentPage}
        onPageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByText("Anterior"));
    expect(handlePageChange).toHaveBeenCalledWith(4);
  });
});
