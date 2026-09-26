import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Page information */}
      <p className="text-sm text-slate-500">
        Page{" "}
        <span className="font-semibold text-slate-700">{currentPage}</span>{" "}
        of{" "}
        <span className="font-semibold text-slate-700">{totalPages}</span>
      </p>

      {/* Pagination buttons */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${currentPage === 1
              ? "cursor-not-allowed border-slate-200 text-slate-300"
              : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            }`}
          aria-label="Previous page"
        >
          <ChevronLeftIcon fontSize="small" />
        </button>

        {/* Pages */}
        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-9 items-center justify-center text-sm text-slate-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page as number)}
              className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition ${currentPage === page
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${currentPage === totalPages
              ? "cursor-not-allowed border-slate-200 text-slate-300"
              : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            }`}
          aria-label="Next page"
        >
          <ChevronRightIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;