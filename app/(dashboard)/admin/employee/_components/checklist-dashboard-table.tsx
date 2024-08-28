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
  BtnPlusIcon,
  ExportIcon,
  FilterIcon,
  SearchIcon,
} from "@/public/assets/icons";
import Link from "next/link";

const DashboardTable = ({
  data,
  columns,
  searchVal,
  onSearchChange,
  handleSearchClick,
  href,
  header,
  isFilterDrop,
  filterOptions,
  filterCheck,
  filterOnCheck,
  showTopHeader,
  onManualBtn,
  onBulkUploadBtn,
  newBtnOpen,
  exportDropOpen,
  isLoading,
  onOpenBtnChange,
  onExportChange,
  onPdfChange,
  onCsvChange,
  onCreateNewBtn,
  onSelectTemplateBtn,
  dntShowExportDrop,
  isMissionBtn,
  dntShowNewBtn,
}: DashboardTableType) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const topHeaderWrap = (
    <div className="flex justify-between items-center border-b p-3 px-8 pr-16">
      <p className="text-custom-dark-gray font-medium text-base ">{header}</p>

      <Link href={href}>
        <Button className={"items-center h-[32px] px-6 gap-3 font-light"}>
          <Image src={BtnPlusIcon} alt="plus icon" />
          <p>New</p>
        </Button>
      </Link>
    </div>
  );

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
        {!isFilterDrop
          ? table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-custom-dark-blue font-light text-xs"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })
          : filterOptions?.map((column: string) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column}
                  className="capitalize text-custom-dark-blue font-light text-xs"
                  checked={filterCheck(column)}
                  onCheckedChange={() => filterOnCheck(column)}
                >
                  {column}
                </DropdownMenuCheckboxItem>
              );
            })}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const newBtnClass =
    "text-custom-gray-scale-400 text-xs font-light cursor-pointer";
  const newBtn = (
    <DropdownMenu open={newBtnOpen} onOpenChange={onOpenBtnChange}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button className={"items-center h-[32px] px-4 gap-3 font-light"}>
          <Image src={BtnPlusIcon} alt="plus icon" />
          <p>New</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border rounded-sm"
        align="end"
        style={{ width: "10rem" }}
      >
        <DropdownMenuItem className={newBtnClass} onClick={onManualBtn}>
          {/* <Link href={href} > */}
          Add Manually
          {/* </Link> */}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={newBtnClass} onClick={onBulkUploadBtn}>
          Bulk Upload
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const missionBtn = (
    <DropdownMenu open={newBtnOpen} onOpenChange={onOpenBtnChange}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button className={"items-center h-[32px] px-4 gap-3 font-light"}>
          <Image src={BtnPlusIcon} alt="plus icon" />
          <p>New</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border rounded-sm"
        align="end"
        style={{ width: "10rem" }}
      >
        <DropdownMenuItem className={newBtnClass} onClick={onCreateNewBtn}>
          {/* <Link href={href} > */}
          Create New
          {/* </Link> */}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={newBtnClass} onClick={onSelectTemplateBtn}>
          Select Template
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const exportDrop = (
    <DropdownMenu open={exportDropOpen} onOpenChange={onExportChange}>
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
        {/* <DropdownMenuItem className={newBtnClass} onClick={onPdfChange}>
          PDF
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem className={newBtnClass} onClick={onCsvChange}>
          CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="w-full ">
      {/* TOP HEADER DISPLAY */}
      {showTopHeader ? topHeaderWrap : null}

      <div>
        <div className="flex items-center py-4 ">
          <div className="grid place-items-center relative">
            <Input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              value={searchVal}
              // onChange={onSearchChange}
              onChange={() => {}}
              className="border-custom-divider bg-white w-[250px] placeholder:text-custom-gray-scale-300 font-normal text-xs border  rounded-[6px] text-custom-dark-blue"
            />
            <Image
              src={SearchIcon}
              alt="search"
              onClick={handleSearchClick}
              className="absolute right-0 mr-5"
            />
          </div>
          <div className="flex gap-5 items-center ml-auto">
            {/* SHOW NEW BTN */}
            {!dntShowNewBtn ? newBtn : null}
            {isMissionBtn ? missionBtn : null}

            {/* SHOW FILTER DROP */}
            {isFilterDrop ? filterDrop : null}

            {/* EXPORT DROP */}
            {!dntShowExportDrop ? exportDrop : null}
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
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div
                      className="inline-block size-7 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-custom-dark-blue motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    />
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
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
          {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
          <div className="space-x-2">
            {/* <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button> */}
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

export default DashboardTable;
