import {
  ActionIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BtnPlusIcon,
  ExportIcon,
  FilterIcon,
  SearchIcon,
  SortIcon,
} from "@/public/assets/icons";
import { Captions, Link } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { flexRender } from "@tanstack/react-table";
import { iife } from "@/utils/helpers";

interface myComponentProps {
  children?: React.ReactNode;
  onAdd?: () => void;
  TableTitle?: string;
  addText?: string;
  hideTableHeader?: boolean;
  hideFilter?: boolean;
  hideExport?: boolean;
  filterList?: any;
  filterVal?: any;
  rowId?: any;
  onFilterClick?: (param: any) => void;
  hideNewBtnOne?: boolean;
  onPdfChange?: () => void;
  onCsvChange?: () => void;
  onSearch?: (param?: any) => void;
  handleSearchClick?: (param?: any) => void;
  onManualBtn?: () => void;
  onBulkUploadBtn?: () => void;
  hideBulkOption?: boolean;
  hideNewBtn?: boolean;
  newBtnBulk?: boolean;
  hideSearchFilterBox?: boolean;
  tableheaderList?: any;
  loading?: boolean;
  tableBodyList?: any;
  hidePagination?: boolean;
  onPageChange?: (param?: any) => void;
  currentPage?: string;
  totalPage?: string;
  perPage?: string;
  onSort?: (param?: any) => void;
  sortList?: any;
  hideSort?: boolean;
  onRowClick?: (param?: any) => void;
  defaultBodyList?: any;
  dropDown?: boolean;
  dropDownList?: any;
  width?: string;
}

