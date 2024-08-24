"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import {
  addAlphaToHex,
  cssVarHSLToHexWithOpacity,
} from "@/utils/helpers/add-alpha-to-hex";
import ActionContext from "@/app/(dashboard)/context/ActionContext";

interface MeasureOfSuccessType {
  data: any[];
  columns: ColumnDef<any>[];
  isPresentationView?: boolean;
}

const MeasureOfSuccessTable: React.FC<MeasureOfSuccessType> = ({
  data,
  columns,
  isPresentationView = false,
}) => {
  const { primaryColorHexValue } = React.useContext(ActionContext);
  const colorWithAlpha = primaryColorHexValue
    ? addAlphaToHex(primaryColorHexValue, 0.05)
    : "";

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (!Array.isArray(columns)) {
    console.error("Columns prop must be an array", columns);
    return <div>Error: Columns prop must be an array</div>;
  }
  return (
    <div className="w-full ">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              style={
                isPresentationView ? { backgroundColor: colorWithAlpha } : {}
              }
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={`${
                    isPresentationView
                      ? "text-[var(--primary-color)]"
                      : "text-custom-dark-blue"
                  } font-600 text-xs bg-transparent`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-transparent border-none">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={clsx(
                  "transition-all duration-300 border-none",
                  isPresentationView &&
                    (index % 2 === 0 ? "bg-[#F4F4F4]" : "bg-white")
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="font-normal text-xs text-left"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MeasureOfSuccessTable;
