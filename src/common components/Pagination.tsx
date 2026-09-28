import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface PaginationProps {
  totalItems: number;
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages =
    totalItems === 0
      ? 1
      : rowsPerPage >= totalItems
        ? 1
        : Math.ceil(totalItems / rowsPerPage);

  const startIndex =
    totalItems === 0
      ? 0
      : (currentPage - 1) * rowsPerPage + 1;

  const endIndex =
    totalItems === 0
      ? 0
      : Math.min(currentPage * rowsPerPage, totalItems);

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-end px-4 py-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm text-slate-500">
            Rows per page:
          </span>

          <select
            value={rowsPerPage >= totalItems ? "all" : rowsPerPage}
            onChange={(event) => {
              const value =
                event.target.value === "all"
                  ? totalItems
                  : Number(event.target.value);

              setRowsPerPage(value);
              setCurrentPage(1);
            }}
            className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-600 outline-none transition focus:border-blue-500"
            aria-label="Rows per page"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value="all">All</option>
          </select>
        </div>

        {/* Item count */}
        <span className="whitespace-nowrap text-sm text-slate-500">
          {startIndex}-{endIndex} of {totalItems}
        </span>

        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <KeyboardArrowLeftIcon fontSize="small" />
        </button>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <KeyboardArrowRightIcon fontSize="small" />
        </button>

      </div>
    </div>
  );
};

export default Pagination;