const TableWrapper = ({
  children,
  onAdd,
  TableTitle,
  addText,
  hideTableHeader,
  filterList,
  filterVal,
  hideFilter,
  onFilterClick,
  rowId,
  hideNewBtnOne,
  newBtnBulk,
  onCsvChange,
  onPdfChange,
  onSearch,
  handleSearchClick,
  hideBulkOption,
  onBulkUploadBtn,
  onManualBtn,
  hideNewBtn,
  hideExport,
  hideSearchFilterBox,
  tableheaderList,
  loading,
  tableBodyList,
  currentPage,
  hidePagination,
  perPage,
  onPageChange,
  totalPage,
  sortList,
  hideSort,
  onSort,
  onRowClick,
  defaultBodyList,
  dropDown,
  dropDownList,
  width,
}: myComponentProps) => {
  const [showFilter, setShowFilter] = useState<any>(false);
  const [defaultFilterVal, setDefaultFilterVal] = useState<any>({});
  const [defaultSortVal, setDefaultSortVal] = useState<any>({});
  const [showExport, setShowExport] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  // header here ------------------
  const topHeaderWrap = (
    <div className="flex justify-between items-center border-b p-3  pr-16">
      <p className="text-custom-dark-gray font-medium text-base ">
        {TableTitle}
      </p>
    </div>
  );
  //  header here end ---------------

  //   pagination here ------

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Number(totalPage)) {
      onPageChange && onPageChange(page);
    }
  };

  const handlePickObjFromDefaultList = (param: any) => {
    if (defaultBodyList?.length > 0) {
      const obj = defaultBodyList?.find((chi: any, idx: any) => idx === param);
      return obj;
    }
  };

  const CurrentPage = iife(() => {
    if (Number(currentPage) > Number(totalPage)) return "";

    return (Number(currentPage) - 1) * Number(perPage) + 1;
  });

  const TotalPage =
    String(
      Math.min(
        Number(currentPage || 1) * Number(perPage || 1),
        Number(totalPage || 1)
      )
    ) || "1";

  //   filter here ------------------
  const addResetToList = (list: any) => {
    if (list?.length > 0) {
      const newList = [...list, { label: "All", value: "all" }];
      return newList;
    }
  };
  //   ---- list pattern here ---
  const list = [
    { label: "success", value: "1" },
    { label: "failed", value: "2" },
  ];
  // list pattern here ----
  const filterDrop = (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={() => {
          setShowFilter(!showFilter);
        }}
        asChild
      >
        <Button
          variant="outline"
          className="ml-auto border h-[33px] rounded-[6px] focus:border-primary focus:border-0 hover:bg-white"
        >
          <div className="flex gap-3 items-center">
            <Image src={FilterIcon} alt="filter" />
            <p className="text-custom-gray-scale-400 font-normal text-xs">
              {filterVal
                ? filterVal?.label
                : defaultFilterVal?.label || `Filter by`}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <>
          {addResetToList(filterList)?.map((chi: any, idx: any) => {
            return (
              <DropdownMenuCheckboxItem
                key={idx}
                className="capitalize text-custom-dark-blue font-light text-xs"
                checked={filterVal?.value === chi?.value}
                // onCheckedChange={() => {
                //     onFilterClick && on
                // }}
                onClick={() => {
                  setDefaultFilterVal(chi);
                  onFilterClick && onFilterClick(chi);
                }}
              >
                {chi?.label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  // filter end here -------------------

  const newBtnClass =
    "text-custom-gray-scale-400 text-xs font-light cursor-pointer";

  //   export here start ------
  const onExportChange = () => {
    setShowExport(!showExport);
  };
  const exportDrop = (
    <DropdownMenu open={showExport} onOpenChange={onExportChange}>
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
        <DropdownMenuItem className={newBtnClass} onClick={onPdfChange}>
          {/* <Link href={href} className="flex gap-3"> */}
          PDF
          {/* </Link> */}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={newBtnClass} onClick={onCsvChange}>
          CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  //  export here end --------

  const [showNewBtn, setShowNewBtn] = useState(false);
  //   newBtn  -------
  const newBtn = (
    <DropdownMenu
      open={showNewBtn}
      onOpenChange={() => {
        setShowNewBtn(!showNewBtn);
      }}
    >
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button className={"items-center h-[32px] px-4 gap-3 font-light"}>
          <Image src={BtnPlusIcon} alt="plus icon" />
          <p>{addText || `New`}</p>
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
        {!hideBulkOption && <DropdownMenuSeparator />}
        {!hideBulkOption && (
          <DropdownMenuItem className={newBtnClass} onClick={onBulkUploadBtn}>
            Bulk Upload
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  //  sort start here -----
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
              {Object?.keys(defaultSortVal)?.length > 0
                ? defaultSortVal?.label
                : "Sort by"}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {addResetToList(sortList)?.map((chi: any, idx: any) => {
          return (
            <DropdownMenuCheckboxItem
              key={idx}
              className="capitalize text-custom-dark-blue font-light text-xs"
              onClick={() => {
                onSort && onSort(chi);
                setDefaultSortVal(chi);
              }}
            >
              {chi?.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
  // sort end here -------

  const TableRowComponet = ({ row, children, onClick }: any) => (
    <TableRow
      //   key={row.id || idx}
      //   data-state={row.getIsSelected() && "selected"}
      className="transition-all duration-300"
      //   key={row?.id}
    >
      {row?.map((cell: any, index: any) => (
        <TableCell
          className="text-custom-gray-scale-400 font-normal text-xs border-t-2 border-b-2"
          key={index}
          onClick={onClick}
        >
          {typeof cell === "object" && cell !== null && "props" in cell
            ? cell
            : cell}
        </TableCell>
      ))}
      {children}
    </TableRow>
  );

  return (
    <div className="w-full flex flex-col ">
      {/* table header here --------------------- */}
      <>{!hideTableHeader && TableTitle ? topHeaderWrap : null}</>
      {/* table header end here --------------------- */}
      {/* search an dfilter componeent here --------------- */}
      {!hideSearchFilterBox && (
        <div className="flex items-center py-4 ">
          <div className="grid place-items-center relative">
            <Input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              value={searchVal}
              // onChange={onSearchChange}
              onChange={(e) => {
                setSearchVal(e.target.value);
                onSearch && onSearch(e.target.value);
              }}
              className="border-custom-divider bg-white w-[250px] placeholder:text-custom-gray-scale-300 font-normal text-xs border  rounded-[6px] text-custom-dark-blue"
            />
            <Image
              src={SearchIcon}
              alt="search"
              onClick={() =>
                handleSearchClick && searchVal && handleSearchClick(searchVal)
              }
              className="absolute right-0 mr-5"
            />
          </div>
          <div className="flex gap-5 items-center ml-auto">
            {/* SHOW NEW BTN */}
            {!hideNewBtnOne && !newBtnBulk && (
              <Button
                onClick={() => {
                  onAdd && onAdd();
                }}
                className={"items-center h-[32px] px-6 gap-3 font-light"}
              >
                <Image src={BtnPlusIcon} alt="plus icon" />
                <p>{addText || `New`}</p>
              </Button>
            )}
            {!hideNewBtn && newBtnBulk ? newBtn : null}
            {!hideSort ? sortBy : null}

            {/* SHOW FILTER DROP */}
            {!hideFilter ? filterDrop : null}

            {/* EXPORT DROP */}
            {!hideExport ? exportDrop : null}
          </div>
        </div>
      )}
      {/* search and filter component end here --------------- */}
      {/* table component start here ------ */}
      <Table>
        {tableheaderList?.length > 0 && (
          <>
            <TableHeader>
              <TableRow>
                {" "}
                {tableheaderList?.map((chi: any, idx: any) => {
                  if (chi === "Action") {
                    return (
                      <TableHead
                        key={idx}
                        className="text-custom-dark-blue bg-custom-gray-2 font-normal text-xs text-center capitalize"
                      >
                        {chi || ""}
                      </TableHead>
                    );
                  }
                  return (
                    <TableHead
                      key={idx}
                      className="text-custom-dark-blue bg-custom-gray-2 font-normal text-xs capitalize"
                    >
                      {chi || ""}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
          </>
        )}
        {/* body start here ------ */}

        <TableBody className="bg-white">
          {loading ? (
            <>
              <TableRow>
                <TableCell
                  colSpan={tableheaderList?.length}
                  className="h-60 text-center"
                >
                  <div
                    className="inline-block size-7 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-custom-dark-blue motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  />
                </TableCell>
              </TableRow>
            </>
          ) : (
            <>
              {tableBodyList?.length > 0 ? (
                <>
                  {" "}
                  {tableBodyList?.map((item: any, rowIndex: any) => (
                    <TableRowComponet
                      key={rowIndex}
                      row={Object.values(item)}
                      onClick={() => {
                        if (onRowClick) {
                          defaultBodyList?.length > 0
                            ? onRowClick(handlePickObjFromDefaultList(rowIndex))
                            : onRowClick(item);
                        }
                      }}
                    >
                      {dropDown && (
                        <td className="border-b-2 border-t-2">
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                            }}
                            className=""
                          >
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                asChild
                                className="cursor-pointer"
                              >
                                <Image src={ActionIcon} alt="Action icon" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                className="border rounded-sm"
                                align="end"
                                style={{ width: width ? width : "170px" }}
                              >
                                {dropDownList?.length > 0 &&
                                  dropDownList?.map((child: any, idx: any) => {
                                    return (
                                      <DropdownMenuItem
                                        key={idx}
                                        onClick={() => {
                                          child?.onActionClick &&
                                            child?.onActionClick(
                                              handlePickObjFromDefaultList(
                                                rowIndex
                                              ),
                                              item
                                            );
                                        }}
                                        className="font-light text-sm cursor-pointer text-custom-gray-scale-400"
                                      >
                                        {child?.label}
                                      </DropdownMenuItem>
                                    );
                                  })}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      )}
                    </TableRowComponet>
                  ))}
                </>
              ) : (
                <>
                  {" "}
                  <TableRow>
                    <TableCell
                      colSpan={tableheaderList?.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                </>
              )}
            </>
          )}
        </TableBody>
        {/* body end here ------------------ */}
      </Table>
      {/* table component end here ------ */}
      {tableBodyList?.length > 0 && !hidePagination && (
        <div className="ml-auto">
          <div className="flex mt-4 gap-5 items-center pb-2 ">
            <p className="text-custom-ash font-normal text-sm">{`${
              CurrentPage || "1"
            } - ${TotalPage || "1"} of ${totalPage || "1"}`}</p>
            <Button
              disabled={Number(currentPage) === 1}
              className=" bg-custom-gray-2 hover:bg-[--primary-color]"
              onClick={() => {
                handlePageChange(Number(currentPage) - 1);
              }}
            >
              <Image src={ArrowLeftIcon} alt="arrow left" />
            </Button>
            <Button
              disabled={Number(TotalPage) >= Number(totalPage)}
              className=" bg-custom-gray-2 hover:bg-[--primary-color]"
              onClick={() => {
                handlePageChange(Number(currentPage) + 1);
              }}
            >
              <Image src={ArrowRightIcon} alt="arrow right" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableWrapper;
