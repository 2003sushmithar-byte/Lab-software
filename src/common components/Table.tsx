import React from "react";

interface TableProps<T> {
  columns: string[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  maxHeight?: string;
  emptyMessage?: string;
}

const Table = <T,>({
  columns,
  data,
  renderRow,
  maxHeight = "500px",
  emptyMessage = "No records found",
}: TableProps<T>) => {
  return (
    <div className="w-full overflow-hidden rounded-xl">
      <div
        className="w-full overflow-x-auto overflow-y-auto"
        style={{ maxHeight }}
      >
        <table className="w-full min-w-max border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-700">
            <tr className="border-b border-slate-600">
              {columns.map((column, index) => (
                <th
                  key={`${column}-${index}`}
                  className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-white"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="transition-colors hover:bg-slate-200"
                >
                  {renderRow(item, index)}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;