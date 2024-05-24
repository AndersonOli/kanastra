import React from "react";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  pageCount?: number;
  page: number;
  onPageChange: (selected: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ pageCount = 0, onPageChange, page }) => {
  return (
    <div className="flex justify-center mt-4">
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Próximo"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        forcePage={page}
        onPageChange={({ selected }) => onPageChange(selected)}
        containerClassName={"flex list-none p-0"}
        pageClassName={"mx-1"}
        pageLinkClassName={
          "px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
        }
        previousClassName={"mx-1"}
        previousLinkClassName={
          "px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
        }
        nextClassName={"mx-1"}
        nextLinkClassName={
          "px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
        }
        breakClassName={"mx-1"}
        breakLinkClassName={
          "px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
        }
        activeClassName={"bg-blue-500 text-white"}
        disabledClassName={"text-gray-400 cursor-not-allowed"}
      />
    </div>
  );
};

export default Pagination;
