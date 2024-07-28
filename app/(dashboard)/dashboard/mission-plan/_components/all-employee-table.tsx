"use client";

import * as React from "react";
import {
  //   CaretSortIcon,
  ChevronDownIcon,
  //   DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  //   ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  //   DropdownMenuItem,
  //   DropdownMenuLabel,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExportIcon,
  FilterIcon,
  SearchIcon,
  SortIcon,
} from "@/public/assets/icons";

type AllEmployeeTableType = {
  data: any;
  columns: any;
};

const AllEmployeeTable = ({ data, columns }: AllEmployeeTableType) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const filterDrop = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto border h-[33px] rounded-[6px] focus:border-primary focus:border-0 hover:bg-white"
        >
          <div className="flex gap-3 items-center">
            <Image src={FilterIcon} alt="filter" />
            <p className="text-custom-gray-scale-400 font-normal text-xs">
              Filter by
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {["approved", "in review", "rejected"]?.map((col: string) => {
          return (
            <DropdownMenuCheckboxItem
              key={col}
              className="capitalize text-custom-dark-blue font-light text-xs"
            >
              {col}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const sortBy = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto border h-[33px] rounded-[6px] focus:border-primary focus:border-0 hover:bg-white"
        >
          <div className="flex gap-3 items-center">
            <Image src={SortIcon} alt="filter" />
            <p className="text-custom-gray-scale-400 font-normal text-xs">
              Sort by
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {["name", "date modified"]?.map((col: string) => {
          return (
            <DropdownMenuCheckboxItem
              key={col}
              className="capitalize text-custom-dark-blue font-light text-xs"
            >
              {col}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const newBtnClass =
    "text-custom-gray-scale-400 text-xs font-light cursor-pointer";

  const exportDrop = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto border px-4 rounded-[6px] h-[33px] focus:border-0 hover:bg-white"
        >
          <div className="flex gap-3 items-center">
            <Image src={ExportIcon} alt="export" />
            <p className="text-custom-gray-scale-400 font-normal text-xs">
              Export
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="border rounded-sm"
        align="end"
        style={{ width: "10rem" }}
      >
        <DropdownMenuItem className={newBtnClass}>PDF</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={newBtnClass}>CSV</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="w-full ">
      <div>
        <div className="flex items-center py-4 ">
          <div className="flex gap-5 items-center ml-auto">
            <div className="grid place-items-center relative">
              <Input
                placeholder="Search"
                className="border-custom-divider bg-white w-[250px] placeholder:text-custom-gray-scale-300 font-normal text-xs border  rounded-[6px] text-custom-dark-blue"
              />
              <Image
                src={SearchIcon}
                alt="search"
                className="absolute right-0 mr-5"
              />
            </div>
            {/* EXPORT DROP */}
            {exportDrop}

            {/* SHOW SORT BY */}
            {sortBy}

            {/* SHOW FILTER DROP */}
            {filterDrop}
          </div>
        </div>

        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-custom-dark-blue bg-custom-gray-2 font-normal text-xs"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="bg-white">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="transition-all duration-300"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-custom-gray-scale-400 font-normal text-xs border-t-2 border-b-2"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <div className="flex gap-5 items-center">
              <p className="text-custom-ash font-normal text-sm">{`1 - 1 of 1`}</p>
              <Button className=" bg-custom-gray-2 hover:bg-custom-divider">
                <Image src={ArrowLeftIcon} alt="arrow left" />
              </Button>
              <Button className=" bg-custom-gray-2 hover:bg-custom-divider">
                <Image src={ArrowRightIcon} alt="arrow right" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEmployeeTable;
