import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DisplayTable = ({ data, column, loading }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 7;

  const pageCount = Math.ceil(data.length / pageSize);

  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  const pagedRows = table.getRowModel().rows.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  const goToPage = (index) => {
    if (index >= 0 && index < pageCount) {
      setPageIndex(index);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">
          Total Sub Categories: {data.length}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => goToPage(pageIndex - 1)}
            disabled={pageIndex === 0}
            className={`px-3 py-1 rounded ${pageIndex === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            Prev
          </button>
          <span className="self-center">
            Page {pageIndex + 1} of {pageCount}
          </span>
          <button
            onClick={() => goToPage(pageIndex + 1)}
            disabled={pageIndex >= pageCount - 1}
            className={`px-3 py-1 rounded ${pageIndex >= pageCount - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            Next
          </button>
        </div>
      </div>

      <table className="min-w-[600px] w-full border-collapse shadow rounded">
        <thead className="bg-gray-800 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="border px-3 py-2 text-left">#</th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border px-3 py-2 text-left whitespace-nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={table.getAllColumns().length + 1}
                className="text-center p-4"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={table.getAllColumns().length + 1}
                className="text-center p-4"
              >
                No data available
              </td>
            </tr>
          ) : (
            <>
              {pagedRows.map((row, idx) => (
                <tr
                  key={row.id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  <td className="border px-3 py-2">
                    {pageIndex * pageSize + idx + 1}
                  </td>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border px-3 py-2 whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {/* Empty rows for consistent height */}
              {Array.from({
                length: pageSize - pagedRows.length,
              }).map((_, idx) => (
                <tr
                  key={`empty-${idx}`}
                  className="even:bg-gray-50"
                >
                  <td
                    className="border px-3 py-2"
                    colSpan={table.getAllColumns().length + 1}
                  >
                    &nbsp;
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
